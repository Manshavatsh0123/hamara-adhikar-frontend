"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen,
    CheckCircle2,
    ClipboardList,
    FileText,
    HelpCircle,
    Info,
} from "lucide-react";

type Tab = {
    label: string;
    slug: string;
    icon: React.ElementType;
    exists: boolean;
};

type Props = {
    schemeId: string;
    sections: {
        overview: boolean;
        benefits: boolean;
        eligibility: boolean;
        documents: boolean;
        howToApply: boolean;
        faq: boolean;
    };
};

export default function SchemeTabs({
    schemeId,
    sections,
}: Props) {
    const pathname = usePathname();

    const tabs: Tab[] = [
        {
            label: "Overview",
            slug: "",
            icon: Info,
            exists: sections.overview,
        },
        {
            label: "Benefits",
            slug: "benefits",
            icon: CheckCircle2,
            exists: sections.benefits,
        },
        {
            label: "Eligibility",
            slug: "eligibility",
            icon: BookOpen,
            exists: sections.eligibility,
        },
        {
            label: "Documents",
            slug: "documents",
            icon: FileText,
            exists: sections.documents,
        },
        {
            label: "How to Apply",
            slug: "how-to-apply",
            icon: ClipboardList,
            exists: sections.howToApply,
        },
        {
            label: "FAQ",
            slug: "faq",
            icon: HelpCircle,
            exists: sections.faq,
        },
    ];

    return (
        <div className="sticky top-[72px] z-30 mb-7 overflow-x-auto rounded-2xl border border-[#dfe9e2] bg-white/95 p-1.5 shadow-[0_8px_30px_rgba(18,55,35,0.06)] backdrop-blur-xl">
            <div className="flex min-w-max gap-1">
                {tabs
                    .filter((tab) => tab.exists)
                    .map((tab) => {
                        const href = tab.slug
                            ? `/schemes/${schemeId}/${tab.slug}`
                            : `/schemes/${schemeId}`;

                        const active =
                            tab.slug
                                ? pathname === href
                                : pathname === `/schemes/${schemeId}`;

                        const Icon = tab.icon;

                        return (
                            <Link
                                key={tab.slug || "overview"}
                                href={href}
                                className={`
                                    inline-flex items-center gap-2
                                    rounded-xl px-4 py-2.5
                                    text-sm font-semibold
                                    transition-all
                                    ${
                                        active
                                            ? "bg-[#08783f] text-white shadow-sm"
                                            : "text-[#52635a] hover:bg-[#eef7f1] hover:text-[#08783f]"
                                    }
                                `}
                            >
                                <Icon size={15} />
                                {tab.label}
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}