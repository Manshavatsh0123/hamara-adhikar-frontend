import {
    CheckCircle2,
    Copy,
    ExternalLink,
    MapPin,
    Share2,
} from "lucide-react";

import type { Scheme } from "@/types/scheme";

type Props = {
    scheme: Scheme;
};

export default function SchemeHeader({ scheme }: Props) {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(
                window.location.href
            );

            console.log("Scheme link copied");
        } catch (error) {
            console.error(
                "Failed to copy scheme link:",
                error
            );
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: scheme.scheme_name,
            text: `Check this government scheme: ${scheme.scheme_name}`,
            url: window.location.href,
        };

        try {
            if (
                navigator.share &&
                typeof navigator.share === "function"
            ) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(
                    `${scheme.scheme_name}\n\n${scheme.description ?? ""}\n\n${window.location.href}`
                );

                console.log(
                    "Scheme details copied for sharing"
                );
            }
        } catch (error) {
            // User cancelled native share.
            console.log(
                "Share cancelled or unavailable:",
                error
            );
        }
    };

    return (
        <section className="mb-6 rounded-[28px] border border-[#dce8df] bg-white/95 p-6 shadow-[0_14px_45px_rgba(18,55,35,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                {/* CONTENT */}

                <div className="min-w-0">
                    {/* VERIFIED BADGE */}

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eaf7ef] px-3 py-1.5 text-xs font-bold text-[#08783f]">
                        <CheckCircle2
                            size={14}
                            strokeWidth={2.2}
                        />

                        Verified Government Scheme
                    </div>

                    {/* SCHEME NAME */}

                    <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.6px] text-[#142019] sm:text-4xl">
                        {scheme.scheme_name}
                    </h1>

                    {/* DEPARTMENT */}

                    {scheme.department ? (
                        <p className="mt-2 text-sm font-medium text-[#65736b]">
                            {scheme.department}
                        </p>
                    ) : null}

                    {/* STATE */}

                    {scheme.state ? (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d8e8dd] bg-[#f3f9f5] px-3 py-1.5 text-xs font-semibold text-[#287149]">
                            <MapPin size={13} />

                            {scheme.state}
                        </div>
                    ) : null}

                    {/* DESCRIPTION */}

                    {scheme.description ? (
                        <p className="mt-5 max-w-4xl text-[15px] leading-7 text-[#435148]">
                            {scheme.description}
                        </p>
                    ) : (
                        <p className="mt-5 text-sm text-[#7a867f]">
                            Detailed description is not available.
                        </p>
                    )}

                    {/* SCHEME CODE */}

                    {scheme.scheme_code ? (
                        <div className="mt-5">
                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7a867f]">
                                Scheme Code
                            </span>

                            <p className="mt-1 text-sm font-bold text-[#142019]">
                                {scheme.scheme_code}
                            </p>
                        </div>
                    ) : null}
                </div>

                {/* ACTION BUTTONS */}

                <div className="flex shrink-0 flex-wrap gap-2">
                    {/* COPY */}

                    <button
                        type="button"
                        onClick={handleCopyLink}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#d9e5dc] bg-white px-4 text-sm font-semibold text-[#08783f] transition hover:bg-[#eef7f1]"
                        aria-label="Copy scheme link"
                    >
                        <Copy size={17} />

                        <span className="hidden sm:inline">
                            Copy
                        </span>
                    </button>

                    {/* SHARE */}

                    <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#d9e5dc] bg-white px-4 text-sm font-semibold text-[#08783f] transition hover:bg-[#eef7f1]"
                        aria-label="Share scheme"
                    >
                        <Share2 size={17} />

                        <span className="hidden sm:inline">
                            Share
                        </span>
                    </button>

                    {/* OFFICIAL WEBSITE */}

                    {/* 
                        Your current Scheme type does NOT contain
                        officialUrl, so this button cannot safely
                        be rendered from Scheme yet.
                    */}
                </div>
            </div>
        </section>
    );
}