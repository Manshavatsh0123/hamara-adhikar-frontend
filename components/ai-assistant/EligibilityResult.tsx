"use client";

import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Download,
    FileText,
    GraduationCap,
    Home,
    Info,
    Search,
    ShieldCheck,
    UserRound,
    XCircle,
} from "lucide-react";

import type { ReactNode } from "react";

import type { EligibilityResultData } from "./eligibilityDetails";

type EligibilityResultProps = {
    result: EligibilityResultData;
    onBack: () => void;
    onHowToApply: () => void;

    // Parent-page navigation callbacks.
    onCheckOtherSchemes?: () => void;
    onViewSchemeDetails?: () => void;
    onGoHome?: () => void;
};

export default function EligibilityResult({
    result,
    onBack,
    onHowToApply,
    onCheckOtherSchemes,
    onViewSchemeDetails,
    onGoHome,
}: EligibilityResultProps) {
    const status = result.status;

    const isEligible = status === "eligible";
    const isNotEligible = status === "not_eligible";
    const isNotConfigured = status === "not_configured";

    const goToOtherSchemes = () => {
        if (onCheckOtherSchemes) {
            onCheckOtherSchemes();
            return;
        }

        window.location.href = "/ai-assistant";
    };

    const goToSchemeDetails = () => {
        if (onViewSchemeDetails) {
            onViewSchemeDetails();
            return;
        }

        onBack();
    };

    const goHome = () => {
        if (onGoHome) {
            onGoHome();
            return;
        }

        window.location.href = "/";
    };

    const downloadExcel = () => {
        const applicant = result.applicant;

        const rows = [
            ["Sahay Bihar - Eligibility Check"],
            [],
            ["Eligibility Status", statusLabel(status)],
            ["Message", result.message],
            [],
            ["Scheme Details"],
            ["Scheme ID", result.scheme.id],
            ["Scheme Name", result.scheme.name],
            ["Department", result.scheme.department],
            ["State", result.scheme.state],
            ["Description", result.scheme.description],
            [],
            ["Applicant Details"],
            ["Age", applicant?.age ?? "Not provided"],
            ["Gender", applicant?.gender ?? "Not provided"],
            ["State", applicant?.state ?? "Not provided"],
            ["Occupation", applicant?.occupation ?? "Not provided"],
            ["Annual Family Income", applicant?.income ?? "Not provided"],
            ["Caste", applicant?.caste ?? "Not provided"],
            ["Person with Disability", applicant?.disability ? "Yes" : "No"],
            [],
            ["Reasons"],
            ...(result.reasons?.length
                ? result.reasons.map((reason, index) => [`${index + 1}.`, reason])
                : [["-", "No rejection reason provided."]]),
            [],
            ["Next Step", result.nextStep || "Please verify with the concerned department."],
            [],
            ["Important"],
            ["This result is informational. Final approval is subject to verification by the concerned department."],
        ];

        const escapeCell = (value: unknown) =>
            String(value ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");

        const htmlRows = rows
            .map(
                (row) =>
                    `<tr>${row
                        .map(
                            (cell) =>
                                `<td style="border:1px solid #d9e5dd;padding:8px;vertical-align:top;">${escapeCell(cell)}</td>`
                        )
                        .join("")}</tr>`
            )
            .join("");

        const html = `
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>Eligibility Check - ${escapeCell(result.scheme.name)}</title>
                </head>
                <body>
                    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;">
                        ${htmlRows}
                    </table>
                </body>
            </html>
        `;


        const blob = new Blob([html], {
            type: "application/vnd.ms-excel;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${safeFileName(result.scheme.name)}-eligibility.xls`;

        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="relative min-h-screen overflow-hidden">

            <div className="pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-[#dff4e7]/80 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-72 h-96 w-96 rounded-full bg-[#eaf3ff]/80 blur-3xl" />

            <main className="relative z-10 mx-auto w-full max-w-[1120px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

                <section
                    className={`relative overflow-hidden rounded-[32px] border p-7 shadow-[0_24px_70px_rgba(25,65,42,0.12)] sm:p-11 ${isEligible
                            ? "border-[#cce8d5] bg-gradient-to-br from-[#f5fcf7] via-white to-[#eaf8ef]"
                            : isNotEligible
                                ? "border-[#f1d2d2] bg-gradient-to-br from-[#fff7f7] via-white to-[#fff0f0]"
                                : "border-[#f0dda0] bg-gradient-to-br from-[#fffaf0] via-white to-[#fff5d9]"
                        }`}
                >
                    <div
                        className={`absolute -right-20 -top-20 h-56 w-56 rounded-full blur-2xl ${isEligible
                                ? "bg-[#d9f2e2]"
                                : isNotEligible
                                    ? "bg-[#ffe0e0]"
                                    : "bg-[#ffedbb]"
                            }`}
                    />

                    <div className="relative flex flex-col items-center text-center">
                        <div
                            className={`flex h-28 w-28 items-center justify-center rounded-full ring-[10px] shadow-[0_14px_35px_rgba(25,65,42,0.10)] ${isEligible
                                    ? "bg-[#dff5e7] text-[#08783f] ring-[#edf9f1]"
                                    : isNotEligible
                                        ? "bg-[#ffe3e3] text-[#c62828] ring-[#fff2f2]"
                                        : "bg-[#ffedc3] text-[#a66b00] ring-[#fff8e7]"
                                }`}
                        >
                            {isEligible ? (
                                <CheckCircle2 size={48} strokeWidth={1.8} />
                            ) : isNotEligible ? (
                                <XCircle size={48} strokeWidth={1.8} />
                            ) : (
                                <AlertTriangle size={48} strokeWidth={1.8} />
                            )}
                        </div>

                        <div className="mt-6">
                            <div
                                className={`mx-auto mb-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${isEligible
                                        ? "bg-[#e1f5e8] text-[#08783f]"
                                        : isNotEligible
                                            ? "bg-[#ffe7e7] text-[#bd2525]"
                                            : "bg-[#fff0c9] text-[#946100]"
                                    }`}
                            >
                                {isEligible
                                    ? "Eligibility confirmed"
                                    : isNotEligible
                                        ? "Eligibility check completed"
                                        : "Verification required"}
                            </div>

                            <h1 className="text-[31px] font-extrabold tracking-[-1px] text-[#122019] sm:text-[42px]">
                                {isEligible
                                    ? "You are eligible!"
                                    : isNotEligible
                                        ? "You are not eligible."
                                        : "Eligibility criteria not available"}
                            </h1>

                            <p className="mx-auto mt-3 max-w-[760px] text-[13px] leading-6 text-[#536159] sm:text-[14px]">
                                {result.message}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-5 overflow-hidden rounded-[26px] border border-[#dce9e1] bg-white/95 shadow-[0_16px_42px_rgba(25,65,42,0.08)]">
                    <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-8">
                        <div
                            className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[20px] shadow-sm ${isEligible
                                    ? "bg-[#e5f6eb] text-[#08783f]"
                                    : isNotEligible
                                        ? "bg-[#ffe8e8] text-[#c62828]"
                                        : "bg-[#fff1ce] text-[#a66b00]"
                                }`}
                        >
                            <GraduationCap size={34} strokeWidth={1.8} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#7b8881]">
                                Scheme
                            </p>

                            <h2 className="mt-1 text-[20px] font-extrabold leading-7 tracking-[-0.3px] text-[#122019] sm:text-[23px]">
                                {result.scheme.name}
                            </h2>

                            <p className="mt-1 text-[12px] font-semibold text-[#08783f]">
                                {result.scheme.department} · Government of{" "}
                                {result.scheme.state}
                            </p>

                            <p className="mt-3 text-[12px] leading-6 text-[#536159] sm:text-[13px]">
                                {result.scheme.description}
                            </p>
                        </div>

                        <div
                            className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ${isEligible
                                    ? "bg-[#eaf8ef] text-[#08783f]"
                                    : isNotEligible
                                        ? "bg-[#fff0f0] text-[#bd2525]"
                                        : "bg-[#fff6dd] text-[#946100]"
                                }`}
                        >
                            ID: {result.scheme.id}
                        </div>
                    </div>
                </section>

                {result.applicant && (
                    <section className="mt-5 rounded-[26px] border border-[#dfeae3] bg-white/92 p-6 shadow-[0_14px_38px_rgba(25,65,42,0.06)] sm:p-8">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef8f2] text-[#08783f]">
                                <UserRound size={19} />
                            </div>

                            <div>
                                <h2 className="text-[15px] font-bold text-[#172033]">
                                    Information used for this check
                                </h2>
                                <p className="mt-1 text-[11px] leading-5 text-[#6a756f]">
                                    These are the details sent to the eligibility API.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <ApplicantItem label="Age" value={`${result.applicant.age} years`} />
                            <ApplicantItem label="Gender" value={result.applicant.gender} />
                            <ApplicantItem label="State" value={result.applicant.state} />
                            <ApplicantItem label="Occupation" value={result.applicant.occupation} />
                            <ApplicantItem
                                label="Annual income"
                                value={`₹${Number(result.applicant.income).toLocaleString("en-IN")}`}
                            />
                            <ApplicantItem label="Caste" value={result.applicant.caste} />
                            <ApplicantItem
                                label="Disability"
                                value={result.applicant.disability ? "Yes" : "No"}
                            />
                        </div>
                    </section>
                )}

                {/* Eligible */}
                {isEligible && (
                    <>
                        <section className="relative mt-5 overflow-hidden rounded-[28px] border border-[#c8e5d2] bg-[linear-gradient(135deg,#effaf3_0%,#ffffff_58%,#f4fbf6_100%)] p-6 shadow-[0_16px_42px_rgba(8,120,63,0.08)] sm:p-8">
                            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#e2f5e8] blur-2xl" />

                            <div className="relative">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dff4e6] text-[#08783f]">
                                        <ArrowRight size={19} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#4e8c68]">
                                            Next step
                                        </p>
                                        <h2 className="text-[17px] font-bold text-[#172033]">
                                            You can proceed with the application
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-3">
                                    <NextStep
                                        icon={<FileText size={18} />}
                                        text={result.nextStep || "Proceed with the application through the official process."}
                                    />
                                    <NextStep
                                        icon={<ShieldCheck size={18} />}
                                        text="Keep all required documents ready before applying."
                                    />
                                    <NextStep
                                        icon={<Home size={18} />}
                                        text="Use the official government portal or nearest CSC for submission."
                                    />
                                </div>
                            </div>
                        </section>

                        <InfoBox tone="blue">
                            Final approval is subject to verification by the concerned department.
                        </InfoBox>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <ActionButton primary onClick={onHowToApply}>
                                View How to Apply
                                <ArrowRight size={17} />
                            </ActionButton>

                            <ActionButton onClick={downloadExcel}>
                                <Download size={17} />
                                Download as Excel
                            </ActionButton>

                            <ActionButton onClick={goToOtherSchemes}>
                                Check Other Schemes
                                <ArrowRight size={17} />
                            </ActionButton>

                            <ActionButton onClick={goToSchemeDetails}>
                                <FileText size={17} />
                                View Scheme Details
                            </ActionButton>
                        </div>
                    </>
                )}


                {isNotEligible && (
                    <>
                        <section className="mt-5 rounded-[28px] border border-[#f0d4d4] bg-[linear-gradient(135deg,#fff2f2_0%,#ffffff_58%,#fff7f7_100%)] p-6 shadow-[0_16px_42px_rgba(198,40,40,0.07)] sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe4e4] text-[#c62828]">
                                    <XCircle size={19} />
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#c05a5a]">
                                        Eligibility result
                                    </p>
                                    <h2 className="text-[17px] font-bold text-[#172033]">
                                        Why you are not eligible
                                    </h2>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3">
                                {result.reasons?.length ? (
                                    result.reasons.map((reason, index) => (
                                        <div
                                            key={`${reason}-${index}`}
                                            className="flex items-start gap-3 rounded-xl border border-[#f3e1e1] bg-white px-4 py-3.5"
                                        >
                                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffe6e6] text-[10px] font-bold text-[#c62828]">
                                                {index + 1}
                                            </span>
                                            <p className="text-[12px] leading-5 text-[#536159]">
                                                {reason}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="rounded-xl bg-white p-4 text-[12px] text-[#536159]">
                                        The department has not provided a specific reason.
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="mt-5 rounded-[28px] border border-[#d8e7f4] bg-[linear-gradient(135deg,#f1f7fd_0%,#ffffff_60%,#f7fbff_100%)] p-6 shadow-[0_14px_38px_rgba(8,113,209,0.06)] sm:p-8">
                            <h2 className="text-[17px] font-bold text-[#172033]">
                                What can you do next?
                            </h2>

                            <div className="mt-5 space-y-3">
                                <NextStep
                                    blue
                                    icon={<Search size={18} />}
                                    text="Review the eligibility conditions and understand which requirement was not satisfied."
                                />
                                <NextStep
                                    blue
                                    icon={<CheckCircle2 size={18} />}
                                    text="Explore other Bihar government schemes that may better match your profile."
                                />
                                <NextStep
                                    blue
                                    icon={<UserRound size={18} />}
                                    text="Contact the concerned department or nearest CSC if you need clarification."
                                />
                            </div>
                        </section>

                        <InfoBox tone="blue">
                            This result is based on the eligibility rules currently configured in the system.
                        </InfoBox>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <ActionButton primary onClick={goToOtherSchemes}>
                                Explore Other Schemes
                                <ArrowRight size={17} />
                            </ActionButton>

                            <ActionButton onClick={goToOtherSchemes}>
                                View Similar Schemes
                            </ActionButton>

                            <ActionButton onClick={goToSchemeDetails}>
                                <FileText size={17} />
                                View Scheme Details
                            </ActionButton>

                            <ActionButton onClick={goHome}>
                                <Home size={17} />
                                Back to Home
                            </ActionButton>
                        </div>
                    </>
                )}

                {/* Not configured */}
                {isNotConfigured && (
                    <>
                        <section className="relative mt-5 overflow-hidden rounded-[28px] border border-[#efd58b] bg-[linear-gradient(135deg,#fff8e4_0%,#ffffff_58%,#fff4d4_100%)] p-6 shadow-[0_16px_42px_rgba(166,107,0,0.09)] sm:p-8">
                            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#ffedb8] blur-2xl" />

                            <div className="relative flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0c7] text-[#a66b00]">
                                    <AlertTriangle size={24} />
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#aa7a17]">
                                        Manual verification required
                                    </p>
                                    <h2 className="mt-1 text-[19px] font-bold text-[#172033]">
                                        Eligibility information is not available
                                    </h2>
                                    <p className="mt-2 max-w-[760px] text-[12px] leading-6 text-[#66583c]">
                                        No eligibility rules are currently configured for this scheme in our system.
                                        We therefore cannot confirm whether you are eligible or not.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mt-5 rounded-[28px] border border-[#d8e7f4] bg-[linear-gradient(135deg,#f1f7fd_0%,#ffffff_60%,#f7fbff_100%)] p-6 shadow-[0_14px_38px_rgba(8,113,209,0.06)] sm:p-8">
                            <h2 className="text-[17px] font-bold text-[#172033]">
                                What should you do?
                            </h2>

                            <div className="mt-5 space-y-3">
                                <NextStep
                                    blue
                                    icon={<Search size={18} />}
                                    text="Check the official government website for the latest eligibility criteria."
                                />
                                <NextStep
                                    blue
                                    icon={<UserRound size={18} />}
                                    text="Contact the concerned department or visit your nearest CSC for confirmation."
                                />
                                <NextStep
                                    blue
                                    icon={<ShieldCheck size={18} />}
                                    text="Do not assume eligibility until the official eligibility conditions are verified."
                                />
                            </div>
                        </section>

                        <InfoBox tone="warning">
                            Eligibility could not be determined because rules are not currently available in our system.
                            Please verify the latest conditions through the official government source.
                        </InfoBox>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <ActionButton primary onClick={goToOtherSchemes}>
                                Check Other Schemes
                                <ArrowRight size={17} />
                            </ActionButton>

                            <ActionButton onClick={goToSchemeDetails}>
                                <FileText size={17} />
                                View Scheme Details
                            </ActionButton>

                            <ActionButton onClick={onBack}>
                                <ArrowLeft size={17} />
                                Back to Eligibility Form
                            </ActionButton>

                            <ActionButton onClick={goHome}>
                                <Home size={17} />
                                Back to Home
                            </ActionButton>
                        </div>
                    </>
                )}

                <p className="mt-7 text-center text-[10px] leading-5 text-[#78847e]">
                    Sahay Bihar provides guidance based on available scheme information.
                    Always verify final eligibility with the concerned government department.
                </p>
            </main>

        </div>
    );

}

function statusLabel(status: EligibilityResultData["status"]) {
    if (status === "eligible") return "Eligible";
    if (status === "not_eligible") return "Not eligible";
    return "Eligibility criteria not available";
}

function safeFileName(name: string) {
    return name
        .trim()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "scheme";
}

function ApplicantItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-[#e2ebe5] bg-[linear-gradient(145deg,#ffffff,#f8fcf9)] px-4 py-3.5 shadow-[0_4px_14px_rgba(25,65,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#c8ded0] hover:shadow-[0_8px_20px_rgba(25,65,42,0.07)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7a8780]">
                {label}
            </p>
            <p className="mt-1 truncate text-[12px] font-bold text-[#27352d]">
                {value}
            </p>
        </div>
    );
}

function NextStep({
    icon,
    text,
    blue = false,
}: {
    icon: ReactNode;
    text: string;
    blue?: boolean;
}) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-white/80 bg-white/80 px-4 py-3">
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${blue
                        ? "bg-[#edf5fd] text-[#0871d1]"
                        : "bg-[#eaf7ee] text-[#08783f]"
                    }`}
            >
                {icon}
            </div>

            <p className="pt-1 text-[12px] leading-5 text-[#536159]">
                {text}
            </p>
        </div>
    );
}

function InfoBox({
    children,
    tone = "blue",
}: {
    children: ReactNode;
    tone?: "blue" | "warning";
}) {
    return (
        <div
            className={`mt-5 flex items-start gap-3 rounded-2xl border px-5 py-4 ${tone === "warning"
                    ? "border-[#f0dda5] bg-[#fffaf0]"
                    : "border-[#dce8f4] bg-[#f5f9fd]"
                }`}
        >
            <Info
                size={18}
                className={`mt-0.5 shrink-0 ${tone === "warning" ? "text-[#a66b00]" : "text-[#0871d1]"
                    }`}
            />

            <p className="text-[12px] leading-5 text-[#536159]">
                {children}
            </p>
        </div>
    );
}

function ActionButton({
    children,
    onClick,
    primary = false,
}: {
    children: ReactNode;
    onClick: () => void;
    primary?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-[13px] font-bold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 ${primary
                    ? "bg-[linear-gradient(135deg,#0b8b4b,#08783f)] text-white shadow-[0_12px_28px_rgba(8,120,63,0.24)] hover:shadow-[0_16px_34px_rgba(8,120,63,0.28)]"
                    : "border border-[#b7d4c1] bg-white/90 text-[#17683c] shadow-[0_6px_18px_rgba(25,65,42,0.05)] hover:border-[#7fb596] hover:bg-[#f4faf6] hover:shadow-[0_10px_24px_rgba(25,65,42,0.08)]"
                }`}
        >
            {children}
        </button>
    );
}
