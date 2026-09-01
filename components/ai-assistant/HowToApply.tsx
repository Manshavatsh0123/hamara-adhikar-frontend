"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Download,
    ExternalLink,
    FileCheck2,
    FileText,
    GraduationCap,
    Info,
    Landmark,
    Loader2,
    MapPin,
    Phone,
    Search,
    ShieldCheck,
    UploadCloud,
    UserRound,
} from "lucide-react";

import type { AssistantScheme } from "./types";

type HowToApplyProps = {
    scheme: AssistantScheme;
    onBack: () => void;
    /** Return directly to the scheme details page. */
    onBackToScheme?: () => void;
};

type ApplyScheme = AssistantScheme & {
    benefits?: string[];
    eligibility?: string[];
    documents?: string[];
    applicationProcess?: string | string[] | null;
    applicationUrl?: string | null;
    officialSource?: string | null;
    beneficiaries?: string | null;
    applicableFor?: string[];
};

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function clean(value: unknown): string {
    if (typeof value !== "string") return "";

    return value
        .replace(/\*\*/g, "")
        .replace(/^[-*•]\s*/, "")
        .trim();
}

function asList(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map(clean).filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(/\n|•|;(?=\s)/)
            .map(clean)
            .filter(Boolean);
    }

    return [];
}

function normalizeScheme(
    payload: unknown,
    fallback: AssistantScheme
): ApplyScheme {
    const raw = Array.isArray(payload) ? payload[0] : payload;

    const data =
        (raw as any)?.data?.scheme ??
        (raw as any)?.data ??
        (raw as any)?.scheme ??
        raw;

    const source =
        data && typeof data === "object"
            ? (data as Record<string, unknown>)
            : {};

    return {
        ...fallback,
        ...source,

        id: String(source.id ?? fallback.id),

        name: clean(source.name ?? fallback.name),

        department: clean(
            source.department ?? fallback.department
        ),

        state: clean(
            source.state ?? fallback.state
        ),

        description: clean(
            source.description ?? fallback.description
        ),

        documents: asList(source.documents),

        eligibility: asList(source.eligibility),

        benefits: asList(source.benefits),

        applicableFor: asList(source.applicableFor),

        applicationProcess:
            Array.isArray(source.applicationProcess)
                ? source.applicationProcess
                    .map(clean)
                    .filter(Boolean)
                : clean(source.applicationProcess) || null,

        applicationUrl:
            typeof source.applicationUrl === "string"
                ? source.applicationUrl
                : null,

        officialSource:
            typeof source.officialSource === "string"
                ? source.officialSource
                : null,

        beneficiaries:
            clean(source.beneficiaries) || null,
    };
}

/* -------------------------------------------------------------------------- */
/* Excel download                                                             */
/* -------------------------------------------------------------------------- */

