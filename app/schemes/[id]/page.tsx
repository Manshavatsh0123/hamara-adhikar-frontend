import { notFound } from "next/navigation";

import SchemeHeader from "@/components/schemes/SchemeHeader";
import SchemeTabs from "@/components/schemes/SchemeTabs";
import OverviewSection from "@/components/schemes/OverviewSection";

import type { SchemeData } from "@/types/scheme";

async function getScheme(id: string): Promise<SchemeData | null> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/schemes/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    return data.scheme ?? data;
}

export default async function SchemeOverviewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const scheme = await getScheme(id);

    if (!scheme) {
        notFound();
    }

    const sections = {
        overview: Boolean(
            scheme.overview?.about ||
            scheme.overview?.highlights?.length ||
            scheme.benefits?.length
        ),

        benefits: Boolean(scheme.benefits?.length),

        eligibility: Boolean(
            scheme.eligibility?.criteria?.length ||
            scheme.eligibility?.description
        ),

        documents: Boolean(scheme.documents?.length),

        howToApply: Boolean(scheme.howToApply?.length),

        faq: Boolean(scheme.faqs?.length),
    };

    return (
        <main className="min-h-screen bg-[#f7faf8] px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-[1140px]">
                <SchemeHeader scheme={scheme} />

                <SchemeTabs
                    schemeId={scheme.id}
                    sections={sections}
                />

                <OverviewSection scheme={scheme} />
            </div>
        </main>
    );
}
