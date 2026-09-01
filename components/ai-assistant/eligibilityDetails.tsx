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

export type EligibilityStatus =
    | "eligible"
    | "not_eligible"
    | "not_configured";

export type EligibilityApplicant = {
    age: number;
    gender: string;
    state: string;
    occupation: string;
    income: number;
    caste: string;
    disability: boolean;
};

export type EligibilityResultData = {
    status: EligibilityStatus;

    // Kept for compatibility with any older code that reads result.eligible.
    eligible: boolean | null;

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

    applicant?: EligibilityApplicant;
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

const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

const NOT_CONFIGURED_MESSAGES = [
    "eligibility rules not found",
    "eligibility criteria not found",
    "eligibility rule not found",
    "rules not configured",
    "criteria not configured",
    "eligibility not configured",
    "eligibility information is not available",
];

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

    const buildApplicant = (): EligibilityApplicant => ({
        age: Number(formData.age),
        gender: formData.gender,
        state: formData.state,
        occupation: formData.occupation.trim(),
        income: Number(formData.income),
        caste: formData.caste,
        disability: formData.disability,
    });

    const buildLocalScheme = () => ({
        id: Number(scheme.id),
        name: scheme.name,
        department: scheme.department,
        state: scheme.state,
        description: scheme.description,
    });

    const isRulesMissing = (message: unknown) => {
        const normalized = String(message ?? "")
            .trim()
            .toLowerCase();

        return NOT_CONFIGURED_MESSAGES.some((item) =>
            normalized.includes(item)
        );
    };

    const makeNotConfiguredResult = (
        message?: string
    ): EligibilityResultData => ({
        status: "not_configured",
        eligible: null,
        message:
            message ||
            "Eligibility criteria are not currently available for this scheme in our system.",
        reasons: [],
        nextStep:
            "Please verify the latest eligibility criteria on the official government source.",
        scheme: buildLocalScheme(),
        applicant: buildApplicant(),
    });

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const schemeId = Number(scheme.id);

        if (!Number.isInteger(schemeId) || schemeId <= 0) {
            setApiError("This scheme has an invalid scheme ID.");
            return;
        }

        setLoading(true);
        setApiError("");

        const payload = {
            schemeId,
            age: Number(formData.age),
            gender: formData.gender,
            state: formData.state,
            occupation: formData.occupation.trim(),
            income: Number(formData.income),
            caste: formData.caste,
            disability: formData.disability,
        };

        console.log("Eligibility Request:", payload);

        try {
            const response = await fetch(
                `${API_URL}/api/eligibility`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            // Some backends return an empty body for errors.
            const rawText = await response.text();

            let json: any = null;

            if (rawText.trim()) {
                try {
                    json = JSON.parse(rawText);
                } catch {
                    json = {
                        success: false,
                        message: rawText,
                    };
                }
            }

            console.log("Eligibility Status:", response.status);
            console.log("Eligibility Response:", json);

            const apiResponse = Array.isArray(json)
                ? json[0]
                : json;

            const backendMessage =
                apiResponse?.message ||
                apiResponse?.error ||
                "";

            /*
             * IMPORTANT:
             * "Eligibility rules not found" is a business/data state,
             * not a frontend crash.
             *
             * Even when the backend returns HTTP 500, convert this known
             * response into the not_configured result page.
             */
            if (
                isRulesMissing(backendMessage) ||
                (response.status >= 500 &&
                    isRulesMissing(rawText))
            ) {
                onResult(
                    makeNotConfiguredResult(
                        "Eligibility criteria are not currently available for this scheme in our system."
                    )
                );
                return;
            }

            if (!response.ok) {
                throw new Error(
                    backendMessage ||
                    `Unable to check eligibility (HTTP ${response.status}).`
                );
            }

            if (
                !apiResponse ||
                apiResponse.success !== true ||
                !apiResponse.data
            ) {
                throw new Error(
                    backendMessage ||
                    "The eligibility service returned an invalid response."
                );
            }

            const data = apiResponse.data;

            const eligible =
                data?.eligible === true;

            const notEligible =
                data?.eligible === false;

            if (!eligible && !notEligible) {
                // A 200 response without a usable boolean is treated as
                // unknown instead of incorrectly showing "not eligible".
                onResult(
                    makeNotConfiguredResult(
                        data?.message ||
                        "Eligibility could not be determined because valid eligibility criteria were not returned."
                    )
                );
                return;
            }

            onResult({
                status: eligible
                    ? "eligible"
                    : "not_eligible",
                eligible,
                message:
                    data.message ||
                    (eligible
                        ? "You are eligible for this scheme."
                        : "You are not eligible for this scheme."),
                reasons: Array.isArray(data.reasons)
                    ? data.reasons
                    : [],
                nextStep:
                    data.nextStep ||
                    (eligible
                        ? "You can proceed with the application."
                        : "Please review the eligibility conditions and explore other schemes."),
                scheme: data.scheme
                    ? {
                        id: Number(data.scheme.id),
                        name:
                            data.scheme.name ||
                            scheme.name,
                        department:
                            data.scheme.department ||
                            scheme.department,
                        state:
                            data.scheme.state ||
                            scheme.state,
                        description:
                            data.scheme.description ||
                            scheme.description,
                    }
                    : buildLocalScheme(),
                applicant: buildApplicant(),
            });
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
        <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0" />

            <div className="relative mx-auto w-full max-w-[1180px] px-3 py-5 sm:px-5 lg:px-7 lg:py-8">
                <button
                    type="button"
                    onClick={onBack}
                    className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[#cfe1d5] bg-white/90 px-5 py-2.5 text-[13px] font-bold text-[#08783f] shadow-[0_8px_25px_rgba(25,65,42,0.07)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-[#a9cdb7] hover:bg-[#f4faf6] hover:shadow-[0_12px_30px_rgba(25,65,42,0.10)]"
                >
                    <ArrowLeft size={16} />
                    Back to Scheme
                </button>

                <section className="overflow-hidden rounded-[32px] border border-[#dce9e1] bg-white/95 shadow-[0_24px_70px_rgba(25,65,42,0.11)]">
                    <div className="border-b border-[#edf1ee] bg-gradient-to-r from-[#f5fcf7] via-white to-[#f7fbf8] px-6 py-8 sm:px-9 lg:px-11">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[22px] bg-[linear-gradient(145deg,#e6f7ec,#f4fbf6)] text-[#08783f] shadow-[0_10px_25px_rgba(8,120,63,0.08)]">
                                    <GraduationCap
                                        size={32}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#5c8a6d]">
                                        Eligibility check
                                    </p>

                                    <h1 className="mt-1 text-[28px] font-extrabold tracking-[-0.8px] text-[#122019]">
                                        Check Eligibility
                                    </h1>

                                    <h2 className="mt-1 text-[17px] font-extrabold text-[#08783f]">
                                        {scheme.name}
                                    </h2>

                                    <p className="mt-2 text-[12px] leading-5 text-[#536159]">
                                        Provide your details below. Your information is used only for this eligibility check.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-2xl border border-[#cfe5d6] bg-[linear-gradient(145deg,#eef9f2,#ffffff)] px-5 py-4 shadow-[0_8px_24px_rgba(25,65,42,0.05)] lg:min-w-[320px]">
                                <Clock3
                                    size={19}
                                    className="mt-0.5 shrink-0 text-[#08783f]"
                                />

                                <div>
                                    <p className="text-[12px] font-bold text-[#17683c]">
                                        Takes about 2–3 minutes
                                    </p>

                                    <p className="mt-1 text-[11px] leading-5 text-[#536159]">
                                        We use your answers only to determine the eligibility status returned by the scheme service.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-[#edf1ee]">
                        <FormRow
                            number="1"
                            label="Age (in years)"
                            description="Enter your current age in years."
                            error={errors.age}
                        >
                            <div className="flex overflow-hidden rounded-2xl border border-[#dce6df] bg-white shadow-[0_5px_16px_rgba(25,65,42,0.04)] transition focus-within:border-[#08783f] focus-within:ring-4 focus-within:ring-[#08783f]/10">
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
                                    className="h-14 w-full bg-transparent px-4 text-[14px] text-[#172033] outline-none placeholder:text-[#9aa59f]"
                                />
                                <span className="flex items-center border-l border-[#e7ece9] bg-[#f7faf8] px-5 text-[13px] text-[#536159]">
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
                                className="h-14 w-full rounded-2xl border border-[#dce6df] bg-white px-4 text-[14px] text-[#172033] outline-none shadow-[0_5px_16px_rgba(25,65,42,0.04)] transition duration-200 hover:border-[#b8d0c0] focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
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
                                className="h-14 w-full rounded-2xl border border-[#dce6df] bg-white px-4 text-[14px] text-[#172033] outline-none shadow-[0_5px_16px_rgba(25,65,42,0.04)] transition duration-200 hover:border-[#b8d0c0] focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
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
                                className="h-14 w-full rounded-2xl border border-[#dce6df] bg-white px-4 text-[14px] text-[#172033] outline-none shadow-[0_5px_16px_rgba(25,65,42,0.04)] transition duration-200 hover:border-[#b8d0c0] focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10 placeholder:text-[#9aa59f]"
                            />
                        </FormRow>

                        <FormRow
                            number="5"
                            label="Annual Family Income (₹)"
                            description="Total annual income of your family."
                            error={errors.income}
                        >
                            <div className="flex overflow-hidden rounded-2xl border border-[#dce6df] bg-white shadow-[0_5px_16px_rgba(25,65,42,0.04)] transition focus-within:border-[#08783f] focus-within:ring-4 focus-within:ring-[#08783f]/10">
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
                                    className="h-14 w-full bg-transparent px-4 text-[14px] text-[#172033] outline-none placeholder:text-[#9aa59f]"
                                />

                                <span className="flex items-center border-l border-[#e7ece9] bg-[#f7faf8] px-5 text-[14px] font-semibold text-[#536159]">
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
                                className="h-14 w-full rounded-2xl border border-[#dce6df] bg-white px-4 text-[14px] text-[#172033] outline-none shadow-[0_5px_16px_rgba(25,65,42,0.04)] transition duration-200 hover:border-[#b8d0c0] focus:border-[#08783f] focus:ring-4 focus:ring-[#08783f]/10"
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
                                    className={`h-14 rounded-2xl border text-[14px] font-bold transition duration-200 hover:-translate-y-0.5 ${!formData.disability
                                            ? "border-[#08783f] bg-[linear-gradient(145deg,#e5f7eb,#f5fcf7)] text-[#08783f] shadow-[0_8px_20px_rgba(8,120,63,0.10)]"
                                            : "border-[#dce6df] bg-white text-[#536159] shadow-[0_5px_15px_rgba(25,65,42,0.04)] hover:border-[#b8d0c0] hover:bg-[#fbfefc]"
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
                                    className={`h-14 rounded-2xl border text-[14px] font-bold transition duration-200 hover:-translate-y-0.5 ${formData.disability
                                            ? "border-[#08783f] bg-[linear-gradient(145deg,#e5f7eb,#f5fcf7)] text-[#08783f] shadow-[0_8px_20px_rgba(8,120,63,0.10)]"
                                            : "border-[#dce6df] bg-white text-[#536159] shadow-[0_5px_15px_rgba(25,65,42,0.04)] hover:border-[#b8d0c0] hover:bg-[#fbfefc]"
                                        }`}
                                >
                                    Yes
                                </button>
                            </div>
                        </FormRow>
                    </div>

                    <div className="mx-6 mt-7 flex items-start gap-3 rounded-2xl border border-[#cfe5d6] bg-[linear-gradient(145deg,#eef9f2,#ffffff)] px-5 py-4 shadow-[0_8px_24px_rgba(25,65,42,0.05)] sm:mx-9 lg:mx-11">
                        <ShieldCheck
                            size={21}
                            className="mt-0.5 shrink-0 text-[#08783f]"
                        />

                        <div>
                            <p className="text-[13px] font-bold text-[#17683c]">
                                Your information is safe with us
                            </p>

                            <p className="mt-1 text-[12px] leading-5 text-[#536159]">
                                We do not store your information. It is used only to check eligibility for this scheme.
                            </p>
                        </div>
                    </div>

                    {apiError && (
                        <div className="mx-6 mt-5 rounded-2xl border border-red-200 bg-[linear-gradient(145deg,#fff4f4,#ffffff)] px-4 py-3.5 text-[12px] font-semibold leading-5 text-red-700 shadow-[0_8px_22px_rgba(198,40,40,0.06)] sm:mx-9 lg:mx-11">
                            {apiError}
                        </div>
                    )}

                    <div className="flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9 lg:px-11">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#b7d4c1] bg-white px-5 text-[13px] font-bold text-[#17683c] shadow-[0_6px_18px_rgba(25,65,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#7fb596] hover:bg-[#f3faf5] hover:shadow-[0_10px_24px_rgba(25,65,42,0.08)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RotateCcw size={16} />
                            Reset Form
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0b8b4b,#08783f)] px-7 text-[14px] font-extrabold text-white shadow-[0_12px_28px_rgba(8,120,63,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(8,120,63,0.26)] disabled:cursor-not-allowed disabled:opacity-60"
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
        <div className="grid gap-5 px-6 py-6 sm:px-9 md:grid-cols-[320px_minmax(0,1fr)] md:items-center lg:px-11">
            <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#0b8b4b,#08783f)] text-[12px] font-extrabold text-white shadow-[0_6px_15px_rgba(8,120,63,0.16)]">
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
