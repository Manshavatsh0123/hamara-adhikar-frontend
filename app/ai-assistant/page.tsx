"use client";

import Image from "next/image";

import {
    CheckCheck,
    CheckCircle2,
    Mic,
    Send,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
    UserRound,
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { sendAIMessage } from "../../lib/api/ai";
import AssistantResponseCard from "../../components/ai-assistant/AssistantResponseCard";
import SchemeDetails from "../../components/ai-assistant/SchemeDetails";
import EligibilityDetails, { EligibilityResultData } from "../../components/ai-assistant/eligibilityDetails";
import EligibilityResult from "../../components/ai-assistant/EligibilityResult";
import HowToApply from "../../components/ai-assistant/HowToApply";
import TypingIndicator from "../../components/ai-assistant/TypingIndicator";
import type {
    AssistantScheme,
    Message,
} from "../../components/ai-assistant/types";
import {
    createAssistantResponse,
    getTime,
} from "../../components/ai-assistant/utils";

export default function AIAssistantPage() {
    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [isListening, setIsListening] =
        useState(false);

    const [isTyping, setIsTyping] =
        useState(false);

    const [selectedScheme, setSelectedScheme] =
        useState<AssistantScheme | null>(null);

    const [showEligibility, setShowEligibility] =
        useState(false);

    const [eligibilityResult, setEligibilityResult] =
        useState<EligibilityResultData | null>(null);

    const [showHowToApply, setShowHowToApply] =
        useState(false);

    const recognitionRef =
        useRef<any>(null);

    const chatScrollRef =
        useRef<HTMLDivElement>(null);

    const hasStartedChat =
        messages.length > 0;

    const lastAssistantMessageId =
        useMemo(
            () =>
                [...messages]
                    .reverse()
                    .find(
                        (message) =>
                            message.role ===
                            "assistant"
                    )?.id,
            [messages]
        );


    useEffect(() => {
        if (
            typeof window ===
            "undefined"
        ) {
            return;
        }

        const SpeechRecognition =
            (window as any)
                .SpeechRecognition ||
            (window as any)
                .webkitSpeechRecognition;

        if (!SpeechRecognition) {
            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.continuous = false;

        recognition.interimResults = true;

        recognition.lang = "en-IN";

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (
            event: any
        ) => {
            let transcript = "";

            for (
                let i =
                    event.resultIndex;
                i <
                event.results.length;
                i++
            ) {
                transcript +=
                    event.results[i][0]
                        .transcript;
            }

            setQuestion(transcript);
        };

        recognition.onerror = (
            event: any
        ) => {
            console.error(
                "Speech recognition error:",
                event
            );

            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current =
            recognition;

        return () => {
            try {
                recognition.stop();
            } catch {
                // Already stopped.
            }

            recognitionRef.current =
                null;
        };
    }, []);


    useEffect(() => {
        const container =
            chatScrollRef.current;

        if (
            !container ||
            !hasStartedChat
        ) {
            return;
        }

        requestAnimationFrame(() => {
            container.scrollTo({
                top:
                    container.scrollHeight,
                behavior: "smooth",
            });
        });
    }, [
        messages,
        isTyping,
        hasStartedChat,
    ]);

    const handleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert(
                "Voice input is not supported in this browser. Please use Chrome or Edge."
            );

            return;
        }

        if (isListening) {
            try {
                recognitionRef.current.stop();
            } catch {
                // Ignore.
            }

            setIsListening(false);

            return;
        }

        try {
            setQuestion("");

            recognitionRef.current.start();
        } catch (error) {
            console.error(
                "Unable to start voice recognition:",
                error
            );
        }
    };

    const submitQuestion = async (
        value: string
    ) => {
        const trimmedQuestion =
            value.trim();

        if (
            !trimmedQuestion ||
            isTyping
        ) {
            return;
        }

        /* USER MESSAGE */

        const userMessage: Message = {
            id: Date.now(),

            role: "user",

            text: trimmedQuestion,

            time: getTime(),
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setQuestion("");

        setSelectedScheme(null);

        setIsTyping(true);

        try {
            console.log(
                "Sending AI question:",
                trimmedQuestion
            );

            const result =
                await sendAIMessage({
                    message:
                        trimmedQuestion,
                });

            console.log(
                "AI API response:",
                result
            );

            /* VALIDATE */

            if (!result) {
                throw new Error(
                    "No response received from AI server."
                );
            }

            if (!result.success) {
                throw new Error(
                    "AI server returned success=false."
                );
            }

            if (!result.data) {
                throw new Error(
                    "AI server returned no data."
                );
            }

            /* READ BACKEND */

            const reply =
                typeof result.data.reply ===
                    "string"
                    ? result.data.reply
                    : "";

            const sources =
                Array.isArray(
                    result.data.sources
                )
                    ? result.data.sources
                    : [];

            const assistantResponse =
                createAssistantResponse(
                    reply,
                    sources
                );

            const assistantMessage: Message =
            {
                id:
                    Date.now() + 1,

                role: "assistant",

                time: getTime(),

                response:
                    assistantResponse,
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);
        } catch (error) {
            console.error(
                "Sahay AI chat error:",
                error
            );

            const errorText =
                error instanceof Error
                    ? error.message
                    : "Unable to connect to Sahay AI.";

            const errorMessage: Message =
            {
                id:
                    Date.now() + 1,

                role: "assistant",

                time: getTime(),

                response: {
                    type: "error",

                    title:
                        "Unable to get a response",

                    subtitle:
                        errorText,
                },
            };

            setMessages((prev) => [
                ...prev,
                errorMessage,
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleAsk = () => {
        void submitQuestion(question);
    };


    const handleSuggestion = (
        value: string
    ) => {
        void submitQuestion(value);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();

            handleAsk();
        }
    };


    const handleViewDetails = (
        scheme: AssistantScheme
    ) => {
        setSelectedScheme(scheme);
        setShowEligibility(false);
    };



    const handleCheckEligibility = (scheme: AssistantScheme) => {
        if (!scheme) {
            console.error(
                "[AI Assistant] Cannot check eligibility: scheme is missing."
            );
            return;
        }

        const schemeId = Number(scheme.id);

        if (!Number.isInteger(schemeId) || schemeId <= 0) {
            console.error(
                "[AI Assistant] Invalid scheme ID:",
                scheme
            );
            return;
        }

        setSelectedScheme(scheme);
        setEligibilityResult(null);
        setShowHowToApply(false);
        setShowEligibility(true);
    };

    const handleEligibilityResult = (
        result: EligibilityResultData
    ) => {
        setEligibilityResult(result);
        setShowEligibility(false);
        setShowHowToApply(false);
    };

    const handleHowToApply = () => {
        setShowHowToApply(true);
        setShowEligibility(false);
    };

    const handleBackFromHowToApply = () => {
        setShowHowToApply(false);
        setEligibilityResult(eligibilityResult);
    };

    const handleBackFromEligibility = () => {
        setShowEligibility(false);
    };

    const handleBackToSchemeFromHowToApply = () => {
        setShowHowToApply(false);
        setEligibilityResult(null);
        setShowEligibility(false);
    };


    return (
        <main className="relative flex h-[calc(100dvh-72px)] min-h-0 flex-col overflow-hidden bg-[#fdfcf8]">
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="pointer-events-none absolute inset-0">
                <Image
                    src="/images/AI-Background.png"
                    alt="Bihar landscape"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center scale-[1.02]"
                />

                <div className="absolute inset-0 bg-white/50" />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.93)_32%,rgba(255,255,255,0.65)_55%,rgba(255,255,255,0.15)_80%,transparent_100%)]" />

                <div className="absolute inset-x-0 bottom-0 h-[320px] bg-gradient-to-t from-[#fdfcf8]/95 via-[#fdfcf8]/65 to-transparent" />
            </div>

            {/* =================================================
                CHAT
            ================================================= */}

            <div
                ref={chatScrollRef}
                className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
                {!hasStartedChat ? (
                    /* LANDING */
                    <section className="flex min-h-full items-start justify-center px-4 pt-[8vh] pb-10 sm:px-6 sm:pt-[9vh] lg:px-8">
                        <div className="flex w-full max-w-[900px] flex-col items-center text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e8d8] bg-white/85 px-4 py-2 text-sm font-medium text-[#267144] shadow-[0_4px_18px_rgba(8,120,63,0.08)] backdrop-blur-xl">
                                <Sparkles
                                    size={16}
                                    className="text-[#08783f]"
                                />

                                <span>
                                    AI Scheme
                                    Assistant
                                </span>
                            </div>

                            <h1 className="mt-5 max-w-[850px] text-[44px] font-bold leading-[1.04] tracking-[-2px] text-[#172033] sm:text-[56px] md:text-[64px] lg:text-[68px]">
                                Ask Anything,
                                <br />

                                <span className="text-[#08783f]">
                                    Find the Right
                                    Scheme
                                </span>
                            </h1>

                            <div className="mt-5 flex items-center gap-3">
                                <span className="h-px w-12 bg-[#75a987]" />

                                <Sparkles
                                    size={16}
                                    className="text-[#398454]"
                                />

                                <span className="h-px w-12 bg-[#75a987]" />
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="mx-auto w-full max-w-[1120px] px-4 pt-6 pb-10 sm:px-6 lg:px-8">
                        {selectedScheme ? (
                            showHowToApply ? (
                                <HowToApply
                                    scheme={selectedScheme}
                                    onBack={handleBackFromHowToApply}
                                    onBackToScheme={handleBackToSchemeFromHowToApply}
                                />
                            ) : eligibilityResult ? (
                                <EligibilityResult
                                    result={eligibilityResult}
                                    onBack={() => {
                                        setEligibilityResult(null);
                                        setShowHowToApply(false);
                                        setShowEligibility(true);
                                    }}
                                    onHowToApply={handleHowToApply}
                                    onCheckOtherSchemes={() => {
                                        setEligibilityResult(null);
                                        setShowHowToApply(false);
                                        setSelectedScheme(null);
                                        setShowEligibility(false);
                                    }}
                                    onViewSchemeDetails={() => {
                                        setEligibilityResult(null);
                                        setShowHowToApply(false);
                                        setShowEligibility(false);
                                    }}
                                    onGoHome={() => {
                                        window.location.href = "/";
                                    }}
                                />
                            ) : showEligibility ? (
                                <EligibilityDetails
                                    scheme={selectedScheme}
                                    onBack={handleBackFromEligibility}
                                    onResult={handleEligibilityResult}
                                />
                            ) : (
                                <SchemeDetails
                                    scheme={selectedScheme}
                                    onBack={() => {
                                        setSelectedScheme(null);
                                        setShowEligibility(false);
                                        setEligibilityResult(null);
                                        setShowHowToApply(false);
                                    }}
                                    onCheckEligibility={() =>
                                        handleCheckEligibility(
                                            selectedScheme
                                        )
                                    }
                                />
                            )
                        ) : (
                            <div className="space-y-7">
                                {messages.map(
                                    (message) => (
                                        <div
                                            key={
                                                message.id
                                            }
                                        >
                                            {message.role ===
                                                "user" ? (
                                                /* USER */
                                                <div className="flex justify-end">
                                                    <div className="flex max-w-[85%] items-end gap-2.5 sm:max-w-[72%]">
                                                        <div className="rounded-[21px] rounded-br-md bg-[#08783f] px-4 py-3.5 text-white shadow-[0_8px_26px_rgba(8,120,63,0.15)]">
                                                            <p className="whitespace-pre-wrap text-[13px] leading-5 sm:text-[14px]">
                                                                {
                                                                    message.text
                                                                }
                                                            </p>

                                                            <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-white/70">
                                                                <span>
                                                                    {
                                                                        message.time
                                                                    }
                                                                </span>

                                                                {/* DOUBLE TICK */}

                                                                <CheckCheck
                                                                    size={
                                                                        15
                                                                    }
                                                                    strokeWidth={
                                                                        2.1
                                                                    }
                                                                    className="text-white/90"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4e4d8] bg-white/95 text-[#08783f] shadow-sm">
                                                            <UserRound
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* ASSISTANT */
                                                <div className="flex gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cfe4d4] bg-white/95 text-[#08783f] shadow-[0_4px_16px_rgba(8,120,63,0.10)] backdrop-blur-xl">
                                                        <Sparkles
                                                            size={
                                                                18
                                                            }
                                                            strokeWidth={
                                                                1.8
                                                            }
                                                        />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        {message.response && (
                                                            <AssistantResponseCard
                                                                response={
                                                                    message.response
                                                                }
                                                                onSuggestion={
                                                                    handleSuggestion
                                                                }
                                                                onViewDetails={
                                                                    handleViewDetails
                                                                }
                                                            />
                                                        )}

                                                        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#8a9690]">
                                                            <span>
                                                                {
                                                                    message.time
                                                                }
                                                            </span>

                                                            {message.id ===
                                                                lastAssistantMessageId && (
                                                                    <>
                                                                        <button
                                                                            type="button"
                                                                            aria-label="Helpful response"
                                                                            className="rounded-full p-1.5 transition hover:bg-white hover:text-[#08783f]"
                                                                        >
                                                                            <ThumbsUp
                                                                                size={
                                                                                    13
                                                                                }
                                                                            />
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            aria-label="Not helpful"
                                                                            className="rounded-full p-1.5 transition hover:bg-white hover:text-[#08783f]"
                                                                        >
                                                                            <ThumbsDown
                                                                                size={
                                                                                    13
                                                                                }
                                                                            />
                                                                        </button>
                                                                    </>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}

                                {/* =================================================
                                    LOADING
                                ================================================= */}

                                {isTyping && (
                                    <TypingIndicator />
                                )}
                            </div>
                        )}
                    </section>
                )}
            </div>

            {/* =================================================
                FIXED INPUT
            ================================================= */}

            <div className="relative z-30 shrink-0 border-t border-white/40 bg-gradient-to-t from-[#fdfcf8] via-[#fdfcf8]/96 to-transparent px-4 pb-3 pt-3 sm:px-6 sm:pb-4 sm:pt-4 lg:px-8">
                <div className="mx-auto w-full max-w-[900px]">
                    <div className="rounded-[30px] border border-[#dfe8e2] bg-white/97 p-2 shadow-[0_15px_48px_rgba(26,69,43,0.16)] backdrop-blur-2xl transition-all focus-within:border-[#b8d6c1] focus-within:shadow-[0_17px_52px_rgba(26,69,43,0.20)] sm:p-2.5">
                        <div className="flex min-h-[60px] items-center gap-2 rounded-[23px] bg-[#f8faf8] px-3 sm:min-h-[64px] sm:px-4">
                            <Sparkles
                                size={20}
                                strokeWidth={1.8}
                                className="shrink-0 text-[#74817a]"
                            />

                            <input
                                type="text"
                                value={question}
                                onChange={(
                                    event
                                ) =>
                                    setQuestion(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                onKeyDown={
                                    handleKeyDown
                                }
                                disabled={
                                    isTyping
                                }
                                placeholder={
                                    isListening
                                        ? "Listening... speak naturally"
                                        : hasStartedChat
                                            ? "Ask a follow-up question..."
                                            : "Ask about a government scheme..."
                                }
                                className="min-w-0 flex-1 bg-transparent py-3 text-[14px] text-[#172033] outline-none placeholder:text-[#8a9690] sm:text-[15px]"
                            />

                            {/* VOICE */}

                            <div className="relative shrink-0">
                                {isListening && (
                                    <span className="absolute inset-0 animate-ping rounded-full bg-[#08783f]/15" />
                                )}

                                <button
                                    type="button"
                                    onClick={
                                        handleVoiceInput
                                    }
                                    disabled={
                                        isTyping
                                    }
                                    aria-label={
                                        isListening
                                            ? "Stop listening"
                                            : "Speak your question"
                                    }
                                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all sm:h-11 sm:w-11 ${isListening
                                        ? "border-[#08783f] bg-[#e7f5eb] text-[#08783f]"
                                        : "border-[#dce5df] bg-white text-[#08783f] hover:border-[#08783f] hover:bg-[#f1f8f2]"
                                        }`}
                                >
                                    <Mic
                                        size={18}
                                        strokeWidth={
                                            1.8
                                        }
                                    />
                                </button>
                            </div>

                            {/* SEND */}

                            <button
                                type="button"
                                onClick={
                                    handleAsk
                                }
                                aria-label="Send question to Sahay AI"
                                disabled={
                                    !question.trim() ||
                                    isTyping
                                }
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-white shadow-[0_5px_16px_rgba(8,120,63,0.22)] transition-all hover:bg-[#056b37] disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
                            >
                                <Send
                                    size={18}
                                    strokeWidth={2}
                                />
                            </button>
                        </div>
                    </div>

                    {!hasStartedChat ? (
                        <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-[#63806d] sm:text-[12px]">
                            <CheckCircle2
                                size={13}
                                className="text-[#08783f]"
                            />

                            <span>
                                Reliable information.
                                Simple language.
                                Better tomorrow.
                            </span>
                        </div>
                    ) : (
                        <p className="mt-1.5 text-center text-[10px] text-[#8a9690]">
                            Sahay AI helps you discover Bihar government schemes. Always verify eligibility with the official department.
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}