import {
    CheckCircle2,
    FileText,
    HelpCircle,
    ClipboardList,
    ShieldCheck,
} from "lucide-react";

import type { SchemeData } from "@/types/scheme";

type Props = {
    scheme: SchemeData;
    section:
        | "benefits"
        | "eligibility"
        | "documents"
        | "how-to-apply"
        | "faq";
};

export default function SectionContent({
    scheme,
    section,
}: Props) {
    if (section === "benefits") {
        return (
            <Section title="Benefits" icon={<CheckCircle2 size={20} />}>
                <div className="grid gap-3 sm:grid-cols-2">
                    {(scheme.benefits ?? []).map((benefit) => (
                        <div
                            key={benefit}
                            className="flex gap-3 rounded-xl bg-[#f3f9f5] p-5"
                        >
                            <CheckCircle2
                                size={19}
                                className="mt-0.5 shrink-0 text-[#08783f]"
                            />

                            <span className="text-sm leading-6 text-[#405047]">
                                {benefit}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>
        );
    }

    if (section === "eligibility") {
        return (
            <Section
                title={scheme.eligibility?.title ?? "Eligibility"}
                icon={<ShieldCheck size={20} />}
            >
                {scheme.eligibility?.description ? (
                    <p className="mb-6 text-[15px] leading-7 text-[#526158]">
                        {scheme.eligibility.description}
                    </p>
                ) : null}

                <div className="space-y-3">
                    {(scheme.eligibility?.criteria ?? []).map(
                        (criterion) => (
                            <div
                                key={criterion}
                                className="flex items-start gap-3 rounded-xl border border-[#e1ebe4] bg-white p-4"
                            >
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#08783f]"
                                />

                                <span className="text-sm text-[#405047]">
                                    {criterion}
                                </span>
                            </div>
                        )
                    )}
                </div>
            </Section>
        );
    }

    if (section === "documents") {
        return (
            <Section
                title="Documents Required"
                icon={<FileText size={20} />}
            >
                <div className="space-y-3">
                    {(scheme.documents ?? []).map((document) => (
                        <div
                            key={document}
                            className="flex items-center gap-3 rounded-xl border border-[#e1ebe4] bg-white p-4"
                        >
                            <FileText
                                size={18}
                                className="text-[#08783f]"
                            />

                            <span className="text-sm text-[#405047]">
                                {document}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>
        );
    }

    if (section === "how-to-apply") {
        return (
            <Section
                title="How to Apply"
                icon={<ClipboardList size={20} />}
            >
                <div className="space-y-5">
                    {(scheme.howToApply ?? []).map((step) => (
                        <div
                            key={step.step}
                            className="flex gap-4"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-sm font-bold text-white">
                                {step.step}
                            </div>

                            <div>
                                <h3 className="font-bold text-[#142019]">
                                    {step.title}
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-[#59665e]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        );
    }

    return (
        <Section title="Frequently Asked Questions" icon={<HelpCircle size={20} />}>
            <div className="space-y-3">
                {(scheme.faqs ?? []).map((faq) => (
                    <details
                        key={faq.question}
                        className="group rounded-xl border border-[#e1ebe4] bg-white p-5"
                    >
                        <summary className="cursor-pointer list-none font-semibold text-[#142019]">
                            {faq.question}
                        </summary>

                        <p className="mt-3 text-sm leading-6 text-[#59665e]">
                            {faq.answer}
                        </p>
                    </details>
                ))}
            </div>
        </Section>
    );
}

function Section({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-[24px] border border-[#dfe9e2] bg-white p-6 shadow-[0_10px_35px_rgba(18,55,35,0.06)] sm:p-8">
            <div className="mb-7 flex items-center gap-3 border-b border-[#edf2ee] pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7ef] text-[#08783f]">
                    {icon}
                </div>

                <h2 className="text-2xl font-bold tracking-[-0.3px] text-[#142019]">
                    {title}
                </h2>
            </div>

            {children}
        </section>
    );
}