function downloadSchemeDetails(scheme: ApplyScheme) {
    const process = Array.isArray(scheme.applicationProcess)
        ? scheme.applicationProcess.join("\n")
        : scheme.applicationProcess || "";

    const rows = [
        ["Sahay Bihar - Scheme Details", ""],
        ["", ""],
        ["Scheme", scheme.name],
        ["Department", scheme.department],
        ["State", scheme.state],
        ["Beneficiaries", scheme.beneficiaries || ""],
        ["Description", scheme.description],
        [
            "Application URL",
            scheme.applicationUrl ||
            scheme.officialSource ||
            "",
        ],
        [
            "Required Documents",
            scheme.documents?.join("; ") || "",
        ],
        ["Application Process", process],
    ];

    const escapeCell = (value: unknown) =>
        String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");

    const htmlRows = rows
        .map(
            (row) => `
                <tr>
                    ${row
                    .map(
                        (cell) => `
                                <td
                                    style="
                                        border:1px solid #d9e5dd;
                                        padding:10px;
                                        vertical-align:top;
                                    "
                                >
                                    ${escapeCell(cell)}
                                </td>
                            `
                    )
                    .join("")}
                </tr>
            `
        )
        .join("");

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <title>
                    Scheme Details - ${escapeCell(scheme.name)}
                </title>
            </head>

            <body>
                <table
                    style="
                        border-collapse:collapse;
                        font-family:Arial,sans-serif;
                        font-size:12px;
                    "
                >
                    ${htmlRows}
                </table>
            </body>
        </html>
    `;

    const blob = new Blob([html], {
        type: "application/vnd.ms-excel;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;

    anchor.download =
        `${scheme.name
            .replace(/[^a-z0-9]+/gi, "-")
            .toLowerCase() || "scheme"
        }-details.xls`;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);
}

/* -------------------------------------------------------------------------- */
/* External URL helper                                                        */
/* -------------------------------------------------------------------------- */

function openOfficialUrl(url?: string | null) {
    if (!url) return;

    try {
        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    } catch (error) {
        console.error(
            "Unable to open official source:",
            error
        );
    }
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function HowToApply({
    scheme,
    onBack,
    onBackToScheme,
}: HowToApplyProps) {
    const [details, setDetails] =
        useState<ApplyScheme>(scheme);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    /* ---------------------------------------------------------------------- */
    /* Fetch latest scheme details                                            */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        let cancelled = false;

        const schemeId = Number(scheme.id);

        if (
            !Number.isInteger(schemeId) ||
            schemeId <= 0
        ) {
            setError(
                "We could not identify this scheme."
            );

            setLoading(false);

            return;
        }

        async function loadScheme() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_BASE}/api/schemes/${schemeId}`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const json = await response
                    .json()
                    .catch(() => null);

                if (!response.ok) {
                    throw new Error(
                        json?.message ||
                        "Unable to load scheme details."
                    );
                }

                if (!cancelled) {
                    setDetails(
                        normalizeScheme(
                            json,
                            scheme
                        )
                    );
                }
            } catch (err) {
                console.error(
                    "How-to-apply scheme details error:",
                    err
                );

                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Unable to load scheme details."
                    );

                    /*
                     * Important:
                     * Even if the refresh API fails,
                     * don't destroy the page.
                     *
                     * Continue using the scheme already
                     * received from the eligibility flow.
                     */
                    setDetails(
                        normalizeScheme(
                            scheme,
                            scheme
                        )
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadScheme();

        return () => {
            cancelled = true;
        };
    }, [scheme]);

    /* ---------------------------------------------------------------------- */
    /* Application process                                                    */
    /* ---------------------------------------------------------------------- */

    const steps = useMemo(() => {
        const raw = details.applicationProcess;

        const values = Array.isArray(raw)
            ? raw
            : asList(raw);

        /*
         * If backend provides application steps,
         * always prefer backend data.
         */
        if (values.length > 0) {
            const defaultTitles = [
                "Login",
                "Enter Details",
                "Upload Documents",
                "Select Schools",
                "Submit Application",
                "Receive Application Number",
                "Track Application",
            ];

            return values.map(
                (text, index) => ({
                    title:
                        defaultTitles[index] ||
                        `Step ${index + 1}`,
                    text,
                })
            );
        }


        return [
            {
                title: "Login",
                text:
                    "Open the official application portal and sign in or create your account.",
            },
            {
                title: "Enter Details",
                text:
                    "Fill in the required personal, educational and scheme-specific information.",
            },
            {
                title: "Upload Documents",
                text:
                    "Upload the documents requested in the official scheme guidelines.",
            },
            {
                title: "Review & Submit",
                text:
                    "Review your information, accept the applicable declaration and submit the application.",
            },
            {
                title: "Track Application",
                text:
                    "Save the acknowledgement or application number and use the official portal to track your application.",
            },
        ];
    }, [details.applicationProcess]);


    const documents = details.documents?.length
        ? details.documents
        : [
            "Identity / Aadhaar document",
            "Residence certificate",
            "Income / category certificate if applicable",
            "Educational documents as required",
        ];

    const officialUrl =
        details.applicationUrl ||
        details.officialSource;

    return (
        <div className="min-h-screen bg-transparent">
            <main className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                <section
                    className=" relative  mt-6
                        overflow-hidden
                        rounded-[24px]
                        border
                        border-[#e3ebe5]
                        bg-white
                        shadow-[0_12px_45px_rgba(25,65,42,0.07)]
                    "
                >
                    <div
                        className="
                            grid
                            lg:grid-cols-[1.05fr_.95fr]
                        "
                    >

                        <div
                            className="
                                relative
                                z-10
                                px-6
                                py-8
                                sm:px-9
                                sm:py-10
                                lg:px-12
                                lg:py-12
                            "
                        >
                            <div className="flex items-start gap-4">

                                <div
                                    className="
                                        flex
                                        h-16
                                        w-16
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#edf8f1]
                                        text-[#08783f]
                                        ring-8
                                        ring-[#f8fcf9]
                                    "
                                >
                                    <FileText
                                        size={31}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-[12px]
                                            font-bold
                                            uppercase
                                            tracking-[0.16em]
                                            text-[#398454]
                                        "
                                    >
                                        Application Guide
                                    </p>

                                    <h1
                                        className="
                                            mt-1
                                            text-[34px]
                                            font-bold
                                            tracking-[-1.5px]
                                            text-[#101a31]
                                            sm:text-[42px]
                                        "
                                    >
                                        How to Apply
                                    </h1>
                                </div>
                            </div>

                            <h2
                                className="
                                    mt-7
                                    max-w-[680px]
                                    text-[21px]
                                    font-bold
                                    leading-8
                                    text-[#101a31]
                                    sm:text-[25px]
                                "
                            >
                                {details.name}
                            </h2>

                            <div
                                className="
                                    mt-3
                                    inline-flex
                                    rounded-full
                                    bg-[#edf8f0]
                                    px-4
                                    py-2
                                    text-[12px]
                                    font-bold
                                    text-[#08783f]
                                "
                            >
                                {details.department ||
                                    "Government Department"}
                                {details.state
                                    ? `, Government of ${details.state}`
                                    : ""}
                            </div>

                            <p
                                className="
                                    mt-5
                                    max-w-[680px]
                                    text-[13px]
                                    leading-7
                                    text-[#536159]
                                    sm:text-[14px]
                                "
                            >
                                {details.description ||
                                    "Please follow the official application process and verify the latest government guidelines before applying."}
                            </p>

                            {/* Tags */}

                            <div className="mt-6 flex flex-wrap gap-2">
                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        bg-[#f1f8f3]
                                        px-3.5
                                        py-2
                                        text-[12px]
                                        font-semibold
                                        text-[#267144]
                                    "
                                >
                                    <GraduationCap size={14} />
                                    Education
                                </span>

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        bg-[#f1f8f3]
                                        px-3.5
                                        py-2
                                        text-[12px]
                                        font-semibold
                                        text-[#267144]
                                    "
                                >
                                    <ShieldCheck size={14} />
                                    Government Scheme
                                </span>

                                {details.beneficiaries && (
                                    <span
                                        className="
                                            rounded-full
                                            bg-[#f1f8f3]
                                            px-3.5
                                            py-2
                                            text-[12px]
                                            font-semibold
                                            text-[#267144]
                                        "
                                    >
                                        {details.beneficiaries}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div
                            className="
                                relative
                                hidden
                                min-h-[330px]
                                overflow-hidden
                                lg:block
                            "
                        >
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-r
                                    from-white
                                    via-white/30
                                    to-transparent
                                    z-10
                                "
                            />

                            <img
                                src="/Apply.png"
                                alt="Application process illustration"
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                    object-center
                                "
                            />
                        </div>
                    </div>

                    <div
                        className="
                            relative
                            grid
                            border-t
                            border-[#e6eee8]
                            sm:grid-cols-2
                            lg:grid-cols-4
                        "
                    >
                        <Fact
                            icon={<FileText size={19} />}
                            label="Apply Mode"
                            value={
                                officialUrl
                                    ? "Online / Official Portal"
                                    : "Check official portal"
                            }
                        />

                        <Fact
                            icon={<UserRound size={19} />}
                            label="Beneficiaries"
                            value={
                                details.beneficiaries ||
                                "As per scheme criteria"
                            }
                        />

                        <Fact
                            icon={<MapPin size={19} />}
                            label="State"
                            value={
                                details.state ||
                                "Bihar"
                            }
                        />

                        <Fact
                            icon={<Landmark size={19} />}
                            label="Department"
                            value={
                                details.department ||
                                "Concerned department"
                            }
                        />
                    </div>
                </section>


                {loading && (
                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            border
                            border-[#e0ebe4]
                            bg-white
                            px-5
                            py-4
                            text-[12px]
                            text-[#536159]
                            shadow-sm
                        "
                    >
                        <Loader2
                            size={16}
                            className="
                                animate-spin
                                text-[#08783f]
                            "
                        />

                        Refreshing latest scheme details…
                    </div>
                )}

                {error && !loading && (
                    <div
                        className="
                            mt-5
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            border-[#f1d58a]
                            bg-[#fffaf0]
                            p-4
                            shadow-sm
                        "
                    >
                        <Info
                            size={18}
                            className="
                                mt-0.5
                                shrink-0
                                text-[#9a6a00]
                            "
                        />

                        <div>
                            <p
                                className="
                                    text-[13px]
                                    font-bold
                                    text-[#795600]
                                "
                            >
                                Latest details could not be refreshed
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-[12px]
                                    leading-6
                                    text-[#795600]
                                "
                            >
                                Showing the scheme information
                                already available. Please verify
                                the latest information on the
                                official government source.
                            </p>
                        </div>
                    </div>
                )}

                <div
                    className="
                        mt-6
                        grid
                        gap-5
                        lg:grid-cols-[1.55fr_.85fr]
                    "
                >

                    <section
                        className="
                            rounded-[20px]
                            border
                            border-[#e4ece6]
                            bg-white
                            p-5
                            shadow-[0_8px_30px_rgba(25,65,42,0.045)]
                            sm:p-7
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.14em]
                                    text-[#398454]
                                "
                            >
                                Application Journey
                            </p>

                            <h2
                                className="
                                    mt-1
                                    text-[22px]
                                    font-bold
                                    tracking-[-0.5px]
                                    text-[#101a31]
                                "
                            >
                                Application Process
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-[12px]
                                    text-[#6a776f]
                                "
                            >
                                Follow these steps according to
                                the latest scheme information.
                            </p>
                        </div>

                        <div className="mt-7 space-y-3">
                            {steps.map(
                                (step, index) => (
                                    <ProcessStep
                                        key={`${step.title}-${index}`}
                                        index={index}
                                        total={steps.length}
                                        title={step.title}
                                        text={step.text}
                                    />
                                )
                            )}
                        </div>
                    </section>

                    <aside className="space-y-5">
                        <section
                            className="
                                rounded-[20px]
                                border
                                border-[#e0ebe4]
                                bg-[#f8fbf9]
                                p-5
                                sm:p-6
                            "
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className="
                                            text-[11px]
                                            font-bold
                                            uppercase
                                            tracking-[0.13em]
                                            text-[#398454]
                                        "
                                    >
                                        Helpful shortcuts
                                    </p>

                                    <h2
                                        className="
                                            mt-1
                                            text-[19px]
                                            font-bold
                                            text-[#08783f]
                                        "
                                    >
                                        Quick Actions
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2.5">

                                <QuickAction
                                    icon={
                                        <ExternalLink
                                            size={18}
                                        />
                                    }
                                    title="Apply Online"
                                    text={
                                        officialUrl
                                            ? "Open official application portal"
                                            : "Official application source unavailable"
                                    }
                                    disabled={!officialUrl}
                                    onClick={() =>
                                        openOfficialUrl(
                                            officialUrl
                                        )
                                    }
                                />

                                <QuickAction
                                    icon={
                                        <Search
                                            size={18}
                                        />
                                    }
                                    title="Check Application Status"
                                    text={
                                        officialUrl
                                            ? "Track your application on the official portal"
                                            : "Check the official source for tracking information"
                                    }
                                    disabled={!officialUrl}
                                    onClick={() =>
                                        openOfficialUrl(
                                            officialUrl
                                        )
                                    }
                                />

                                <QuickAction
                                    icon={
                                        <Download
                                            size={18}
                                        />
                                    }
                                    title="Download Forms / Guidelines"
                                    text="Download scheme information in Excel format"
                                    onClick={() =>
                                        downloadSchemeDetails(
                                            details
                                        )
                                    }
                                />

                                <QuickAction
                                    icon={
                                        <Phone
                                            size={18}
                                        />
                                    }
                                    title="Helpline / Contact"
                                    text="Find help from the concerned department"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "official-note"
                                            )
                                            ?.scrollIntoView({
                                                behavior:
                                                    "smooth",
                                            })
                                    }
                                />
                            </div>
                        </section>

                        <section
                            className="
                                rounded-[20px]
                                border
                                border-[#e2ebe5]
                                bg-white
                                p-5
                                shadow-sm
                                sm:p-6
                            "
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#edf8f0]
                                        text-[#08783f]
                                    "
                                >
                                    <FileCheck2 size={19} />
                                </div>

                                <div>
                                    <h2
                                        className="
                                            text-[18px]
                                            font-bold
                                            text-[#101a31]
                                        "
                                    >
                                        Required Documents
                                    </h2>

                                    <p
                                        className="
                                            mt-1
                                            text-[11px]
                                            leading-5
                                            text-[#6a776f]
                                        "
                                    >
                                        Keep these documents ready
                                        before starting your application.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-2">
                                {documents.map(
                                    (doc, index) => (
                                        <div
                                            key={`${doc}-${index}`}
                                            className="
                                                group
                                                flex
                                                items-start
                                                gap-3
                                                rounded-xl
                                                border
                                                border-transparent
                                                bg-[#f8fbf9]
                                                px-3
                                                py-3
                                                transition
                                                hover:border-[#dbe9df]
                                                hover:bg-[#f3f9f5]
                                            "
                                        >
                                            <div
                                                className="
                                                    mt-0.5
                                                    flex
                                                    h-7
                                                    w-7
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-white
                                                    text-[#08783f]
                                                    shadow-sm
                                                "
                                            >
                                                <FileText
                                                    size={15}
                                                />
                                            </div>

                                            <span
                                                className="
                                                    text-[12px]
                                                    leading-5
                                                    text-[#536159]
                                                "
                                            >
                                                {doc}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </aside>
                </div>

                <section
                    id="official-note"
                    className="
                        mt-5
                        rounded-[20px]
                        border
                        border-[#dbe9f8]
                        bg-[#f5f9fd]
                        p-5
                        shadow-sm
                        sm:p-6
                    "
                >
                    <div className="flex items-start gap-3">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-white
                                text-[#1769aa]
                                shadow-sm
                            "
                        >
                            <ShieldCheck size={20} />
                        </div>

                        <div>
                            <h2
                                className="
                                    text-[15px]
                                    font-bold
                                    text-[#1769aa]
                                "
                            >
                                Important Information
                            </h2>

                            <p
                                className="
                                    mt-1
                                    max-w-[850px]
                                    text-[12px]
                                    leading-6
                                    text-[#536159]
                                "
                            >
                                Application rules, dates,
                                documents and final approval are
                                controlled by the concerned
                                government department. Always
                                verify the latest notification
                                before applying.
                            </p>

                            {officialUrl && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        openOfficialUrl(
                                            officialUrl
                                        )
                                    }
                                    className="
                                        mt-4
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-[#08783f]
                                        px-4
                                        py-2.5
                                        text-[12px]
                                        font-bold
                                        text-white
                                        shadow-[0_6px_16px_rgba(8,120,63,0.18)]
                                        transition
                                        hover:-translate-y-0.5
                                        hover:bg-[#056b37]
                                        hover:shadow-[0_8px_20px_rgba(8,120,63,0.23)]
                                    "
                                >
                                    Open Official Source
                                    <ExternalLink
                                        size={14}
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <div
                    className="
                        mt-5
                        grid
                        gap-3
                        sm:grid-cols-2
                    "
                >
                    <button
                        type="button"
                        onClick={onBack}
                        className="
                            group
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-[#b9d8c3]
                            bg-white
                            px-5
                            py-3.5
                            text-[13px]
                            font-bold
                            text-[#08783f]
                            shadow-sm
                            transition
                            hover:-translate-y-0.5
                            hover:bg-[#f5faf7]
                            hover:shadow-md
                        "
                    >
                        <ArrowLeft
                            size={17}
                            className="
                                transition-transform
                                group-hover:-translate-x-0.5
                            "
                        />

                        Back to Eligibility Result
                    </button>

                    {onBackToScheme && (
                        <button
                            type="button"
                            onClick={onBackToScheme}
                            className="
                                group
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-[#b9d8c3]
                                bg-white
                                px-5
                                py-3.5
                                text-[13px]
                                font-bold
                                text-[#08783f]
                                shadow-sm
                                transition
                                hover:-translate-y-0.5
                                hover:bg-[#f5faf7]
                                hover:shadow-md
                            "
                        >
                            <ArrowLeft
                                size={17}
                                className="
                                    transition-transform
                                    duration-200
                                    group-hover:-translate-x-0.5
                                "
                            />
                            Back to Scheme
                        </button>
                    )}
                </div>


                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        pb-4
                        text-center
                        text-[11px]
                        leading-5
                        text-[#718078]
                    "
                >
                    <ShieldCheck
                        size={14}
                        className="shrink-0 text-[#08783f]"
                    />

                    Always refer to the official website
                    and latest government notifications
                    before applying.
                </div>
            </main>
        </div>
    );
}


function Fact({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                border-b
                border-[#e6eee8]
                px-5
                py-5
                last:border-b-0
                sm:border-b-0
                sm:border-r
                sm:last:border-r-0
            "
        >
            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#edf8f0]
                    text-[#08783f]
                "
            >
                {icon}
            </div>

            <div className="min-w-0">
                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-[#08783f]
                    "
                >
                    {label}
                </p>

                <p
                    className="
                        mt-1
                        truncate
                        text-[12px]
                        font-medium
                        text-[#536159]
                    "
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Application Process Step                                                  */
/* -------------------------------------------------------------------------- */

function ProcessStep({
    index,
    total,
    title,
    text,
}: {
    index: number;
    total: number;
    title: string;
    text: string;
}) {
    const isLast = index === total - 1;

    return (
        <div className="relative flex gap-4">
            {/* Vertical line */}

            {!isLast && (
                <div
                    className="
                        absolute
                        left-[20px]
                        top-[43px]
                        h-[calc(100%+12px)]
                        w-px
                        bg-gradient-to-b
                        from-[#79b991]
                        to-[#dcebe1]
                    "
                />
            )}

            {/* Number */}

            <div
                className="
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#08783f]
                    text-white
                    shadow-[0_5px_14px_rgba(8,120,63,0.18)]
                "
            >
                {isLast ? (
                    <CheckCircle2 size={20} />
                ) : (
                    <span className="text-[13px] font-bold">
                        {index + 1}
                    </span>
                )}
            </div>

            {/* Content */}

            <div
                className="
                    mb-3
                    min-w-0
                    flex-1
                    rounded-[16px]
                    border
                    border-[#e7eee9]
                    bg-white
                    px-4
                    py-4
                    shadow-[0_3px_14px_rgba(25,65,42,0.035)]
                    transition
                    hover:border-[#cfe2d5]
                    hover:shadow-[0_7px_20px_rgba(25,65,42,0.06)]
                    sm:px-5
                    sm:py-5
                "
            >
                <div className="flex items-start gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#f0f8f2]
                            text-[#08783f]
                        "
                    >
                        {getStepIcon(index)}
                    </div>

                    <div className="min-w-0">
                        <h3
                            className="
                                text-[14px]
                                font-bold
                                text-[#101a31]
                            "
                        >
                            {title}
                        </h3>

                        <p
                            className="
                                mt-1
                                text-[12px]
                                leading-6
                                text-[#536159]
                            "
                        >
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Step Icons                                                                 */
/* -------------------------------------------------------------------------- */

function getStepIcon(index: number) {
    const icons = [
        <ExternalLink
            key="login"
            size={19}
        />,

        <UserRound
            key="details"
            size={19}
        />,

        <UploadCloud
            key="upload"
            size={19}
        />,

        <Landmark
            key="school"
            size={19}
        />,

        <FileCheck2
            key="submit"
            size={19}
        />,

        <CheckCircle2
            key="success"
            size={19}
        />,

        <Search
            key="track"
            size={19}
        />,
    ];

    return icons[index] || (
        <FileText size={19} />
    );
}

/* -------------------------------------------------------------------------- */
/* Quick Action                                                              */
/* -------------------------------------------------------------------------- */

function QuickAction({
    icon,
    title,
    text,
    onClick,
    disabled = false,
}: {
    icon: ReactNode;
    title: string;
    text: string;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={`
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                border
                border-transparent
                bg-white
                p-3.5
                text-left
                shadow-[0_3px_15px_rgba(25,65,42,0.05)]
                transition-all
                duration-200

                ${disabled
                    ? "cursor-not-allowed opacity-60"
                    : "hover:-translate-y-0.5 hover:border-[#d7e7dc] hover:shadow-md"
                }
            `}
        >
            <div
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#edf8f0]
                    text-[#08783f]
                    transition
                    group-hover:bg-[#e4f4e9]
                "
            >
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p
                    className="
                        text-[12px]
                        font-bold
                        text-[#08783f]
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        mt-0.5
                        text-[11px]
                        leading-5
                        text-[#536159]
                    "
                >
                    {text}
                </p>
            </div>

            <ArrowRight
                size={16}
                className="
                    shrink-0
                    text-[#08783f]
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                "
            />
        </button>
    );
}