import {
    CheckCircle2,
    Info,
} from "lucide-react";

import type { Scheme } from "../../types/scheme";

export default function OverviewSection({
    scheme,
}: {
    scheme: Scheme;
}) {
    return (
        <div className="space-y-6">
            {/* About the Scheme */}
            {scheme.description ? (
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
                        {scheme.description}
                    </p>
                </section>
            ) : (
                <section className="rounded-2xl border border-[#dfe9e2] bg-white p-6 shadow-[0_8px_28px_rgba(18,55,35,0.05)]">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7ef] text-[#08783f]">
                            <Info size={19} />
                        </div>

                        <h2 className="text-xl font-bold text-[#142019]">
                            About the Scheme
                        </h2>
                    </div>

                    <p className="text-sm text-[#7a867f]">
                        Detailed information about this scheme is not
                        available.
                    </p>
                </section>
            )}

            {/* Scheme Information */}
            <section className="rounded-2xl border border-[#dfe9e2] bg-white p-6 shadow-[0_8px_28px_rgba(18,55,35,0.05)]">
                <h2 className="mb-5 text-xl font-bold text-[#142019]">
                    Scheme Information
                </h2>

                <div className="overflow-hidden rounded-xl bg-[#f5faf7]">
                    <div className="flex items-center justify-between border-b border-[#dce9df] px-4 py-4">
                        <span className="text-sm text-[#526158]">
                            Scheme ID
                        </span>

                        <span className="text-sm font-bold text-[#142019]">
                            {scheme.id}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#dce9df] px-4 py-4">
                        <span className="text-sm text-[#526158]">
                            Scheme Code
                        </span>

                        <span className="text-sm font-bold text-[#142019]">
                            {scheme.scheme_code || "Not available"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#dce9df] px-4 py-4">
                        <span className="text-sm text-[#526158]">
                            Department
                        </span>

                        <span className="max-w-[60%] text-right text-sm font-bold text-[#142019]">
                            {scheme.department || "Not available"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between px-4 py-4">
                        <span className="text-sm text-[#526158]">
                            State
                        </span>

                        <span className="text-sm font-bold text-[#142019]">
                            {scheme.state || "Not available"}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}