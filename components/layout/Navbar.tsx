"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

import ActionButton from "@/components/ui/ActionButton";

export default function Navbar() {
    const pathname = usePathname();

    const isAIAssistantPage = pathname === "/ai-assistant";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#edf1ee] bg-white/95 backdrop-blur-md">
            <div
                className="
                    mx-auto flex h-16 w-full max-w-[1280px]
                    items-center justify-between
                    px-4
                    sm:h-[68px] sm:px-6
                    lg:h-[72px] lg:px-8
                "
            >

                <Link
                    href="/"
                    className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
                    aria-label="Sahay Bihar home"
                >
                    {/* Logo */}
                    <div
                        className="
                            relative shrink-0
                            h-9 w-9
                            sm:h-11 sm:w-11
                            lg:h-12 lg:w-12
                        "
                    >
                        <Image
                            src="/Logo.png"
                            alt="Sahay Bihar"
                            fill
                            priority
                            sizes="48px"
                            className="object-contain"
                        />
                    </div>

                    {/* Brand text */}
                    <div className="flex min-w-0 flex-col justify-center">
                        <span
                            className="
                                truncate
                                text-[18px]
                                font-extrabold
                                leading-none
                                tracking-[-0.04em]
                                text-[#173c2b]
                                sm:text-[21px]
                                lg:text-[23px]
                            "
                        >
                            Sahay{" "}
                            <span className="text-[#08783f]">
                                Bihar
                            </span>
                        </span>

                        <span
                            className="
                                mt-1
                                hidden
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-[#718078]
                                sm:block
                                sm:text-[9px]
                                lg:text-[10px]
                                lg:tracking-[0.14em]
                            "
                        >
                            Your Guide to Bihar Government Schemes
                        </span>
                    </div>
                </Link>


                {isAIAssistantPage ? (
                    <ActionButton
                        href="/"
                        variant="secondary"
                        icon={
                            <ArrowLeft
                                size={15}
                                strokeWidth={2.2}
                            />
                        }
                        mobileLabel="Back"
                        ariaLabel="Back to home"
                    >
                        Back
                    </ActionButton>
                ) : (
                    <ActionButton
                        href="/ai-assistant"
                        variant="primary"
                        icon={
                            <Sparkles
                                size={15}
                                strokeWidth={2}
                            />
                        }
                        mobileLabel="Ask AI"
                        ariaLabel="Ask Sahay AI"
                    >
                        Ask Sahay AI
                    </ActionButton>
                )}
            </div>
        </header>
    );
}