"use client";

import Link from "next/link";
import Image from "next/image";
import {
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

import ActionButton from "../../components/ui/ActionButton";

export default function Footer() {
    return (
        <footer className="border-t border-[#e7ece9] bg-[#f8faf8]">
            <div
                className=" mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-5 py-10 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-14
                "
            >
                <div className="min-w-0">
                    <Link
                        href="/"
                        className=" inline-flex items-center gap-3
                        "
                    >
                        <div className="relative h-10 w-10 shrink-0 sm:h-11 sm:w-11">
                            <Image src="/Logo.png" alt="Sahay Bihar" fill sizes="44px" className="object-contain"
                            />
                        </div>

                        <div className="min-w-0">
                            <h2
                                className=" text-[20px] font-extrabold leading-none tracking-[-0.04em] text-[#173c2b] sm:text-[21px]
                                "
                            >
                                Sahay{" "}
                                <span className="text-[#08783f]">
                                    Bihar
                                </span>
                            </h2>

                            <p
                                className=" mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#718078] sm:text-[8px] sm:tracking-[0.14em]
                                ">
                                Your Guide to Bihar Government Schemes
                            </p>
                        </div>
                    </Link>

                    <p
                        className=" mt-5 max-w-[350px] text-[12px] leading-6 text-[#68736d] sm:mt-6 sm:text-[13px]
                        ">
                        Discover government schemes, understand your
                        eligibility and find the right benefits — all in
                        one simple place.
                    </p>

                    <div className="mt-5 sm:mt-6">
                        <ActionButton href="/ai-assistant" variant="secondary" icon={<Sparkles size={14} />} mobileLabel="Ask AI" ariaLabel="Ask Sahay AI" className="h-10 px-3 sm:h-11 sm:px-4">
                            Ask Sahay AI
                        </ActionButton>
                    </div>
                </div>

                <div>
                    <h3
                        className=" mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#172033] sm:mb-5 sm:text-[13px]
                        ">
                        Explore
                    </h3>

                    <nav className="space-y-3">
                        <Link
                            href="/"
                            className=" block text-[12px] text-[#68736d] transition hover:text-[#08783f] sm:text-[13px]">
                            Home
                        </Link>

                        <Link
                            href="/schemes"
                            className=" block text-[12px] text-[#68736d] transition hover:text-[#08783f] sm:text-[13px]">
                            Government Schemes
                        </Link>

                        <Link
                            href="/categories"
                            className=" block text-[12px] text-[#68736d] transition hover:text-[#08783f] sm:text-[13px]
                            "
                        >
                            Scheme Categories
                        </Link>

                        <Link
                            href="/ai-assistant"
                            className=" block text-[12px] text-[#68736d] transition hover:text-[#08783f] sm:text-[13px]
                            "
                        >
                            Ask Sahay AI
                        </Link>
                    </nav>
                </div>

                <div>
                    <h3
                        className=" mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#172033] sm:mb-5 sm:text-[13px]
                        "
                    >
                        Resources
                    </h3>

                    <nav className="space-y-3">
                        <Link
                            href="/about"
                            className=" block text-[12px] text-[#68736d] transition hover:text-[#08783f] sm:text-[13px]
                            "
                        >
                            About Sahay Bihar
                        </Link>

                        <Link
                            href="/contact"
                            className=" block text-[12px] text-[#68736d] transition hover:text-[#08783f] sm:text-[13px]
                            "
                        >
                            Contact Us
                        </Link>

                        <Link
                            href="/help"
                            className="   block  text-[12px]  text-[#68736d] transition  hover:text-[#08783f] sm:text-[13px]
                            "
                        >
                            Help & Support
                        </Link>

                        <Link
                            href="/privacy"
                            className=" block text-[12px] text-[#68736d] transition hover:text-[#08783f] sm:text-[13px]
                            "
                        >
                            Privacy Policy
                        </Link>
                    </nav>
                </div>

                <div>
                    <h3
                        className=" mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#172033] sm:mb-5 sm:text-[13px]
                        "
                    >
                        Connect With Us
                    </h3>

                    <p
                        className=" max-w-[280px] text-[12px] leading-5 text-[#68736d] sm:text-[13px]
                        "
                    >
                        Have a question about a government scheme?
                        We are here to help you find the right information.
                    </p>

                    <p
                        className=" mt-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#87918b] sm:mt-6 sm:text-[11px]
                        "
                    >
                        Mobile App Coming Soon
                    </p>

                    <div
                        className=" mt-4 flex items-center gap-2
                        "
                    >
                        <span
                            className=" flex h-8 w-8 items-center justify-center rounded-full border border-[#d7e4da] bg-white text-[#68736d]
                            "
                        >
                            <ArrowUpRight size={14} />
                        </span>

                        <span
                            className="
                                text-[11px]
                                font-medium
                                text-[#718078]
                            "
                        >
                            More ways to connect soon
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#e4e9e6] bg-white">
                <div
                    className=" mx-auto flex w-full max-w-[1200px] flex-col items-center gap-2 px-5 py-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8
                    "
                >
                    <p className="text-[10px] text-[#7a837e] sm:text-[11px]">
                        © {new Date().getFullYear()} Sahay Bihar. All rights reserved.
                    </p>

                    <p className="text-[10px] text-[#7a837e] sm:text-[11px]">
                        Built with care for Bihar
                    </p>
                </div>
            </div>
        </footer>
    );
}