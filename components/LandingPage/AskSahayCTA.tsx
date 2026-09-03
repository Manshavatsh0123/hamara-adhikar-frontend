"use client";

import Link from "next/link";
import {
    ArrowRight,
    Bot,
    MessageCircle,
    Sparkle,
    Sparkles,
} from "lucide-react";

export default function AskSahayCTA() {
    return (
        <section className="w-full bg-white py-8 sm:py-10 lg:py-12">
            <div className=" mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
                <div className=" relative overflow-hidden rounded-2xl border border-[#dce9df] bg-[#eef7f0] px-5 py-5 shadow-[0_5px_20px_rgba(20,70,40,0.05)] sm:px-7 sm:py-6 lg:px-8">
                    <div className=" pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[#bde5c9]/30 blur-3xl" />

                    <div className=" relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className=" flex min-w-0 items-center gap-3 sm:gap-4">
                            <div
                                className=" flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dff1e4] text-[#08783f] sm:h-12 sm:w-12">
                                <MessageCircle
                                    size={22}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>
                                <div
                                    className=" flex items-center gap-2">
                                    <h2
                                        className=" text-base font-bold tracking-[-0.02em] text-[#173c2b] sm:text-lg">
                                        Kuch Bhi Poochho, Apne Mann Ki
                                    </h2>

                                    <Sparkles
                                        size={15}
                                        className="text-[#17804a]"
                                    />
                                </div>

                                <p className=" mt-1 text-[10px] leading-4 text-[#66746c] sm:text-[11px]" >
                                    Sahay AI har sawaal ka sahi jawab deta hai.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/ai-assistant"
                            className=" group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#08783f] bg-[#08783f] px-4 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(8,120,63,0.18)] transition-all duration-200 hover:border-[#075f32] hover:bg-[#075f32] hover:shadow-[0_8px_20px_rgba(8,120,63,0.24)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f]/30
                            "
                        >
                            <span
                                className=" flex h-7 w-7 items-center justify-center rounded-lg bg-white/12
                                "
                            >
                                <Sparkle
                                    size={16}
                                    strokeWidth={1.8}
                                />
                            </span>

                            <span>
                                Ask Sahay AI
                            </span>

                            <ArrowRight
                                size={16}
                                strokeWidth={1.8}
                                className=" transition-transform duration-200 group-hover:translate-x-0.5
                                "
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}