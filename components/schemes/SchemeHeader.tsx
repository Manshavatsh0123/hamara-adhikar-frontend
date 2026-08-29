import {
    CheckCircle2,
    ExternalLink,
    Share2,
} from "lucide-react";

import type { SchemeData } from "@/types/scheme";

type Props = {
    scheme: SchemeData;
};

export default function SchemeHeader({ scheme }: Props) {
    return (
        <section className="mb-6 rounded-[28px] border border-[#dce8df] bg-white/95 p-6 shadow-[0_14px_45px_rgba(18,55,35,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eaf7ef] px-3 py-1.5 text-xs font-bold text-[#08783f]">
                        <CheckCircle2 size={14} />
                        Verified Government Scheme
                    </div>

                    <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.6px] text-[#142019] sm:text-4xl">
                        {scheme.name}
                    </h1>

                    <p className="mt-2 text-sm font-medium text-[#65736b]">
                        {scheme.department}
                    </p>

                    <p className="mt-5 max-w-4xl text-[15px] leading-7 text-[#435148]">
                        {scheme.description}
                    </p>

                    {scheme.categories?.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {scheme.categories.map((category) => (
                                <span
                                    key={category}
                                    className="rounded-full border border-[#d8e8dd] bg-[#f3f9f5] px-3 py-1.5 text-xs font-semibold text-[#287149]"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="flex shrink-0 gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                window.location.href
                            );
                        }}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#d9e5dc] bg-white text-[#08783f] transition hover:bg-[#eef7f1]"
                        aria-label="Copy scheme link"
                    >
                        <Share2 size={18} />
                    </button>

                    {scheme.officialUrl ? (
                        <a
                            href={scheme.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#08783f] px-4 text-sm font-semibold text-white transition hover:bg-[#056631]"
                        >
                            Official Website
                            <ExternalLink size={16} />
                        </a>
                    ) : null}
                </div>
            </div>
        </section>
    );
}