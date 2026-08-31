import { Sparkles } from "lucide-react";

import RecommendationHeader from "./RecommendationHeader";
import SchemeCard from "./ SchemeCard";
import type {
    AssistantResponse,
    AssistantScheme,
} from "./types";
import { cleanAIText } from "./utils";

type AssistantResponseCardProps = {
    response: AssistantResponse;

    onSuggestion: (
        value: string
    ) => void;

    onViewDetails: (
        scheme: AssistantScheme
    ) => void;
};

export default function AssistantResponseCard({
    response,
    onSuggestion,
    onViewDetails,
}: AssistantResponseCardProps) {
    return (
        <div className="w-full max-w-[1080px]">
            {response.type === "schemes" && (
                <>
                    <RecommendationHeader
                        title={response.title}
                        subtitle={response.subtitle}
                    />

                    <div className="space-y-5">
                        {response.schemes?.map(
                            (scheme) => (
                                <SchemeCard
                                    key={
                                        scheme.id
                                    }
                                    scheme={
                                        scheme
                                    }
                                    onViewDetails={
                                        onViewDetails
                                    }
                                />
                            )
                        )}
                    </div>

                    {/*
                     * IMPORTANT:
                     *
                     * DO NOT render response.reply here.
                     *
                     * The backend reply is already represented
                     * by the scheme cards.
                     *
                     * Rendering it again was causing:
                     *
                     * ### 1.
                     * **Scheme Name**
                     * **Benefits**
                     *
                     * to appear below the cards.
                     */}
                </>
            )}

            {response.type === "clarification" && (
                <div className="overflow-hidden rounded-[22px] border border-[#dfe8e2] bg-white/97 shadow-[0_10px_30px_rgba(30,70,45,0.07)]">
                    <div className="border-l-[5px] border-[#08783f] bg-gradient-to-r from-[#eff9f1] to-white px-5 py-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dff1e4] text-[#08783f]">
                                <Sparkles
                                    size={18}
                                />
                            </div>

                            <div>
                                <div className="inline-flex items-center rounded-full bg-[#dff1e4] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#267144]">
                                    Sahay AI
                                </div>

                                <h2 className="mt-2 text-[19px] font-bold text-[#172033]">
                                    {response.title}
                                </h2>

                                <p className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-[#5e6c64]">
                                    {cleanAIText(
                                        response.subtitle
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {response.suggestions &&
                        response.suggestions.length >
                            0 && (
                            <div className="grid gap-2.5 p-5 sm:grid-cols-2">
                                {response.suggestions.map(
                                    (
                                        suggestion
                                    ) => (
                                        <button
                                            key={
                                                suggestion
                                            }
                                            type="button"
                                            onClick={() =>
                                                onSuggestion(
                                                    suggestion
                                                )
                                            }
                                            className="rounded-[15px] border border-[#e1ebe4] bg-[#f8faf8] px-4 py-3 text-left text-[12px] font-semibold text-[#385044] transition hover:border-[#b8d6c1] hover:bg-[#eef7f0] hover:text-[#08783f]"
                                        >
                                            {
                                                suggestion
                                            }
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                </div>
            )}

            {response.type === "error" && (
                <div className="rounded-[20px] border border-[#eadfd9] bg-white/97 p-5 text-[13px] leading-6 text-[#6a5c56] shadow-sm">
                    {cleanAIText(
                        response.subtitle
                    )}
                </div>
            )}
        </div>
    );
}