"use client";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    FileText,
    GraduationCap,
    Home,
    Info,
    Search,
    ShieldCheck,
    UserRound,
    XCircle,
    AlertTriangle,
} from "lucide-react";

import type { EligibilityResultData } from "./eligibilityDetails";

type EligibilityResultProps = {
    result: EligibilityResultData;
    onBack: () => void;
};

export default function EligibilityResult({
    result,
    onBack,
}: EligibilityResultProps) {
    const isEligible =
        result.status === "eligible";

    const isNotEligible =
        result.status === "not_eligible";

    const isNotConfigured =
        result.status === "not_configured";

    return (
        <div className="min-h-screen">
            <main className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 lg:py-10">

                {/* ================================================= */}
                {/* STATUS */}
                {/* ================================================= */}

                <section className="text-center">

                    <div
                        className={`relative mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                            isEligible
                                ? "bg-[#e3f4e9]"
                                : isNotEligible
                                ? "bg-[#ffe8e8]"
                                : "bg-[#fff4d6]"
                        }`}
                    >
                        {isEligible && (
                            <CheckCircle2
                                size={43}
                                strokeWidth={1.8}
                                className="text-[#08783f]"
                            />
                        )}

                        {isNotEligible && (
                            <XCircle
                                size={43}
                                strokeWidth={1.8}
                                className="text-[#c62828]"
                            />
                        )}

                        {isNotConfigured && (
                            <AlertTriangle
                                size={43}
                                strokeWidth={1.8}
                                className="text-[#b77900]"
                            />
                        )}
                    </div>

                    <h1 className="mt-5 text-[29px] font-bold tracking-[-0.6px] text-[#172033] sm:text-[34px]">

                        {isEligible &&
                            "You are eligible!"}

                        {isNotEligible &&
                            "You are not eligible."}

                        {isNotConfigured &&
                            "Eligibility criteria not available"}
                    </h1>

                    <p className="mx-auto mt-3 max-w-[700px] text-[13px] leading-6 text-[#536159] sm:text-[14px]">
                        {result.message}
                    </p>
                </section>

                {/* ================================================= */}
                {/* SCHEME CARD */}
                {/* ================================================= */}

                <section
                    className={`mx-auto mt-8 max-w-[900px] rounded-xl p-6 sm:p-7 ${
                        isEligible
                            ? "bg-[#f2f9f4]"
                            : isNotEligible
                            ? "bg-[#fff4f4]"
                            : "bg-[#fffaf0]"
                    }`}
                >
                    <div className="flex items-start gap-5">

                        <div
                            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${
                                isEligible
                                    ? "bg-[#e1f2e6]"
                                    : isNotEligible
                                    ? "bg-[#ffe7e7]"
                                    : "bg-[#fff0c9]"
                            }`}
                        >
                            <GraduationCap
                                size={37}
                                strokeWidth={1.8}
                                className={
                                    isEligible
                                        ? "text-[#08783f]"
                                        : isNotEligible
                                        ? "text-[#c62828]"
                                        : "text-[#b77900]"
                                }
                            />
                        </div>

                        <div className="min-w-0">

                            <h2 className="text-[18px] font-bold text-[#172033] sm:text-[20px]">
                                {result.scheme.name}
                            </h2>

                            <p className="mt-1 text-[12px] font-medium text-[#536159] sm:text-[13px]">
                                {result.scheme.department},
                                Government of{" "}
                                {result.scheme.state}
                            </p>

                            <p className="mt-3 text-[12px] leading-6 text-[#536159] sm:text-[13px]">
                                {result.scheme.description}
                            </p>

                        </div>
                    </div>
                </section>

                {/* ================================================= */}
                {/* CASE 1 — ELIGIBLE */}
                {/* ================================================= */}

                {isEligible && (
                    <>
                        <section className="mx-auto mt-5 max-w-[900px] rounded-xl bg-[#f3f9f5] p-6 sm:p-7">

                            <h2 className="text-[15px] font-bold text-[#172033]">
                                What’s Next?
                            </h2>

                            <div className="mt-5 space-y-4">

                                <NextStep
                                    icon={
                                        <FileText
                                            size={19}
                                        />
                                    }
                                    text={
                                        result.nextStep ||
                                        "You can proceed with the application."
                                    }
                                />

                                <NextStep
                                    icon={
                                        <ShieldCheck
                                            size={19}
                                        />
                                    }
                                    text="Make sure you have all the required documents ready."
                                />

                                <NextStep
                                    icon={
                                        <Home
                                            size={19}
                                        />
                                    }
                                    text="Visit the official portal or nearest CSC to apply."
                                />

                            </div>
                        </section>

                        <InfoBox>
                            Final approval is subject to verification
                            by the concerned department.
                        </InfoBox>

                        <div className="mx-auto mt-4 max-w-[900px] space-y-3">

                            <ActionButton primary>
                                View How to Apply
                                <ArrowRight size={17} />
                            </ActionButton>

                            <ActionButton>
                                <FileText size={17} />
                                Download Scheme Details
                            </ActionButton>

                            <ActionButton>
                                Check Other Schemes
                                <ArrowRight size={17} />
                            </ActionButton>

                        </div>
                    </>
                )}

                {/* ================================================= */}
                {/* CASE 2 — NOT ELIGIBLE */}
                {/* ================================================= */}

                {isNotEligible && (
                    <>
                        {result.reasons?.length > 0 && (
                            <section className="mx-auto mt-5 max-w-[900px] rounded-xl bg-[#fff2f2] p-6 sm:p-7">

                                <h2 className="text-[15px] font-bold text-[#bd2525]">
                                    Why you are not eligible
                                </h2>

                                <div className="mt-4 space-y-2">

                                    {result.reasons.map(
                                        (reason, index) => (
                                            <div
                                                key={`${reason}-${index}`}
                                                className="flex items-start gap-3 rounded-lg bg-white px-4 py-3"
                                            >
                                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c62828]" />

                                                <p className="text-[12px] leading-5 text-[#536159]">
                                                    {reason}
                                                </p>
                                            </div>
                                        )
                                    )}

                                </div>
                            </section>
                        )}

                        <section className="mx-auto mt-5 max-w-[900px] rounded-xl bg-[#f4f8fc] p-6 sm:p-7">

                            <h2 className="text-[15px] font-bold text-[#172033]">
                                What can you do next?
                            </h2>

                            <div className="mt-4 space-y-2">

                                <NextStep
                                    blue
                                    icon={
                                        <Search
                                            size={18}
                                        />
                                    }
                                    text="Review the eligibility criteria of this scheme."
                                />

                                <NextStep
                                    blue
                                    icon={
                                        <CheckCircle2
                                            size={18}
                                        />
                                    }
                                    text="Explore other schemes that may be suitable for you."
                                />

                                <NextStep
                                    blue
                                    icon={
                                        <UserRound
                                            size={18}
                                        />
                                    }
                                    text="Visit your nearest CSC or help center for assistance."
                                />

                            </div>
                        </section>

                        <div className="mx-auto mt-4 max-w-[900px] space-y-3">

                            <ActionButton primary>
                                Explore Other Schemes
                                <ArrowRight size={17} />
                            </ActionButton>

                            <ActionButton>
                                View Similar Schemes
                            </ActionButton>

                            <ActionButton>
                                <Home size={17} />
                                Back to Home
                            </ActionButton>

                        </div>
                    </>
                )}

                {/* ================================================= */}
                {/* CASE 3 — NO ELIGIBILITY RULES */}
                {/* ================================================= */}

                {isNotConfigured && (
                    <>
                        <section className="mx-auto mt-5 max-w-[900px] rounded-xl border border-[#f1d58a] bg-[#fff9e8] p-6 sm:p-7">

                            <div className="flex items-start gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0c9] text-[#b77900]">
                                    <Info size={21} />
                                </div>

                                <div>

                                    <h2 className="text-[15px] font-bold text-[#8a5b00]">
                                        Eligibility information is not
                                        available
                                    </h2>

                                    <p className="mt-2 text-[12px] leading-6 text-[#66583c]">
                                        We currently do not have
                                        eligibility criteria configured
                                        for this scheme in our system.
                                        Therefore, we cannot confirm
                                        whether you are eligible or not.
                                    </p>

                                </div>
                            </div>
                        </section>

                        <section className="mx-auto mt-5 max-w-[900px] rounded-xl bg-[#f4f8fc] p-6 sm:p-7">

                            <h2 className="text-[15px] font-bold text-[#172033]">
                                What should you do?
                            </h2>

                            <div className="mt-4 space-y-4">

                                <NextStep
                                    blue
                                    icon={
                                        <Search
                                            size={18}
                                        />
                                    }
                                    text="Check the official government website for the latest eligibility criteria."
                                />

                                <NextStep
                                    blue
                                    icon={
                                        <UserRound
                                            size={18}
                                        />
                                    }
                                    text="Contact the concerned department or visit your nearest CSC for confirmation."
                                />

                                <NextStep
                                    blue
                                    icon={
                                        <ShieldCheck
                                            size={18}
                                        />
                                    }
                                    text="Do not assume eligibility until the official eligibility conditions are verified."
                                />

                            </div>
                        </section>

                        <InfoBox>
                            Eligibility could not be determined because
                            eligibility rules are not currently available
                            in our system. Please verify the information
                            through the official government source.
                        </InfoBox>

                        <div className="mx-auto mt-4 max-w-[900px] space-y-3">

                            <ActionButton primary>
                                Check Other Schemes
                                <ArrowRight size={17} />
                            </ActionButton>

                            <ActionButton>
                                View Scheme Details
                            </ActionButton>

                            <ActionButton>
                                <ArrowLeft size={17} />
                                Back to Eligibility Form
                            </ActionButton>

                        </div>
                    </>
                )}

            </main>
        </div>
    );
}

function NextStep({
    icon,
    text,
    blue = false,
}: {
    icon: React.ReactNode;
    text: string;
    blue?: boolean;
}) {
    return (
        <div className="flex items-center gap-4">

            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    blue
                        ? "bg-white text-[#0871d1]"
                        : "bg-white text-[#08783f]"
                }`}
            >
                {icon}
            </div>

            <p className="text-[12px] leading-5 text-[#536159]">
                {text}
            </p>

        </div>
    );
}

function InfoBox({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto mt-4 flex max-w-[900px] items-start gap-3 rounded-xl bg-[#f2f7fc] px-5 py-4">

            <Info
                size={18}
                className="mt-0.5 shrink-0 text-[#0871d1]"
            />

            <p className="text-[12px] leading-5 text-[#536159]">
                {children}
            </p>

        </div>
    );
}

function ActionButton({
    children,
    primary = false,
}: {
    children: React.ReactNode;
    primary?: boolean;
}) {
    return (
        <button
            type="button"
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-[13px] font-bold transition ${
                primary
                    ? "bg-[#08783f] text-white shadow-[0_7px_18px_rgba(8,120,63,0.18)] hover:bg-[#056b37]"
                    : "border border-[#87b99b] bg-white text-[#17683c] hover:bg-[#f4faf6]"
            }`}
        >
            {children}
        </button>
    );
}