import { Sparkles } from "lucide-react";

type RecommendationHeaderProps = {
    title: string;
    subtitle: string;
};

export default function RecommendationHeader({
    title,
    subtitle,
}: RecommendationHeaderProps) {
    return (
        <div className="mb-5 overflow-hidden rounded-[24px] border border-[#cfe5d5] bg-white/95 shadow-[0_10px_35px_rgba(25,65,42,0.07)] backdrop-blur-xl">
            <div className="flex items-start gap-4 border-l-[5px] border-[#08783f] bg-gradient-to-r from-[#eef9f1] via-white to-white px-5 py-5 sm:px-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dcf2e3] text-[#08783f] ring-1 ring-[#c8e6d0]">
                    <Sparkles
                        size={20}
                        strokeWidth={1.9}
                    />
                </div>

                <div className="min-w-0">
                    <div className="mb-1.5 inline-flex items-center rounded-full bg-[#dcf2e3] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#267144]">
                        AI Recommendation
                    </div>

                    <h2 className="text-[21px] font-bold leading-6 tracking-[-0.3px] text-[#172033] sm:text-[23px]">
                        {title}
                    </h2>

                    <p className="mt-1.5 text-[13px] leading-5 text-[#617068]">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}