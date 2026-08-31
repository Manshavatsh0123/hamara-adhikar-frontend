"use client";

import {
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle2,
    Clipboard,
    ExternalLink,
    FileText,
    GraduationCap,
    Info,
    Link2,
    MapPin,
    Percent,
    Share2,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";
import { useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

export type SchemeDetailsData = {
    id: string;
    name: string;
    department: string;
    state: string;
    description: string;
    rank?: number;

    /*
     * Already available in your current frontend model.
     */
    benefits: string[];
    eligibility: string[];

    /*
     * Optional fields.
     *
     * Your current API does not return these yet.
     * They are intentionally optional so the UI can
     * use them automatically when your backend provides them.
     */
    schemeCode?: string | null;

    loanAmount?: string | null;
    interestRate?: string | null;
    beneficiaries?: string | null;

    documents?: string[];
    applicationProcess?: string | null;
    officialSource?: string | null;
    applicationUrl?: string | null;

    applicableFor?: string[];
    faq?: Array<{
        question: string;
        answer: string;
    }>;
};

type SchemeDetailsProps = {
    scheme: SchemeDetailsData;
    onBack: () => void;
    onCheckEligibility: () => void;
};

/* =========================================================
   SMALL HELPERS
========================================================= */

function cleanText(value: string | null | undefined): string {
    if (!value) {
        return "";
    }

    return value
        .replace(/\*\*/g, "")
        .replace(/^#+\s*/, "")
        .replace(/^[-*•]\s*/, "")
        .trim();
}

function cleanList(items: string[] | undefined): string[] {
    if (!Array.isArray(items)) {
        return [];
    }

    return items
        .map(cleanText)
        .filter(Boolean);
}

/*
 * When the backend/AI does not explicitly provide benefits,
 * we can still present useful points from the actual scheme
 * description without inventing financial figures.
 */
function createDescriptionBenefits(
    description: string
): string[] {
    const text = description.trim();

    if (!text) {
        return [];
    }

    const benefits: string[] = [];

    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

    const benefitKeywords = [
        "aims to",
        "provide",
        "provides",
        "free",
        "improve",
        "enabling",
        "support",
        "employment",
        "self-employed",
        "training",
    ];

    for (const sentence of sentences) {
        const lower = sentence.toLowerCase();

        if (
            benefitKeywords.some((keyword) =>
                lower.includes(keyword)
            )
        ) {
            benefits.push(sentence);
        }

        if (benefits.length >= 5) {
            break;
        }
    }

    return benefits;
}



function SchemeIcon({
    scheme,
}: {
    scheme: SchemeDetailsData;
}) {
    const name = scheme.name.toLowerCase();
    const department =
        scheme.department.toLowerCase();

    if (
        name.includes("student") ||
        name.includes("education") ||
        name.includes("school") ||
        name.includes("scholarship") ||
        name.includes("medhavriti") ||
        department.includes("education")
    ) {
        return (
            <GraduationCap
                size={42}
                strokeWidth={1.8}
            />
        );
    }

    return (
        <Sparkles
            size={40}
            strokeWidth={1.8}
        />
    );
}

/* =========================================================
   SECTION CARD
========================================================= */

function SectionCard({
    id,
    title,
    children,
}: {
    id?: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section
            id={id}
            className="rounded-[22px] border border-[#dfe9e2] bg-white p-5 shadow-[0_5px_22px_rgba(24,70,43,0.045)] sm:p-6"
        >
            <h2 className="text-[18px] font-bold tracking-[-0.25px] text-[#172033] sm:text-[19px]">
                {title}
            </h2>

            <div className="mt-4">
                {children}
            </div>
        </section>
    );
}

/* =========================================================
   CHECK LIST
========================================================= */

function CheckList({
    items,
    emptyText = "Details are not available in the current scheme data.",
}: {
    items: string[];
    emptyText?: string;
}) {
    if (!items.length) {
        return (
            <div className="rounded-[14px] border border-dashed border-[#d7e5db] bg-[#f8fbf9] px-4 py-3.5">
                <p className="text-[12px] leading-5 text-[#758279]">
                    {emptyText}
                </p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li
                    key={`${item}-${index}`}
                    className="flex items-start gap-3"
                >
                    <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3f5e8] text-[#08783f]">
                        <CheckCircle2
                            size={13}
                            strokeWidth={2.3}
                        />
                    </span>

                    <span className="text-[13px] leading-6 text-[#435249] sm:text-[14px]">
                        {cleanText(item)}
                    </span>
                </li>
            ))}
        </ul>
    );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 border-b border-[#dce8df] py-3.5 last:border-b-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#08783f] shadow-sm">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#718078]">
                    {label}
                </p>

                <p className="mt-0.5 break-words text-[13px] font-semibold text-[#172033]">
                    {value}
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SchemeDetails({
    scheme,
    onBack,
    onCheckEligibility,
}: SchemeDetailsProps) {
    const [copied, setCopied] = useState(false);

    /*
     * Use explicitly provided benefits first.
     *
     * If the AI parser did not find benefits,
     * derive safe display points from the actual
     * description.
     */
    const benefits = useMemo(() => {
        const explicitBenefits =
            cleanList(scheme.benefits);

        if (explicitBenefits.length) {
            return explicitBenefits;
        }

        return createDescriptionBenefits(
            scheme.description
        );
    }, [
        scheme.benefits,
        scheme.description,
    ]);

    const eligibility = useMemo(
        () => cleanList(scheme.eligibility),
        [scheme.eligibility]
    );

    const applicableFor = useMemo(() => {
        return cleanList(
            scheme.applicableFor
        );
    }, [scheme.applicableFor]);

    const documents = useMemo(() => {
        return cleanList(scheme.documents);
    }, [scheme.documents]);

    /*
     * This is what COPY actually copies.
     *
     * It contains scheme information rather than
     * simply copying window.location.href.
     */
    const getShareText = () => {
        const currentUrl =
            typeof window !== "undefined"
                ? window.location.href
                : "";

        const lines: string[] = [];

        lines.push(
            `Sahay Bihar - ${scheme.name}`
        );

        lines.push("");

        lines.push(
            `Department: ${scheme.department}`
        );

        lines.push(
            `State: ${scheme.state}`
        );

        if (scheme.schemeCode) {
            lines.push(
                `Scheme Code: ${scheme.schemeCode}`
            );
        }

        if (scheme.description) {
            lines.push("");

            lines.push("About the Scheme:");

            lines.push(
                cleanText(scheme.description)
            );
        }

        if (benefits.length) {
            lines.push("");

            lines.push("Key Benefits:");

            benefits.forEach((benefit) => {
                lines.push(`• ${cleanText(benefit)}`);
            });
        }

        if (eligibility.length) {
            lines.push("");

            lines.push("Who can apply:");

            eligibility.forEach((item) => {
                lines.push(`• ${cleanText(item)}`);
            });
        }

        if (applicableFor.length) {
            lines.push("");

            lines.push("Applicable For:");

            applicableFor.forEach((item) => {
                lines.push(`• ${cleanText(item)}`);
            });
        }

        if (documents.length) {
            lines.push("");

            lines.push("Required Documents:");

            documents.forEach((item) => {
                lines.push(`• ${cleanText(item)}`);
            });
        }

        if (scheme.applicationProcess) {
            lines.push("");

            lines.push("How to Apply:");

            lines.push(
                cleanText(
                    scheme.applicationProcess
                )
            );
        }

        if (scheme.applicationUrl) {
            lines.push("");

            lines.push(
                `Apply here: ${scheme.applicationUrl}`
            );
        } else if (scheme.officialSource) {
            lines.push("");

            lines.push(
                `Official source: ${scheme.officialSource}`
            );
        }

        if (currentUrl) {
            lines.push("");

            lines.push(
                `View full scheme details: ${currentUrl}`
            );
        }

        return lines.join("\n");
    };

    /* =====================================================
       COPY COMPLETE DETAILS
    ===================================================== */

    const handleCopy = async () => {
        const text = getShareText();

        try {
            await navigator.clipboard.writeText(text);

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy scheme details:",
                error
            );

            /*
             * Fallback for browsers where clipboard
             * API is unavailable.
             */
            try {
                const textarea =
                    document.createElement(
                        "textarea"
                    );

                textarea.value = text;

                textarea.style.position =
                    "fixed";

                textarea.style.opacity = "0";

                document.body.appendChild(
                    textarea
                );

                textarea.focus();

                textarea.select();

                document.execCommand("copy");

                textarea.remove();

                setCopied(true);

                window.setTimeout(() => {
                    setCopied(false);
                }, 2000);
            } catch (fallbackError) {
                console.error(
                    "Clipboard fallback failed:",
                    fallbackError
                );
            }
        }
    };

    /* =====================================================
       WHATSAPP SHARE
    ===================================================== */

    const handleWhatsAppShare = () => {
        const text = getShareText();

        const whatsappUrl =
            `https://wa.me/?text=${encodeURIComponent(
                text
            )}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };
    

    /* =====================================================
       NATIVE SHARE
    ===================================================== */

    const handleNativeShare = async () => {
        const text = getShareText();

        try {
            if (
                typeof navigator !== "undefined" &&
                typeof navigator.share === "function"
            ) {
                await navigator.share({
                    title: scheme.name,
                    text,
                });

                return;
            }

            await handleCopy();
        } catch (error) {
            /*
             * Closing the native share dialog is normal.
             * We don't show an error for that.
             */
            console.log(
                "Native share cancelled:",
                error
            );
        }
    };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div className="w-full max-w-[1180px]">
            {/* =================================================
                TOP ACTION BAR
            ================================================= */}

            <div className="mb-5 flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#cfe3d5] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#08783f] shadow-[0_4px_16px_rgba(8,120,63,0.06)] transition hover:border-[#a9cdb5] hover:bg-[#f4faf5] sm:px-5 sm:py-3 sm:text-[13px]"
                >
                    <ArrowLeft
                        size={16}
                        className="transition-transform group-hover:-translate-x-0.5"
                    />

                    <span>
                        Back to recommendations
                    </span>
                </button>

                <div className="flex items-center gap-2">
                    {/* COPY */}
                    <button
                        type="button"
                        onClick={handleCopy}
                        aria-label="Copy complete scheme details"
                        title="Copy scheme details"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dce9df] bg-white text-[#08783f] shadow-sm transition hover:border-[#b8d6c1] hover:bg-[#f2f9f3]"
                    >
                        {copied ? (
                            <Check size={17} />
                        ) : (
                            <Clipboard size={17} />
                        )}
                    </button>

                    {/* WHATSAPP */}
                    <button
                        type="button"
                        onClick={
                            handleWhatsAppShare
                        }
                        aria-label="Share scheme on WhatsApp"
                        title="Share on WhatsApp"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dce9df] bg-white text-[#08783f] shadow-sm transition hover:border-[#b8d6c1] hover:bg-[#f2f9f3]"
                    >
                        <Share2 size={17} />
                    </button>
                </div>
            </div>

            {/* =================================================
                MAIN SCHEME CONTAINER
            ================================================= */}

            <article className="overflow-hidden rounded-[28px] border border-[#dfe9e2] bg-white shadow-[0_16px_48px_rgba(25,65,42,0.09)]">
                {/* =================================================
                    HERO
                ================================================= */}

                <div className="relative overflow-hidden bg-gradient-to-br from-[#eef9f1] via-white to-white px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
                    <div className="pointer-events-none absolute -right-24 -top-28 h-[300px] w-[300px] rounded-full bg-[#dff2e4]/70 blur-3xl" />

                    <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-center">
                        {/* HERO LEFT */}

                        <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                            <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[25px] bg-[#e1f3e6] text-[#08783f] ring-1 ring-[#cce5d3] sm:h-[96px] sm:w-[96px]">
                                <SchemeIcon
                                    scheme={scheme}
                                />
                            </div>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-[#dff2e4] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#176638]">
                                        Government Scheme
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#08783f] shadow-sm ring-1 ring-[#dceadf]">
                                        <ShieldCheck
                                            size={13}
                                        />

                                        Verified
                                    </span>
                                </div>

                                <h1 className="mt-3 max-w-[760px] text-[26px] font-bold leading-[1.12] tracking-[-0.8px] text-[#172033] sm:text-[33px] lg:text-[38px]">
                                    {scheme.name}
                                </h1>

                                <p className="mt-2 max-w-[760px] text-[13px] font-medium leading-6 text-[#526158] sm:text-[15px]">
                                    {scheme.department}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#4f6258] shadow-sm ring-1 ring-[#e1ebe4]">
                                        <MapPin
                                            size={13}
                                            className="text-[#08783f]"
                                        />

                                        {scheme.state}
                                    </span>

                                    {scheme.schemeCode && (
                                        <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#4f6258] shadow-sm ring-1 ring-[#e1ebe4]">
                                            Code:{" "}
                                            {scheme.schemeCode}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            QUICK INFORMATION
                        ================================================= */}

                        <div className="rounded-[22px] border border-[#dce9df] bg-white/90 p-3 shadow-[0_10px_30px_rgba(30,75,48,0.07)] backdrop-blur-xl">
                            <div className="rounded-[17px] bg-[#f3faf4] px-4">

                                <p className="pt-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[#5e7c68]">
                                    Scheme Information
                                </p>

                                <InfoRow
                                    icon={<MapPin size={17} />}
                                    label="State"
                                    value={scheme.state}
                                />

                                <InfoRow
                                    icon={<FileText size={17} />}
                                    label="Department"
                                    value={scheme.department}
                                />

                                {scheme.loanAmount && (
                                    <InfoRow
                                        icon={
                                            <span className="text-[17px] font-bold">
                                                ₹
                                            </span>
                                        }
                                        label="Loan / Amount"
                                        value={scheme.loanAmount}
                                    />
                                )}

                                {scheme.interestRate && (
                                    <InfoRow
                                        icon={<Percent size={17} />}
                                        label="Interest Rate"
                                        value={scheme.interestRate}
                                    />
                                )}

                                {scheme.beneficiaries && (
                                    <InfoRow
                                        icon={<Users size={17} />}
                                        label="Beneficiaries"
                                        value={scheme.beneficiaries}
                                    />
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav className="border-b border-[#e5ece7] bg-white px-4 sm:px-8">
                    <div className="flex gap-6 overflow-x-auto">
                        <a
                            href="#overview"
                            className="whitespace-nowrap border-b-2 border-[#08783f] px-1 py-4 text-[12px] font-bold text-[#08783f]"
                        >
                            Overview
                        </a>

                        {benefits.length > 0 && (
                            <a
                                href="#benefits"
                                className="whitespace-nowrap px-1 py-4 text-[12px] font-semibold text-[#536158] transition hover:text-[#08783f]"
                            >
                                Benefits
                            </a>
                        )}

                        {eligibility.length > 0 && (
                            <a
                                href="#eligibility"
                                className="whitespace-nowrap px-1 py-4 text-[12px] font-semibold text-[#536158] transition hover:text-[#08783f]"
                            >
                                Eligibility
                            </a>
                        )}

                        {documents.length > 0 && (
                            <a
                                href="#documents"
                                className="whitespace-nowrap px-1 py-4 text-[12px] font-semibold text-[#536158] transition hover:text-[#08783f]"
                            >
                                Documents
                            </a>
                        )}

                        {scheme.applicationProcess && (
                            <a
                                href="#apply"
                                className="whitespace-nowrap px-1 py-4 text-[12px] font-semibold text-[#536158] transition hover:text-[#08783f]"
                            >
                                How to Apply
                            </a>
                        )}

                        {scheme.faq?.length ? (
                            <a
                                href="#faq"
                                className="whitespace-nowrap px-1 py-4 text-[12px] font-semibold text-[#536158] transition hover:text-[#08783f]"
                            >
                                FAQ
                            </a>
                        ) : null}
                    </div>
                </nav>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
                        {/* =================================================
                            LEFT COLUMN
                        ================================================= */}

                        <div className="space-y-5">
                            {/* ABOUT */}

                            <SectionCard
                                id="overview"
                                title="About the Scheme"
                            >
                                <p className="text-[13px] leading-7 text-[#4e5d55] sm:text-[14px]">
                                    {scheme.description ||
                                        "Scheme description is not available in the current data."}
                                </p>
                            </SectionCard>

                            {/* BENEFITS */}

                            <SectionCard
                                id="benefits"
                                title="Key Benefits"
                            >
                                <CheckList
                                    items={benefits}
                                    emptyText="Specific benefits are not available in the current API response."
                                />
                            </SectionCard>

                            {/* WHO CAN APPLY */}

                            <SectionCard
                                title="Who can apply?"
                            >
                                <CheckList
                                    items={
                                        eligibility
                                    }
                                    emptyText="Specific applicant criteria are not available in the current API response."
                                />
                            </SectionCard>

                            {/* APPLICABLE FOR */}

                            {applicableFor.length >
                                0 && (
                                    <SectionCard
                                        title="Applicable For"
                                    >
                                        <CheckList
                                            items={
                                                applicableFor
                                            }
                                        />
                                    </SectionCard>
                                )}

                            {/* REQUIRED DOCUMENTS */}

                            {documents.length >
                                0 && (
                                    <SectionCard
                                        id="documents"
                                        title="Required Documents"
                                    >
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {documents.map(
                                                (
                                                    document,
                                                    index
                                                ) => (
                                                    <div
                                                        key={`${document}-${index}`}
                                                        className="flex items-center gap-3 rounded-[14px] border border-[#e2ebe5] bg-[#f8fbf9] px-3.5 py-3"
                                                    >
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#08783f] shadow-sm">
                                                            <FileText
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                        </div>

                                                        <span className="text-[12px] font-medium leading-5 text-[#42534a]">
                                                            {
                                                                document
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </SectionCard>
                                )}

                            {/* HOW TO APPLY */}

                            {scheme.applicationProcess && (
                                <SectionCard
                                    id="apply"
                                    title="How to Apply"
                                >
                                    <p className="text-[13px] leading-7 text-[#4e5d55] sm:text-[14px]">
                                        {
                                            scheme.applicationProcess
                                        }
                                    </p>

                                    {scheme.applicationUrl && (
                                        <a
                                            href={
                                                scheme.applicationUrl
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#08783f] px-5 py-3 text-[12px] font-bold text-white shadow-[0_8px_20px_rgba(8,120,63,0.18)] transition hover:bg-[#056b37]"
                                        >
                                            Apply / Visit Official Portal

                                            <ExternalLink
                                                size={
                                                    14
                                                }
                                            />
                                        </a>
                                    )}
                                </SectionCard>
                            )}

                            {/* FAQ */}

                            {scheme.faq &&
                                scheme.faq.length >
                                0 && (
                                    <SectionCard
                                        id="faq"
                                        title="Frequently Asked Questions"
                                    >
                                        <div className="space-y-4">
                                            {scheme.faq.map(
                                                (
                                                    item,
                                                    index
                                                ) => (
                                                    <div
                                                        key={`${item.question}-${index}`}
                                                        className="rounded-[15px] border border-[#e2ebe5] bg-[#f8fbf9] p-4"
                                                    >
                                                        <h3 className="text-[13px] font-bold text-[#172033]">
                                                            {
                                                                item.question
                                                            }
                                                        </h3>

                                                        <p className="mt-2 text-[12px] leading-6 text-[#59685f]">
                                                            {
                                                                item.answer
                                                            }
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </SectionCard>
                                )}
                        </div>

                        {/* =================================================
                            RIGHT COLUMN
                        ================================================= */}

                        <aside className="space-y-5">
                            {/* ELIGIBILITY */}

                            <div
                                id="eligibility"
                                className="rounded-[22px] border border-[#dcebe0] bg-[#f4faf5] p-5 sm:p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#08783f] shadow-sm">
                                        <ShieldCheck
                                            size={19}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-[17px] font-bold text-[#172033]">
                                            Eligibility Criteria
                                        </h2>

                                        <p className="mt-0.5 text-[11px] text-[#6c7b72]">
                                            Who can qualify
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <CheckList
                                        items={
                                            eligibility
                                        }
                                        emptyText="Eligibility information is not available in the current API response."
                                    />
                                </div>
                            </div>

                            {/* CHECK ELIGIBILITY */}

                            <div className="rounded-[22px] border border-[#cde5d4] bg-gradient-to-br from-[#eaf8ed] to-[#f8fcf9] p-5 sm:p-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#08783f] shadow-sm">
                                    <Sparkles
                                        size={18}
                                    />
                                </div>

                                <h2 className="mt-4 text-[19px] font-bold leading-6 text-[#145d38]">
                                    Ready to check your eligibility?
                                </h2>

                                <p className="mt-2 text-[12px] leading-5 text-[#5d7064]">
                                    Answer a few questions and Sahay AI can help you understand whether this scheme may be suitable for you.
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        onCheckEligibility
                                    }
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#08783f] px-5 py-3.5 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(8,120,63,0.20)] transition hover:bg-[#056b37] hover:shadow-[0_10px_25px_rgba(8,120,63,0.26)]"
                                >
                                    Check Eligibility

                                    <ArrowRight
                                        size={16}
                                    />
                                </button>
                            </div>

                            {/* OFFICIAL SOURCE */}

                            {scheme.officialSource && (
                                <div className="rounded-[22px] border border-[#e1e9e3] bg-white p-5 shadow-[0_5px_22px_rgba(24,70,43,0.045)] sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f6ec] text-[#08783f]">
                                            <ShieldCheck
                                                size={
                                                    17
                                                }
                                            />
                                        </div>

                                        <h2 className="text-[15px] font-bold text-[#172033]">
                                            Official Source
                                        </h2>
                                    </div>

                                    <a
                                        href={
                                            scheme.officialSource
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 flex items-center justify-between gap-3 rounded-[14px] border border-[#dce8df] bg-[#f7faf8] px-4 py-3 text-[11px] font-semibold text-[#08783f] transition hover:bg-[#eef7f0]"
                                    >
                                        <span className="truncate">
                                            View official source
                                        </span>

                                        <ExternalLink
                                            size={
                                                14
                                            }
                                            className="shrink-0"
                                        />
                                    </a>
                                </div>
                            )}

                            {/* SHARE */}

                            <div className="rounded-[22px] border border-[#e1e9e3] bg-white p-5 shadow-[0_5px_22px_rgba(24,70,43,0.045)] sm:p-6">
                                <h2 className="text-[16px] font-bold text-[#172033]">
                                    Share this Scheme
                                </h2>

                                <p className="mt-1 text-[11px] leading-5 text-[#758178]">
                                    Share the complete scheme information with someone who may need it.
                                </p>

                                <div className="mt-4 grid grid-cols-2 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={
                                            handleCopy
                                        }
                                        className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#dce8df] bg-[#f7faf8] text-[12px] font-semibold text-[#08783f] transition hover:border-[#b8d6c1] hover:bg-[#eef7f0]"
                                    >
                                        {copied ? (
                                            <>
                                                <Check
                                                    size={
                                                        15
                                                    }
                                                />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Clipboard
                                                    size={
                                                        15
                                                    }
                                                />
                                                Copy
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            handleWhatsAppShare
                                        }
                                        className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#08783f] text-[12px] font-semibold text-white transition hover:bg-[#056b37]"
                                    >
                                        <Share2
                                            size={15}
                                        />

                                        WhatsApp
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleNativeShare
                                    }
                                    className="mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-full border border-transparent text-[11px] font-semibold text-[#607168] transition hover:bg-[#f4f8f5] hover:text-[#08783f]"
                                >
                                    <Share2
                                        size={14}
                                    />

                                    More sharing options
                                </button>
                            </div>
                        </aside>
                    </div>

                    {/* =================================================
                        IMPORTANT NOTE
                    ================================================= */}

                    <div className="mt-5 rounded-[20px] border border-[#dce9df] bg-[#f3faf4] p-4 sm:p-5">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#08783f]">
                                <Info size={16} />
                            </div>

                            <div>
                                <h3 className="text-[13px] font-bold text-[#195d39]">
                                    Important Note
                                </h3>

                                <p className="mt-1 text-[11px] leading-5 text-[#5e7166] sm:text-[12px]">
                                    Scheme information shown here is based on the available government data. Eligibility, documents, application procedure and other conditions may change according to the latest government guidelines. Please verify the final requirements with the concerned department before applying.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}