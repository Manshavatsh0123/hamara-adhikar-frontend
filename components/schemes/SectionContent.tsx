import {
    CheckCircle2,
    FileText,
    HelpCircle,
    ClipboardList,
    ShieldCheck,
    Info,
} from "lucide-react";

import type { Scheme } from "@/types/scheme";

type Props = {
    scheme: Scheme;

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
    /* =====================================================
       BENEFITS
    ===================================================== */

    if (section === "benefits") {
        return (
            <Section
                title="Benefits"
                icon={<CheckCircle2 size={20} />}
            >
                <div className="rounded-2xl border border-[#e1ebe4] bg-[#f8fbf9] p-5">
                    <div className="flex items-start gap-3">
                        <CheckCircle2
                            size={20}
                            className="mt-0.5 shrink-0 text-[#08783f]"
                        />

                        <div>
                            <h3 className="font-semibold text-[#142019]">
                                Scheme Benefits
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-[#59665e]">
                                {scheme.description ||
                                    "Benefit details are not available in the scheme information."}
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    /* =====================================================
       ELIGIBILITY
    ===================================================== */

    if (section === "eligibility") {
        return (
            <Section
                title="Eligibility"
                icon={<ShieldCheck size={20} />}
            >
                <div className="rounded-2xl border border-[#e1ebe4] bg-[#f8fbf9] p-5">
                    <div className="flex items-start gap-3">
                        <ShieldCheck
                            size={20}
                            className="mt-0.5 shrink-0 text-[#08783f]"
                        />

                        <div>
                            <h3 className="font-semibold text-[#142019]">
                                Eligibility Information
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-[#59665e]">
                                Detailed eligibility criteria for{" "}
                                <span className="font-semibold text-[#405047]">
                                    {scheme.scheme_name}
                                </span>{" "}
                                can be checked using the eligibility
                                checker.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    /* =====================================================
       DOCUMENTS
    ===================================================== */

    if (section === "documents") {
        return (
            <Section
                title="Documents Required"
                icon={<FileText size={20} />}
            >
                <div className="rounded-2xl border border-[#e1ebe4] bg-[#f8fbf9] p-5">
                    <div className="flex items-start gap-3">
                        <FileText
                            size={20}
                            className="mt-0.5 shrink-0 text-[#08783f]"
                        />

                        <div>
                            <h3 className="font-semibold text-[#142019]">
                                Document Information
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-[#59665e]">
                                Required document details are not
                                included in the basic scheme
                                information.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    /* =====================================================
       HOW TO APPLY
    ===================================================== */

    if (section === "how-to-apply") {
        return (
            <Section
                title="How to Apply"
                icon={<ClipboardList size={20} />}
            >
                <div className="space-y-4">
                    <div className="flex gap-4 rounded-2xl border border-[#e1ebe4] bg-[#f8fbf9] p-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-sm font-bold text-white">
                            1
                        </div>

                        <div>
                            <h3 className="font-bold text-[#142019]">
                                Check Eligibility
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-[#59665e]">
                                Check whether you meet the eligibility
                                requirements for{" "}
                                {scheme.scheme_name}.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-2xl border border-[#e1ebe4] bg-[#f8fbf9] p-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-sm font-bold text-white">
                            2
                        </div>

                        <div>
                            <h3 className="font-bold text-[#142019]">
                                Follow the Official Application Process
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-[#59665e]">
                                Follow the application instructions
                                provided by the concerned government
                                department.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        );
    }

    /* =====================================================
       FAQ
    ===================================================== */

    return (
        <Section
            title="Frequently Asked Questions"
            icon={<HelpCircle size={20} />}
        >
            <div className="rounded-2xl border border-[#e1ebe4] bg-[#f8fbf9] p-5">
                <div className="flex items-start gap-3">
                    <HelpCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-[#08783f]"
                    />

                    <div>
                        <h3 className="font-semibold text-[#142019]">
                            About this scheme
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-[#59665e]">
                            {scheme.description ||
                                "More information about this scheme is not available."}
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}

/* =========================================================
   SECTION WRAPPER
========================================================= */

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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef] text-[#08783f]">
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