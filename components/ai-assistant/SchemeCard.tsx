import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Scheme } from "./types";

export function SchemeCard({
    scheme,
    onAction,
}: {
    scheme: Scheme;
    onAction: (scheme: Scheme, action: "details" | "eligibility") => void;
}) {
    return (
        <article className="group overflow-hidden rounded-[24px] border border-[#dfe7e2] bg-white/95 shadow-[0_10px_34px_rgba(18,55,35,0.10)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:border-[#c9ddd0] hover:shadow-[0_16px_42px_rgba(18,55,35,0.13)]">
            <div className="p-5 sm:p-6 lg:p-7">
                <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                        <div className="mb-2 inline-flex items-center rounded-full bg-[#eaf6ee] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#08783f]">
                            {scheme.categories[0] ?? "Government Scheme"}
                        </div>

                        <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.35px] text-[#142019] sm:text-[23px]">
                            {scheme.name}
                        </h3>

                        <p className="mt-1.5 text-[11px] font-medium leading-5 text-[#6b776f] sm:text-[12px]">
                            {scheme.department}
                        </p>
                    </div>
                </div>

                <p className="mt-4 max-w-[820px] text-[13px] leading-6 text-[#44534a] sm:text-[14px]">
                    {scheme.description}
                </p>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[17px] border border-[#d5e9dc] bg-[#f1f9f3] p-4 sm:p-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#08783f] sm:text-[12px]">
                            Key Benefits
                        </p>

                        <ul className="mt-3 space-y-2.5">
                            {scheme.benefits.slice(0, 3).map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-start gap-2.5 text-[12px] font-medium leading-5 text-[#304238] sm:text-[13px]"
                                >
                                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#08783f]" />
                                    <span className="font-semibold text-[#17251d]">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[17px] border border-[#e0e8e3] bg-[#fafcfb] p-4 sm:p-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#34483c] sm:text-[12px]">
                            Who Can Apply
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {scheme.whoCanApply.map((person) => (
                                <span
                                    key={person}
                                    className="rounded-full border border-[#d5e2d9] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#405248] sm:text-[13px]"
                                >
                                    {person}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex justify-end border-t border-[#edf1ee] pt-4">
                    <Link
                        href={`/schemes/${scheme.id}`}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-bold text-[#08783f] transition-all hover:bg-[#eef7f0] sm:text-[13px]"
                    >
                        View Details
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
