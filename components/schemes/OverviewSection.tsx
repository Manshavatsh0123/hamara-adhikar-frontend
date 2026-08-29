import {
    CheckCircle2,
    Info,
} from "lucide-react";

import type { SchemeData } from "@/types/scheme";

export default function OverviewSection({
    scheme,
}: {
    scheme: SchemeData;
}) {
    const about = scheme.overview?.about;
    const highlights = scheme.overview?.highlights ?? [];
    const benefits = scheme.benefits ?? [];

    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
                {about ? (
                    <section className="rounded-2xl border border-[#dfe9e2] bg-white p-6 shadow-[0_8px_28px_rgba(18,55,35,0.05)]">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7ef] text-[#08783f]">
                                <Info size={19} />
                            </div>

                            <h2 className="text-xl font-bold text-[#142019]">
                                About the Scheme
                            </h2>
                        </div>

                        <p className="text-[15px] leading-7 text-[#536159]">
                            {about}
                        </p>
                    </section>
                ) : null}

                {highlights.length > 0 ? (
                    <section className="rounded-2xl border border-[#dfe9e2] bg-white p-6 shadow-[0_8px_28px_rgba(18,55,35,0.05)]">
                        <h2 className="mb-5 text-xl font-bold text-[#142019]">
                            Highlights
                        </h2>

                        <div className="rounded-xl bg-[#f2f9f4] p-2">
                            {highlights.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between border-b border-[#dce9df] px-4 py-3 last:border-0"
                                >
                                    <span className="text-sm text-[#526158]">
                                        {item.label}
                                    </span>

                                    <span className="text-sm font-bold text-[#142019]">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}
            </div>

            {benefits.length > 0 ? (
                <section className="rounded-2xl border border-[#dfe9e2] bg-white p-6 shadow-[0_8px_28px_rgba(18,55,35,0.05)]">
                    <h2 className="mb-5 text-xl font-bold text-[#142019]">
                        Key Benefits
                    </h2>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit}
                                className="flex items-start gap-3 rounded-xl bg-[#f5faf7] p-4"
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
                </section>
            ) : null}
        </div>
    );
}