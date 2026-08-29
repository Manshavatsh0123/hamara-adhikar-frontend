"use client";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ExternalLink,
    FileText,
    Info,
    Link2,
    ShieldCheck,
    Sparkles,
    UsersRound,
} from "lucide-react";
import type { SchemeDetail } from "@/data/scheme-details";

function SectionCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-[22px] border border-[#e1e9e4] bg-white p-5 shadow-[0_8px_28px_rgba(20,60,38,0.055)] sm:p-6">
            <h2 className="text-[17px] font-bold tracking-[-0.2px] text-[#17251d] sm:text-[18px]">
                {title}
            </h2>
            {children}
        </section>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="mt-4 space-y-3">
            {items.map((item) => (
                <li
                    key={item}
                    className="flex items-start gap-3 text-[13px] leading-5 text-[#405047] sm:text-[14px]"
                >
                    <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#08783f]"
                    />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function SchemeDetailsPage({
    scheme,
}: {
    scheme: SchemeDetail;
}) {
    const tabs = [
        ["overview", "Overview"],
        ["benefits", "Benefits"],
        ["eligibility", "Eligibility"],
        ["documents", "Documents"],
        ["how-to-apply", "How to Apply"],
        ["faq", "FAQ"],
    ];

    return (
        <main className="min-h-screen bg-[#fdfcf9] text-[#172033]">
            

            <div className="mx-auto max-w-[1280px] px-5 py-6 sm:px-7 sm:py-8 lg:px-8">
                {/* Hero */}
                <section className="overflow-hidden rounded-[28px] border border-[#dfe8e2] bg-white shadow-[0_14px_45px_rgba(20,60,38,0.08)]">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
                        <div className="p-6 sm:p-8 lg:p-10">
                            {scheme.verified && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf6ee] px-3 py-1.5 text-[11px] font-bold text-[#08783f]">
                                    <ShieldCheck size={14} />
                                    Verified
                                </span>
                            )}

                            <h1 className="mt-4 max-w-[780px] text-[30px] font-bold leading-[1.12] tracking-[-0.8px] text-[#101a15] sm:text-[38px] lg:text-[42px]">
                                {scheme.name}
                            </h1>

                            <p className="mt-3 text-[15px] font-medium text-[#3e4d44] sm:text-[17px]">
                                {scheme.department}
                            </p>

                            <p className="mt-4 max-w-[780px] text-[13px] leading-6 text-[#56645c] sm:text-[15px]">
                                {scheme.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {scheme.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="rounded-full bg-[#eef7f0] px-3.5 py-1.5 text-[11px] font-semibold text-[#246a43]"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="m-4 rounded-[20px] bg-[#f1f8f3] p-5 sm:m-5 sm:p-6">
                            <div className="divide-y divide-[#d8e8dc]">
                                {scheme.highlights.map((highlight) => (
                                    <div
                                        key={highlight.label}
                                        className="flex gap-3 py-4 first:pt-1 last:pb-1"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#08783f] shadow-sm">
                                            <Info size={17} />
                                        </div>

                                        <div>
                                            <p className="text-[12px] font-bold text-[#17251d]">
                                                {highlight.label}
                                            </p>
                                            <p className="mt-1 text-[12px] text-[#506058]">
                                                {highlight.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section navigation */}
                <nav className="sticky top-0 z-20 mt-5 overflow-x-auto rounded-[18px] border border-[#e1e8e3] bg-white/95 shadow-[0_6px_22px_rgba(20,60,38,0.05)] backdrop-blur-xl">
                    <div className="flex min-w-max">
                        {tabs.map(([id, label], index) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                className={`px-5 py-4 text-[12px] font-semibold transition hover:text-[#08783f] ${
                                    index === 0
                                        ? "border-b-2 border-[#08783f] text-[#08783f]"
                                        : "text-[#4a5a51]"
                                }`}
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </nav>

                <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="space-y-5">
                        <div
                            id="overview"
                            className="grid scroll-mt-24 gap-5 md:grid-cols-2"
                        >
                            <SectionCard title="About the Scheme">
                                <div className="mt-4 space-y-4 text-[13px] leading-6 text-[#4d5c53] sm:text-[14px]">
                                    {scheme.about.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>
                            </SectionCard>

                            <SectionCard title="Highlights">
                                <div className="mt-4 rounded-[16px] bg-[#f4faf6] p-3">
                                    {scheme.highlights.map((highlight) => (
                                        <div
                                            key={highlight.label}
                                            className="flex items-center justify-between gap-4 border-b border-[#dcebe0] px-2 py-3 last:border-b-0"
                                        >
                                            <span className="text-[12px] font-semibold text-[#506058]">
                                                {highlight.label}
                                            </span>
                                            <span className="text-right text-[12px] font-bold text-[#17251d]">
                                                {highlight.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        <div id="benefits" className="scroll-mt-24">
                            <SectionCard title="Key Benefits">
                                <CheckList items={scheme.benefits} />
                            </SectionCard>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <SectionCard title="Who can apply?">
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {scheme.whoCanApply.map((person) => (
                                        <span
                                            key={person}
                                            className="inline-flex items-center gap-2 rounded-full border border-[#d7e6dc] bg-[#f8fbf9] px-3.5 py-2 text-[12px] font-semibold text-[#355044]"
                                        >
                                            <UsersRound
                                                size={14}
                                                className="text-[#08783f]"
                                            />
                                            {person}
                                        </span>
                                    ))}
                                </div>
                            </SectionCard>

                            <SectionCard title="Applicable For">
                                <ul className="mt-4 space-y-3">
                                    {scheme.applicableFor.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2.5 text-[13px] text-[#405047]"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </SectionCard>
                        </div>

                        <div id="eligibility" className="scroll-mt-24">
                            <SectionCard title="Eligibility Criteria">
                                <CheckList items={scheme.eligibility} />
                            </SectionCard>
                        </div>

                        <div id="documents" className="scroll-mt-24">
                            <SectionCard title="Required Documents">
                                <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                                    {scheme.documents.map((document) => (
                                        <div
                                            key={document}
                                            className="flex items-center gap-2.5 text-[13px] text-[#405047]"
                                        >
                                            <FileText
                                                size={16}
                                                className="shrink-0 text-[#08783f]"
                                            />
                                            {document}
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        <div id="how-to-apply" className="scroll-mt-24">
                            <SectionCard title="How to Apply">
                                <div className="mt-5 space-y-4">
                                    {scheme.howToApply.map((step) => (
                                        <div
                                            key={step.step}
                                            className="flex gap-4 rounded-[16px] border border-[#e4ebe6] bg-[#fafcfb] p-4"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f4eb] text-[12px] font-bold text-[#08783f]">
                                                {step.step}
                                            </div>

                                            <div>
                                                <h3 className="text-[13px] font-bold text-[#17251d]">
                                                    {step.title}
                                                </h3>
                                                <p className="mt-1 text-[12px] leading-5 text-[#637069]">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        <div id="faq" className="scroll-mt-24">
                            <SectionCard title="Frequently Asked Questions">
                                <div className="mt-4 divide-y divide-[#e8eeea]">
                                    {scheme.faqs.length ? (
                                        scheme.faqs.map((faq) => (
                                            <details
                                                key={faq.question}
                                                className="py-4 first:pt-0 last:pb-0"
                                            >
                                                <summary className="cursor-pointer list-none text-[13px] font-semibold text-[#27382f]"
                                                >
                                                    {faq.question}
                                                </summary>
                                                <p className="mt-2 text-[12px] leading-5 text-[#66736c]">
                                                    {faq.answer}
                                                </p>
                                            </details>
                                        ))
                                    ) : (
                                        <p className="py-2 text-[13px] text-[#66736c]">
                                            FAQ information will be added from
                                            the official scheme source.
                                        </p>
                                    )}
                                </div>
                            </SectionCard>
                        </div>
                    </div>

                    <aside className="space-y-5">
                        <section className="rounded-[22px] border border-[#d6e8dc] bg-[#f1f8f3] p-5 shadow-[0_8px_25px_rgba(20,60,38,0.06)]">
                            <h2 className="text-[17px] font-bold text-[#0c5f34]">
                                Ready to check your eligibility?
                            </h2>

                            <p className="mt-2 text-[12px] leading-5 text-[#587066]">
                                Check the official eligibility requirements
                                before applying.
                            </p>

                            <button
                                type="button"
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#08783f] px-4 py-3 text-[12px] font-bold text-white shadow-[0_7px_18px_rgba(8,120,63,0.18)] transition hover:bg-[#056b37]"
                            >
                                Check Eligibility
                                <ArrowRight size={15} />
                            </button>
                        </section>

                        <section className="rounded-[22px] border border-[#e1e9e4] bg-white p-5 shadow-[0_8px_25px_rgba(20,60,38,0.05)]">
                            <h2 className="text-[15px] font-bold text-[#17251d]">
                                Share this Scheme
                            </h2>

                            <div className="mt-4 flex gap-2">
                                <button
                                    type="button"
                                    aria-label="Copy scheme link"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f7f2] text-[#08783f] transition hover:bg-[#e4f2e8]"
                                >
                                    <Link2 size={16} />
                                </button>

                                <button
                                    type="button"
                                    aria-label="Share scheme"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f7f2] text-[#08783f] transition hover:bg-[#e4f2e8]"
                                >
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </section>
                    </aside>
                </div>

                {scheme.importantNote && (
                    <section className="mt-5 rounded-[20px] border border-[#dcebe0] bg-[#f0f8f2] p-5 sm:p-6">
                        <div className="flex gap-3">
                            <Info
                                className="mt-0.5 shrink-0 text-[#08783f]"
                                size={19}
                            />
                            <div>
                                <h2 className="text-[14px] font-bold text-[#17633d]">
                                    Important Note
                                </h2>
                                <p className="mt-1.5 text-[12px] leading-5 text-[#4d6a5b] sm:text-[13px]">
                                    {scheme.importantNote}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
}
