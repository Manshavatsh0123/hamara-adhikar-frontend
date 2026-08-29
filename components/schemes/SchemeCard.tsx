"use client";

import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Clipboard,
    Copy,
    ExternalLink,
    FileText,
    HelpCircle,
    Info,
    Link2,
    MapPin,
    Share2,
    ShieldCheck,
    UserRound,
    WalletCards,
    X,
} from "lucide-react";
import { useMemo, useState } from "react";


// ============================================================
// TYPES
// ============================================================

export type SchemeSection = {
    title?: string;
    description?: string;
    items?: string[];
};

export type SchemeCardData = {
    id: string;
    name: string;
    department?: string;
    description?: string;

    categories?: string[];

    benefits?: string[];

    whoCanApply?: string[];

    eligibility?: string[];

    documents?: string[];

    howToApply?: string[];

    faq?: {
        question: string;
        answer: string;
    }[];

    overview?: string;

    highlights?: {
        label: string;
        value: string;
    }[];

    applicationUrl?: string;

    // Optional backend fields
    loanAmount?: string;
    interestRate?: string;
    beneficiary?: string;

    [key: string]: unknown;
};


// ============================================================
// HELPERS
// ============================================================

function hasItems(value?: unknown): value is string[] {
    return Array.isArray(value) && value.length > 0;
}

