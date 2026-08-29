import { ChevronDown } from "lucide-react";
import type { AssistantResponse, Scheme } from "./types";
import { SCHEMES } from "./data";
import { SchemeCard } from "./SchemeCard";

export function AssistantResponseCard({
    response,
    onSuggestion,
    onAction,
}: {
    response: AssistantResponse;
    onSuggestion: (value: string) => void;
    onAction: (scheme: Scheme, action: "details" | "eligibility") => void;
}) {
    return (
        <div className="w-full max-w-[1040px]">
            {response.type === "schemes" && response.schemes ? (
                <>
                    <div className="mb-6">
                        <div className="rounded-[22px] border border-[#dce9df] bg-white/94 px-5 py-5 shadow-[0_8px_28px_rgba(20,60,38,0.08)] backdrop-blur-xl sm:px-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#08783f] shadow-[0_0_0_6px_rgba(8,120,63,0.08)]" />

                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#08783f]">
                                        Sahay AI Recommendations
                                    </p>

                                    <h2 className="mt-1 text-[22px] font-bold tracking-[-0.45px] text-[#142019] sm:text-[26px]">
                                        {response.title}
                                    </h2>

                                    <p className="mt-1.5 max-w-[780px] text-[12px] leading-5 text-[#68756e] sm:text-[13px]">
                                        {response.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {response.schemes.map((scheme) => (
                            <SchemeCard
                                key={scheme.id}
                                scheme={scheme}
                                onAction={onAction}
                            />
                        ))}

                        {response.schemes.length < SCHEMES.length && (
                            <div className="flex justify-center pt-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        onSuggestion("Show me more relevant schemes")
                                    }
                                    className="inline-flex items-center gap-2 rounded-full border border-[#cfe4d5] bg-white px-5 py-2.5 text-[12px] font-semibold text-[#08783f] shadow-[0_5px_16px_rgba(30,70,45,0.06)] transition hover:bg-[#f1f8f3]"
                                >
                                    View more schemes
                                    <ChevronDown size={15} />
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-3">
                        <h2 className="text-[18px] font-bold text-[#172033] sm:text-[20px]">
                            {response.title}
                        </h2>

                        <p className="mt-1 text-[12px] leading-5 text-[#68756e] sm:text-[13px]">
                            {response.subtitle}
                        </p>
                    </div>

                    {response.suggestions && (
                        <div className="rounded-[20px] border border-[#e2ebe5] bg-white/90 p-4 shadow-[0_8px_28px_rgba(30,70,45,0.06)] backdrop-blur-xl">
                            <div className="grid gap-2 sm:grid-cols-2">
                                {response.suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        type="button"
                                        onClick={() => onSuggestion(suggestion)}
                                        className="rounded-[14px] border border-[#e2ebe5] bg-[#f8faf8] px-3 py-2.5 text-left text-[12px] font-medium text-[#385044] transition hover:border-[#b8d6c1] hover:bg-[#eef7f0] hover:text-[#08783f]"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
