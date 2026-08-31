import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
    return (
        <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cfe4d4] bg-white text-[#08783f] shadow-[0_5px_18px_rgba(8,120,63,0.10)]">
                <Sparkles
                    size={18}
                    className="animate-pulse"
                />
            </div>

            <div className="rounded-[20px] border border-[#dfe9e2] bg-white/97 px-5 py-4 shadow-[0_10px_30px_rgba(30,70,45,0.08)]">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#08783f]" />

                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#08783f] [animation-delay:150ms]" />

                        <span className="h-2 w-2 animate-bounce rounded-full bg-[#08783f] [animation-delay:300ms]" />
                    </div>

                    <span className="text-[12px] font-medium text-[#68766f]">
                        Finding the best schemes for you...
                    </span>
                </div>
            </div>
        </div>
    );
}