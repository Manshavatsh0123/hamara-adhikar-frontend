"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isAIAssistantPage = pathname === "/ai-assistant";

    return (
        <header className="sticky top-0 z-50 border-b border-[#edf1ee] bg-white/95 backdrop-blur-md">

            <div className=" mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-5 sm:px-6">

                <Link href="/" className="group flex items-center gap-3">

                    <div className="relative h-[45px] w-[45px] shrink-0 sm:h-[50px] sm:w-[50px]">
                        <Image
                            src="/Logo.png"
                            alt="Sahay Bihar"
                            fill
                            priority
                            sizes="70px"
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col justify-center">

                        <span className="text-[21px] font-extrabold leading-none tracking-[-0.04em] text-[#173c2b] sm:text-[24px]">
                            Sahay{" "}
                            <span className="text-[#08783f]">
                                Bihar
                            </span>
                        </span>

                        <span
                            className="mt-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#718078] sm:text-[10px] sm:tracking-[0.15em]"
                        >
                            Your Guide to Bihar Government Schemes
                        </span>

                    </div>

                </Link>

                {isAIAssistantPage ? (
                    <Link
                        href="/"
                        className="group flex items-center gap-2 rounded-full border border-[#cfe4d5] bg-[#f5faf6] px-4 py-2.5 text-sm font-semibold text-[#08783f] shadow-[0_2px_8px_rgba(8,120,63,0.05)] transition-all duration-200 hover:border-[#08783f] hover:bg-[#08783f] hover:text-white hover:shadow-[0_6px_18px_rgba(8,120,63,0.15)] sm:px-5"
                        aria-label="Back to home"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dff1e4] transition-colors group-hover:bg-white/15">
                            <ArrowLeft
                                size={15}
                                strokeWidth={2}
                            />
                        </span>

                        <span className="hidden sm:inline">
                            Back
                        </span>

                        <span className="sm:hidden">
                            Back
                        </span>
                    </Link>
                ) : (
                    <Link
                        href="/ai-assistant"
                        className="group flex items-center gap-2 rounded-full border border-[#cfe4d5] bg-[#f5faf6] px-4 py-2.5 text-sm font-semibold text-[#08783f] shadow-[0_2px_8px_rgba(8,120,63,0.05)] transition-all duration-200 hover:border-[#08783f] hover:bg-[#08783f] hover:text-white hover:shadow-[0_6px_18px_rgba(8,120,63,0.15)] sm:px-5"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dff1e4] transition-colors group-hover:bg-white/15">
                            <Sparkles
                                size={15}
                                strokeWidth={2}
                            />
                        </span>

                        <span className="hidden sm:inline">
                            Ask Sahay AI
                        </span>

                        <span className="sm:hidden">
                            Ask AI
                        </span>
                    </Link>
                )}

            </div>

        </header>
    );
}