"use client";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock3,
    GraduationCap,
    RotateCcw,
    ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import type { AssistantScheme } from "./types";

/**
 * There are THREE possible result states:
 *
 * eligible
 * not_eligible
 * not_configured
 */
export type EligibilityStatus =
    | "eligible"
    | "not_eligible"
    | "not_configured";

export type EligibilityResultData = {
    status: EligibilityStatus;

    /**
     * Kept for compatibility with existing code.
     * For not_configured this will be false,
     * but UI must use `status`, not only `eligible`.
     */
    eligible: boolean;

    message: string;
    reasons: string[];
    nextStep: string;

    scheme: {
        id: number;
        name: string;
        department: string;
        state: string;
        description: string;
    };
};

type EligibilityDetailsProps = {
    scheme: AssistantScheme;
    onBack: () => void;
    onResult: (result: EligibilityResultData) => void;
};

type FormData = {
    age: string;
    gender: string;
    state: string;
    occupation: string;
    income: string;
    caste: string;
    disability: boolean;
};

export default function EligibilityDetails({
    scheme,
    onBack,
    onResult,
}: EligibilityDetailsProps) {
    const [formData, setFormData] = useState<FormData>({
        age: "",
        gender: "",
        state: "Bihar",
        occupation: "",
        income: "",
        caste: "",
        disability: false,
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof FormData, string>>
    >({});

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const updateField = (
        field: keyof FormData,
        value: string | boolean
    ) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: "",
        }));

        setApiError("");
    };

    const validateForm = () => {
        const newErrors: Partial<
            Record<keyof FormData, string>
        > = {};

        const age = Number(formData.age);
        const income = Number(formData.income);

        if (!formData.age.trim()) {
            newErrors.age = "Age is required.";
        } else if (
            !Number.isInteger(age) ||
            age < 0 ||
            age > 120
        ) {
            newErrors.age =
                "Please enter a valid age between 0 and 120.";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select your gender.";
        }

        if (!formData.state) {
            newErrors.state = "Please select your state.";
        }

        if (!formData.occupation.trim()) {
            newErrors.occupation =
                "Occupation is required.";
        }

        if (!formData.income.trim()) {
            newErrors.income =
                "Annual family income is required.";
        } else if (
            !Number.isFinite(income) ||
            income < 0
        ) {
            newErrors.income =
                "Please enter a valid income.";
        }

        if (!formData.caste) {
            newErrors.caste =
                "Please select your caste category.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    /**
     * Converts whatever the backend sends into one predictable object.
     */
    const getApiObject = (json: any) => {
        if (Array.isArray(json)) {
            return json[0];
        }

        return json;
    };

    /**
     * Detects the special backend case:
     *
     * Eligibility rules don't exist for this scheme.
     */
    const isEligibilityRulesMissing = (
        response: Response,
        json: any
    ) => {
        const message = String(
            json?.message ||
                json?.data?.message ||
                ""
        )
            .trim()
            .toLowerCase();

        return (
            message === "eligibility rules not found" ||
            message.includes("eligibility rules not found")
        );
    };

    /**
     * Creates a fallback scheme object from the scheme
     * already available in the frontend.
     *
     * This is important because the backend error response
     * does not contain scheme details.
     */
    const getFallbackScheme = () => {
        return {
            id: Number(scheme.id),
            name: scheme.name || "Government Scheme",
            department:
                scheme.department || "Government of Bihar",
            state: scheme.state || "Bihar",
            description:
                scheme.description ||
                "Scheme details are available through the official government portal.",
        };
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const schemeId = Number(scheme.id);

        if (!Number.isInteger(schemeId) || schemeId <= 0) {
            setApiError("Invalid scheme ID.");
            return;
        }

        setLoading(true);
        setApiError("");

        try {
            /**
             * IMPORTANT:
             *
             * Send exactly the fields expected by
             * /api/eligibility.
             */
            const payload = {
                schemeId: schemeId,
                age: Number(formData.age),
                gender: formData.gender,
                state: formData.state,
                occupation: formData.occupation.trim(),
                income: Number(formData.income),
                caste: formData.caste,
                disability: formData.disability,
            };

            console.log("Eligibility Request:", payload);

            const response = await fetch(
                "http://localhost:5000/api/eligibility",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            /**
             * Don't blindly call response.json().
             * A backend/server error can sometimes return
             * non-JSON content.
             */
            let json: any = null;

            try {
                json = await response.json();
            } catch {
                json = null;
            }

            console.log(
                "Eligibility Status:",
                response.status
            );

            console.log(
                "Eligibility Response:",
                json
            );

            const apiResponse = getApiObject(json);

            /**
             * =====================================================
             * CASE 3:
             * BACKEND HAS NO ELIGIBILITY RULES
             * =====================================================
             *
             * The backend currently returns HTTP 500 with:
             *
             * {
             *   success: false,
             *   message: "Eligibility rules not found"
             * }
             *
             * This is NOT an applicant rejection.
             */
            if (
                isEligibilityRulesMissing(
                    response,
                    apiResponse
                )
            ) {
                console.warn(
                    "Eligibility rules are not configured for scheme:",
                    schemeId
                );

                onResult({
                    status: "not_configured",
                    eligible: false,
                    message:
                        "Eligibility criteria are not available for this scheme yet.",
                    reasons: [],
                    nextStep:
                        "Please check the official government website or contact the concerned department to verify the eligibility criteria.",
                    scheme: getFallbackScheme(),
                });

                return;
            }

            /**
             * =====================================================
             * OTHER BACKEND ERRORS
             * =====================================================
             */
            if (!response.ok) {
                throw new Error(
                    apiResponse?.message ||
                        "Unable to check eligibility."
                );
            }

            /**
             * =====================================================
             * NORMAL SUCCESS RESPONSE
             * =====================================================
             *
             * Expected:
             *
             * {
             *   success: true,
             *   data: {
             *      eligible: true/false,
             *      message: "...",
             *      reasons: [],
             *      nextStep: "...",
             *      scheme: {...}
             *   }
             * }
             */
            if (
                !apiResponse ||
                apiResponse.success !== true ||
                !apiResponse.data
            ) {
                throw new Error(
                    apiResponse?.message ||
                        "Invalid eligibility response."
                );
            }

            const data = apiResponse.data;

            /**
             * Validate the actual eligibility result.
             */
            const isEligible =
                data.eligible === true;

            const result: EligibilityResultData = {
                status: isEligible
                    ? "eligible"
                    : "not_eligible",

                eligible: isEligible,

                message:
                    data.message ||
                    (isEligible
                        ? "You are eligible for this scheme."
                        : "You are not eligible for this scheme."),

                reasons: Array.isArray(data.reasons)
                    ? data.reasons
                    : [],

                nextStep:
                    data.nextStep ||
                    (isEligible
                        ? "You can proceed with the application."
                        : "Please review the eligibility criteria."),

                scheme:
                    data.scheme || getFallbackScheme(),
            };

            onResult(result);
        } catch (error) {
            console.error(
                "Eligibility Check Error:",
                error
            );

            setApiError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while checking eligibility."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            age: "",
            gender: "",
            state: "Bihar",
            occupation: "",
            income: "",
            caste: "",
            disability: false,
        });

        setErrors({});
        setApiError("");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* TOP BACK BUTTON */}

            <div className="mx-auto w-full max-w-[1200px] px-4 pt-6 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#cfe1d5] bg-white px-5 py-3 text-[13px] font-semibold text-[#08783f] transition hover:bg-[#f4faf6]"
                >
                    <ArrowLeft size={16} />
                    Back to Scheme
                </button>
            </div>

            {/* MAIN CARD */}

            <section className="mx-auto mt-6 w-full max-w-[1150px] overflow-hidden rounded-[22px] border border-[#e0ebe4] bg-white shadow-[0_8px_35px_rgba(25,65,42,0.08)]">
                {/* HEADER */}

                <div className="border-b border-[#edf1ee] px-6 py-7 sm:px-8 lg:px-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#edf8f0] text-[#08783f]">
                                <GraduationCap
                                    size={31}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>
                                <h1 className="text-[25px] font-bold tracking-[-0.5px] text-[#172033]">
                                    Check Eligibility
                                </h1>

                                <h2 className="mt-1 text-[16px] font-bold text-[#08783f]">
                                    {scheme.name}
                                </h2>

                                <p className="mt-3 text-[13px] leading-6 text-[#536159]">
                                    Please provide the following
                                    information to check your
                                    eligibility.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-xl bg-[#f1f8f3] px-5 py-4 lg:min-w-[290px]">
                            <Clock3
                                size={19}
                                className="mt-0.5 shrink-0 text-[#08783f]"
                            />

                            <div>
                                <p className="text-[12px] font-bold text-[#17683c]">
                                    Takes about 2–3 minutes
                                </p>

                                <p className="mt-1 text-[11px] leading-5 text-[#536159]">
                                    All information is used only
                                    to check eligibility.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FORM */}

                <div className="divide-y divide-[#edf1ee]">
                    <FormRow
                        number="1"
                        label="Age (in years)"
                        description="Enter your current age in years."
                        error={errors.age}
                    >
                        <div className="flex overflow-hidden rounded-xl border border-[#dfe7e2]">
                            <input
                                type="number"
                                min="0"
                                max="120"
                                value={formData.age}
                                onChange={(e) =>
                                    updateField(
                                        "age",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your age"
                                className="h-14 w-full bg-white px-4 text-[14px] text-[#172033] outline-none placeholder:text-[#9aa59f]"
                            />

                            <span className="flex items-center border-l border-[#e7ece9] bg-[#fafcfb] px-5 text-[13px] text-[#536159]">
                                years
                            </span>
                        </div>
                    </FormRow>

                    <FormRow
                        number="2"
                        label="Gender"
                        description="Select your gender."
                        error={errors.gender}
                    >
                        <select
                            value={formData.gender}
                            onChange={(e) =>
                                updateField(
                                    "gender",
                                    e.target.value
                                )
                            }
                            className="h-14 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-[14px] text-[#172033] outline-none"
                        >
                            <option value="">
                                Select an option
                            </option>
                            <option value="Male">
                                Male
                            </option>
                            <option value="Female">
                                Female
                            </option>
                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </FormRow>

                    <FormRow
                        number="3"
                        label="State"
                        description="Select your current state of residence."
                        error={errors.state}
                    >
                        <select
                            value={formData.state}
                            onChange={(e) =>
                                updateField(
                                    "state",
                                    e.target.value
                                )
                            }
                            className="h-14 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-[14px] text-[#172033] outline-none"
                        >
                            <option value="Bihar">
                                Bihar
                            </option>
                            <option value="Jharkhand">
                                Jharkhand
                            </option>
                            <option value="Uttar Pradesh">
                                Uttar Pradesh
                            </option>
                            <option value="West Bengal">
                                West Bengal
                            </option>
                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </FormRow>

                    <FormRow
                        number="4"
                        label="Occupation"
                        description="Enter your current occupation."
                        error={errors.occupation}
                    >
                        <input
                            type="text"
                            value={formData.occupation}
                            onChange={(e) =>
                                updateField(
                                    "occupation",
                                    e.target.value
                                )
                            }
                            placeholder="Eg. Student, Farmer, Worker, Self-employed"
                            className="h-14 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-[14px] text-[#172033] outline-none placeholder:text-[#9aa59f]"
                        />
                    </FormRow>

                    <FormRow
                        number="5"
                        label="Annual Family Income (₹)"
                        description="Total annual income of your family."
                        error={errors.income}
                    >
                        <div className="flex overflow-hidden rounded-xl border border-[#dfe7e2]">
                            <input
                                type="number"
                                min="0"
                                value={formData.income}
                                onChange={(e) =>
                                    updateField(
                                        "income",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter annual income"
                                className="h-14 w-full bg-white px-4 text-[14px] text-[#172033] outline-none placeholder:text-[#9aa59f]"
                            />

                            <span className="flex items-center border-l border-[#e7ece9] bg-[#fafcfb] px-5 text-[14px] font-semibold text-[#536159]">
                                ₹
                            </span>
                        </div>
                    </FormRow>

                    <FormRow
                        number="6"
                        label="Caste Category"
                        description="Select your caste category."
                        error={errors.caste}
                    >
                        <select
                            value={formData.caste}
                            onChange={(e) =>
                                updateField(
                                    "caste",
                                    e.target.value
                                )
                            }
                            className="h-14 w-full rounded-xl border border-[#dfe7e2] bg-white px-4 text-[14px] text-[#172033] outline-none"
                        >
                            <option value="">
                                Select an option
                            </option>
                            <option value="General">
                                General
                            </option>
                            <option value="SC">
                                SC
                            </option>
                            <option value="ST">
                                ST
                            </option>
                            <option value="OBC">
                                OBC
                            </option>
                            <option value="EBC">
                                EBC
                            </option>
                        </select>
                    </FormRow>

                    <FormRow
                        number="7"
                        label="Person with Disability"
                        description="Please indicate whether you have a disability."
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    updateField(
                                        "disability",
                                        false
                                    )
                                }
                                className={`h-14 rounded-xl border text-[14px] font-semibold transition ${
                                    !formData.disability
                                        ? "border-[#08783f] bg-[#edf8f0] text-[#08783f]"
                                        : "border-[#dfe7e2] bg-white text-[#536159]"
                                }`}
                            >
                                No
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    updateField(
                                        "disability",
                                        true
                                    )
                                }
                                className={`h-14 rounded-xl border text-[14px] font-semibold transition ${
                                    formData.disability
                                        ? "border-[#08783f] bg-[#edf8f0] text-[#08783f]"
                                        : "border-[#dfe7e2] bg-white text-[#536159]"
                                }`}
                            >
                                Yes
                            </button>
                        </div>
                    </FormRow>
                </div>

                {/* SECURITY MESSAGE */}

                <div className="mx-6 mt-6 flex items-start gap-3 rounded-xl bg-[#f0f8f3] px-5 py-4 sm:mx-8 lg:mx-10">
                    <ShieldCheck
                        size={21}
                        className="mt-0.5 shrink-0 text-[#08783f]"
                    />

                    <div>
                        <p className="text-[13px] font-bold text-[#17683c]">
                            Your information is safe with us
                        </p>

                        <p className="mt-1 text-[12px] leading-5 text-[#536159]">
                            We do not store your information.
                            It is used only to check eligibility
                            for this scheme.
                        </p>
                    </div>
                </div>

                {/* API ERROR */}

                {apiError && (
                    <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700 sm:mx-8 lg:mx-10">
                        {apiError}
                    </div>
                )}

                {/* ACTIONS */}

                <div className="flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#a9cdb7] bg-white px-5 text-[13px] font-semibold text-[#17683c] transition hover:bg-[#f3faf5] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RotateCcw size={16} />
                        Reset Form
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#08783f] px-7 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(8,120,63,0.20)] transition hover:bg-[#056b37] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Checking...
                            </>
                        ) : (
                            <>
                                Check Eligibility
                                <ArrowRight size={17} />
                            </>
                        )}
                    </button>
                </div>
            </section>
        </div>
    );
}

function FormRow({
    number,
    label,
    description,
    error,
    children,
}: {
    number: string;
    label: string;
    description: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-4 px-6 py-5 sm:px-8 md:grid-cols-[300px_minmax(0,1fr)] md:items-center lg:px-10">
            <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-[13px] font-bold text-white">
                    {number}
                </div>

                <div>
                    <p className="text-[14px] font-bold text-[#172033]">
                        {label}
                    </p>

                    <p className="mt-1 text-[12px] leading-5 text-[#536159]">
                        {description}
                    </p>
                </div>
            </div>

            <div>
                {children}

                {error && (
                    <p className="mt-2 text-[11px] font-medium text-red-600">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}