function SectionEmptyState({
    title,
    description = "This information is currently not available.",
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-[#d8e6dd] bg-[#f8fbf9] p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf6ee] text-[#08783f]">
                <Info size={18} />
            </div>

            <p className="mt-3 text-sm font-semibold text-[#24362c]">
                {title}
            </p>

            <p className="mt-1 text-xs leading-5 text-[#738078]">
                {description}
            </p>
        </div>
    );
}


// ============================================================
// COMPONENT
// ============================================================

export default function SchemeCard({
    scheme,
}: {
    scheme: SchemeCardData;
}) {
    const [activeTab, setActiveTab] = useState("overview");
    const [copied, setCopied] = useState(false);

    // --------------------------------------------------------
    // Dynamic sections
    // --------------------------------------------------------

    const tabs = useMemo(
        () => [
            {
                id: "overview",
                label: "Overview",
                icon: Info,
            },
            {
                id: "benefits",
                label: "Benefits",
                icon: CheckCircle2,
            },
            {
                id: "eligibility",
                label: "Eligibility",
                icon: UserRound,
            },
            {
                id: "documents",
                label: "Documents",
                icon: FileText,
            },
            {
                id: "how-to-apply",
                label: "How to Apply",
                icon: ArrowRight,
            },
            {
                id: "faq",
                label: "FAQ",
                icon: HelpCircle,
            },
        ],
        []
    );


    // --------------------------------------------------------
    // Scroll to section
    // --------------------------------------------------------

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);

        const element = document.getElementById(
            `scheme-${tabId}`
        );

        if (!element) return;

        const headerOffset = 95;

        const elementPosition =
            element.getBoundingClientRect().top +
            window.scrollY;

        window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: "smooth",
        });
    };


    // --------------------------------------------------------
    // Copy current URL
    // --------------------------------------------------------

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                window.location.href
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            // Clipboard unavailable
        }
    };


    // --------------------------------------------------------
    // Native share
    // --------------------------------------------------------

    const handleShare = async () => {
        const shareData = {
            title: scheme.name,
            text:
                scheme.description ||
                `Check this government scheme on Sahay Bihar.`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }

            await handleCopy();
        } catch {
            // User cancelled share
        }
    };


    // --------------------------------------------------------
    // Backend data
    // --------------------------------------------------------

    const benefits = scheme.benefits ?? [];
    const eligibility = scheme.eligibility ?? [];
    const documents = scheme.documents ?? [];
    const howToApply = scheme.howToApply ?? [];
    const faq = scheme.faq ?? [];

    const categories =
        scheme.categories?.filter(Boolean) ?? [];


    return (
        <article className="w-full">


            {/* ==================================================
                HERO / SCHEME SUMMARY
            ================================================== */}

            <section
                className="
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-[#dce8e0]
                    bg-white/95
                    shadow-[0_16px_50px_rgba(18,55,35,0.08)]
                    backdrop-blur-xl
                "
            >

                <div className="grid lg:grid-cols-[1fr_300px]">


                    {/* LEFT */}
                    <div className="p-6 sm:p-8 lg:p-10">


                        {/* Verified */}
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-[#eaf7ee]
                                px-3
                                py-1.5
                                text-[11px]
                                font-bold
                                text-[#08783f]
                            "
                        >
                            <ShieldCheck size={14} />

                            Verified Scheme
                        </div>


                        {/* Title */}
                        <h1
                            className="
                                mt-4
                                max-w-[850px]
                                text-3xl
                                font-bold
                                leading-tight
                                tracking-[-0.8px]
                                text-[#142019]
                                sm:text-4xl
                                lg:text-[42px]
                            "
                        >
                            {scheme.name}
                        </h1>


                        {/* Department */}
                        {scheme.department && (
                            <p
                                className="
                                    mt-2
                                    text-sm
                                    font-medium
                                    text-[#56645c]
                                    sm:text-[15px]
                                "
                            >
                                {scheme.department}
                            </p>
                        )}


                        {/* Description */}
                        {scheme.description && (
                            <p
                                className="
                                    mt-5
                                    max-w-[850px]
                                    text-sm
                                    leading-7
                                    text-[#56645c]
                                    sm:text-[15px]
                                "
                            >
                                {scheme.description}
                            </p>
                        )}


                        {/* Categories */}
                        {categories.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <span
                                        key={category}
                                        className="
                                            rounded-full
                                            border
                                            border-[#d6e6dc]
                                            bg-[#f2f8f4]
                                            px-3
                                            py-1.5
                                            text-xs
                                            font-semibold
                                            text-[#276344]
                                        "
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}

                    </div>


                    {/* RIGHT HIGHLIGHTS */}
                    <div
                        className="
                            m-4
                            rounded-[22px]
                            bg-[#eff8f2]
                            p-5
                            sm:m-5
                            lg:m-6
                        "
                    >

                        <p
                            className="
                                mb-4
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                text-[#08783f]
                            "
                        >
                            Key Information
                        </p>


                        <div className="space-y-1">


                            {scheme.loanAmount && (
                                <Highlight
                                    label="Loan Amount"
                                    value={scheme.loanAmount}
                                />
                            )}


                            {scheme.interestRate && (
                                <Highlight
                                    label="Interest Rate"
                                    value={scheme.interestRate}
                                />
                            )}


                            {scheme.beneficiary && (
                                <Highlight
                                    label="Beneficiaries"
                                    value={scheme.beneficiary}
                                />
                            )}


                            {scheme.highlights?.map(
                                (item) => (
                                    <Highlight
                                        key={item.label}
                                        label={item.label}
                                        value={item.value}
                                    />
                                )
                            )}


                            {!scheme.loanAmount &&
                                !scheme.interestRate &&
                                !scheme.beneficiary &&
                                !scheme.highlights?.length && (
                                    <div className="rounded-xl bg-white/70 p-4">
                                        <p className="text-xs leading-5 text-[#68766e]">
                                            Additional scheme information
                                            will appear here when provided
                                            by the backend.
                                        </p>
                                    </div>
                                )}

                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================================
                TAB NAVIGATION
            ================================================== */}

            <nav
                className="
                    sticky
                    top-[72px]
                    z-30
                    mt-5
                    overflow-x-auto
                    rounded-[20px]
                    border
                    border-[#dce8e0]
                    bg-white/95
                    p-1.5
                    shadow-[0_8px_30px_rgba(18,55,35,0.07)]
                    backdrop-blur-xl
                "
            >

                <div className="flex min-w-max items-center gap-1">

                    {tabs.map((tab) => {
                        const Icon = tab.icon;

                        const active =
                            activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() =>
                                    handleTabClick(tab.id)
                                }
                                className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-semibold
                                    transition-all
                                    sm:px-5
                                    sm:text-sm
                                    ${
                                        active
                                            ? "bg-[#08783f] text-white shadow-[0_5px_16px_rgba(8,120,63,0.20)]"
                                            : "text-[#526159] hover:bg-[#eef7f1] hover:text-[#08783f]"
                                    }
                                `}
                            >
                                <Icon size={15} />

                                {tab.label}
                            </button>
                        );
                    })}

                </div>

            </nav>


            {/* ==================================================
                CONTENT
            ================================================== */}

            <div
                className="
                    mt-5
                    grid
                    gap-5
                    lg:grid-cols-[minmax(0,1fr)_280px]
                "
            >


                {/* MAIN CONTENT */}
                <main className="space-y-5">


                    {/* OVERVIEW */}
                    <section
                        id="scheme-overview"
                        className="scroll-mt-28 rounded-[22px] border border-[#dce8e0] bg-white p-6 shadow-[0_8px_30px_rgba(18,55,35,0.05)] sm:p-7"
                    >

                        <SectionHeading
                            icon={Info}
                            title="About the Scheme"
                        />

                        {scheme.overview ? (
                            <p className="mt-5 text-sm leading-7 text-[#56645c]">
                                {scheme.overview}
                            </p>
                        ) : scheme.description ? (
                            <p className="mt-5 text-sm leading-7 text-[#56645c]">
                                {scheme.description}
                            </p>
                        ) : (
                            <div className="mt-5">
                                <SectionEmptyState title="Overview information is not available" />
                            </div>
                        )}

                    </section>


                    {/* BENEFITS */}
                    <section
                        id="scheme-benefits"
                        className="scroll-mt-28 rounded-[22px] border border-[#dce8e0] bg-white p-6 shadow-[0_8px_30px_rgba(18,55,35,0.05)] sm:p-7"
                    >

                        <SectionHeading
                            icon={CheckCircle2}
                            title="Key Benefits"
                        />

                        {hasItems(benefits) ? (
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">

                                {benefits.map(
                                    (benefit, index) => (
                                        <div
                                            key={`${benefit}-${index}`}
                                            className="
                                                flex
                                                items-start
                                                gap-3
                                                rounded-xl
                                                border
                                                border-[#e0ebe4]
                                                bg-[#f7fbf8]
                                                p-4
                                            "
                                        >
                                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e4f4e9] text-[#08783f]">
                                                <CheckCircle2 size={15} />
                                            </div>

                                            <p className="text-sm leading-6 text-[#34453b]">
                                                {benefit}
                                            </p>
                                        </div>
                                    )
                                )}

                            </div>
                        ) : (
                            <div className="mt-5">
                                <SectionEmptyState title="Benefit information is not available" />
                            </div>
                        )}

                    </section>


                    {/* ELIGIBILITY */}
                    <section
                        id="scheme-eligibility"
                        className="scroll-mt-28 rounded-[22px] border border-[#dce8e0] bg-white p-6 shadow-[0_8px_30px_rgba(18,55,35,0.05)] sm:p-7"
                    >

                        <SectionHeading
                            icon={UserRound}
                            title="Eligibility"
                        />

                        {hasItems(eligibility) ? (
                            <BulletList items={eligibility} />
                        ) : hasItems(scheme.whoCanApply) ? (
                            <div className="mt-5">

                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#08783f]">
                                    Who Can Apply
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {scheme.whoCanApply.map(
                                        (person) => (
                                            <span
                                                key={person}
                                                className="
                                                    rounded-full
                                                    border
                                                    border-[#d6e6dc]
                                                    bg-[#f2f8f4]
                                                    px-3
                                                    py-2
                                                    text-xs
                                                    font-semibold
                                                    text-[#365447]
                                                "
                                            >
                                                {person}
                                            </span>
                                        )
                                    )}
                                </div>

                            </div>
                        ) : (
                            <div className="mt-5">
                                <SectionEmptyState title="Eligibility information is not available" />
                            </div>
                        )}

                    </section>


                    {/* DOCUMENTS */}
                    <section
                        id="scheme-documents"
                        className="scroll-mt-28 rounded-[22px] border border-[#dce8e0] bg-white p-6 shadow-[0_8px_30px_rgba(18,55,35,0.05)] sm:p-7"
                    >

                        <SectionHeading
                            icon={FileText}
                            title="Required Documents"
                        />

                        {hasItems(documents) ? (
                            <BulletList items={documents} />
                        ) : (
                            <div className="mt-5">
                                <SectionEmptyState title="Document requirements are not available" />
                            </div>
                        )}

                    </section>


                    {/* HOW TO APPLY */}
                    <section
                        id="scheme-how-to-apply"
                        className="scroll-mt-28 rounded-[22px] border border-[#dce8e0] bg-white p-6 shadow-[0_8px_30px_rgba(18,55,35,0.05)] sm:p-7"
                    >

                        <SectionHeading
                            icon={ArrowRight}
                            title="How to Apply"
                        />

                        {hasItems(howToApply) ? (
                            <div className="mt-6 space-y-4">

                                {howToApply.map(
                                    (step, index) => (
                                        <div
                                            key={`${step}-${index}`}
                                            className="flex gap-4"
                                        >

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-sm font-bold text-white">
                                                {index + 1}
                                            </div>

                                            <div className="rounded-xl border border-[#e0ebe4] bg-[#f7fbf8] px-4 py-3">
                                                <p className="text-sm leading-6 text-[#34453b]">
                                                    {step}
                                                </p>
                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        ) : (
                            <div className="mt-5">
                                <SectionEmptyState title="Application process is not available" />
                            </div>
                        )}

                    </section>


                    {/* FAQ */}
                    <section
                        id="scheme-faq"
                        className="scroll-mt-28 rounded-[22px] border border-[#dce8e0] bg-white p-6 shadow-[0_8px_30px_rgba(18,55,35,0.05)] sm:p-7"
                    >

                        <SectionHeading
                            icon={HelpCircle}
                            title="Frequently Asked Questions"
                        />

                        {faq.length > 0 ? (
                            <div className="mt-5 space-y-3">

                                {faq.map(
                                    (item, index) => (
                                        <details
                                            key={`${item.question}-${index}`}
                                            className="
                                                group
                                                rounded-xl
                                                border
                                                border-[#e0ebe4]
                                                bg-[#f8fbf9]
                                                p-4
                                            "
                                        >

                                            <summary
                                                className="
                                                    cursor-pointer
                                                    list-none
                                                    text-sm
                                                    font-semibold
                                                    text-[#24362c]
                                                "
                                            >
                                                {item.question}
                                            </summary>

                                            <p className="mt-3 text-sm leading-6 text-[#65736b]">
                                                {item.answer}
                                            </p>

                                        </details>
                                    )
                                )}

                            </div>
                        ) : (
                            <div className="mt-5">
                                <SectionEmptyState title="No FAQs are available for this scheme" />
                            </div>
                        )}

                    </section>


                </main>


                {/* ==================================================
                    SIDEBAR
                ================================================== */}

                <aside className="space-y-5 lg:sticky lg:top-[145px] lg:self-start">


                    {/* Eligibility CTA */}
                    <div
                        className="
                            rounded-[22px]
                            border
                            border-[#cfe3d6]
                            bg-[#eff8f2]
                            p-5
                            shadow-[0_8px_28px_rgba(18,55,35,0.06)]
                        "
                    >

                        <p className="text-base font-bold text-[#08783f]">
                            Ready to check your eligibility?
                        </p>

                        <p className="mt-2 text-xs leading-5 text-[#607067]">
                            Check the official eligibility requirements
                            before applying.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                handleTabClick("eligibility")
                            }
                            className="
                                mt-5
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-[#08783f]
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                shadow-[0_8px_18px_rgba(8,120,63,0.18)]
                                transition
                                hover:bg-[#066b38]
                            "
                        >
                            Check Eligibility
                            <ArrowRight size={17} />
                        </button>

                    </div>


                    {/* Share */}
                    <div
                        className="
                            rounded-[22px]
                            border
                            border-[#dce8e0]
                            bg-white
                            p-5
                            shadow-[0_8px_28px_rgba(18,55,35,0.05)]
                        "
                    >

                        <div className="flex items-center justify-between">

                            <h3 className="text-sm font-bold text-[#18261f]">
                                Share this Scheme
                            </h3>

                            <Share2
                                size={17}
                                className="text-[#08783f]"
                            />

                        </div>


                        <div className="mt-4 grid grid-cols-2 gap-2">

                            <button
                                type="button"
                                onClick={handleCopy}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[#d7e5dc]
                                    bg-[#f5faf7]
                                    px-3
                                    py-3
                                    text-xs
                                    font-semibold
                                    text-[#315344]
                                    transition
                                    hover:border-[#bcd5c5]
                                    hover:bg-[#edf7f0]
                                "
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle2 size={15} />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy size={15} />
                                        Copy Link
                                    </>
                                )}
                            </button>


                            <button
                                type="button"
                                onClick={handleShare}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-[#08783f]
                                    px-3
                                    py-3
                                    text-xs
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[#066b38]
                                "
                            >
                                <Share2 size={15} />
                                Share
                            </button>

                        </div>

                    </div>


                    {/* Application */}
                    {scheme.applicationUrl && (
                        <div
                            className="
                                rounded-[22px]
                                border
                                border-[#dce8e0]
                                bg-white
                                p-5
                                shadow-[0_8px_28px_rgba(18,55,35,0.05)]
                            "
                        >

                            <p className="text-sm font-bold text-[#18261f]">
                                Apply for this Scheme
                            </p>

                            <p className="mt-2 text-xs leading-5 text-[#68766e]">
                                Continue to the official application
                                portal.
                            </p>

                            <a
                                href={scheme.applicationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[#08783f]
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-[#08783f]
                                    transition
                                    hover:bg-[#eff8f2]
                                "
                            >
                                Official Application
                                <ExternalLink size={15} />
                            </a>

                        </div>
                    )}

                </aside>

            </div>


        </article>
    );
}


// ============================================================
// HIGHLIGHT
// ============================================================

function Highlight({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 border-b border-[#d7e7dc] py-3 last:border-b-0">

            <div
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-[#08783f]
                    shadow-sm
                "
            >
                <Info size={15} />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#6a776f]">
                    {label}
                </p>

                <p className="mt-0.5 text-xs font-bold leading-5 text-[#25362c]">
                    {value}
                </p>
            </div>

        </div>
    );
}


// ============================================================
// SECTION HEADING
// ============================================================

function SectionHeading({
    icon: Icon,
    title,
}: {
    icon: typeof Info;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3">

            <div
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#eaf6ee]
                    text-[#08783f]
                "
            >
                <Icon size={17} />
            </div>

            <h2 className="text-lg font-bold tracking-[-0.25px] text-[#18261f] sm:text-xl">
                {title}
            </h2>

        </div>
    );
}


// ============================================================
// BULLET LIST
// ============================================================

function BulletList({
    items,
}: {
    items: string[];
}) {
    return (
        <div className="mt-5 space-y-3">

            {items.map((item, index) => (
                <div
                    key={`${item}-${index}`}
                    className="
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        border-[#e0ebe4]
                        bg-[#f8fbf9]
                        p-4
                    "
                >

                    <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#08783f]"
                    />

                    <p className="text-sm leading-6 text-[#3d4d44]">
                        {item}
                    </p>

                </div>
            ))}

        </div>
    );
}