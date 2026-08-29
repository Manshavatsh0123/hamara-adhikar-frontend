"use client";

import Image from "next/image";
import {
    CheckCircle2,
    Mic,
    Send,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
    UserRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Message, Scheme } from "../../components/ai-assistant/types";
import { buildAssistantResponse, getTime } from "../../components/ai-assistant/utils";
import { AssistantResponseCard } from "../../components/ai-assistant/AssistantResponseCard";

export default function AIAssistantPage() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const recognitionRef = useRef<any>(null);
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const hasStartedChat = messages.length > 0;

    const lastAssistantMessageId = useMemo(
        () =>
            [...messages]
                .reverse()
                .find((message) => message.role === "assistant")?.id,
        [messages]
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-IN";

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event: any) => {
            let transcript = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                transcript += event.results[i][0].transcript;
            }

            setQuestion(transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;

        return () => {
            try {
                recognition.stop();
            } catch { }
        };
    }, []);

    useEffect(() => {
        const container = chatScrollRef.current;

        if (!container || !hasStartedChat) return;

        requestAnimationFrame(() => {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        });
    }, [messages, isTyping, hasStartedChat]);

    const handleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert(
                "Voice input is not supported in this browser. Please use Chrome or Edge."
            );
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
            return;
        }

        setQuestion("");
        recognitionRef.current.start();
    };

    const submitQuestion = (value: string) => {
        const trimmedQuestion = value.trim();

        if (!trimmedQuestion || isTyping) return;

        const userMessage: Message = {
            id: Date.now(),
            role: "user",
            text: trimmedQuestion,
            time: getTime(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setQuestion("");
        setIsTyping(true);

        window.setTimeout(() => {
            const response = buildAssistantResponse(trimmedQuestion);

            const assistantMessage: Message = {
                id: Date.now() + 1,
                role: "assistant",
                time: getTime(),
                response,
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 650);
    };

    const handleAsk = () => {
        submitQuestion(question);
    };

    const handleSuggestion = (value: string) => {
        submitQuestion(value);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAsk();
        }
    };

    const handleSchemeAction = (
        scheme: Scheme,
        action: "details" | "eligibility"
    ) => {
        if (action === "details") {
            submitQuestion(`Tell me more about ${scheme.name}`);
            return;
        }

        submitQuestion(`Check my eligibility for ${scheme.name}`);
    };

    return (
        <main className="relative flex h-[calc(100dvh-72px)] min-h-0 flex-col overflow-hidden bg-[#fdfcf8]">
            
            {/*    FIXED BACKGROUND */}
            <div className="pointer-events-none absolute inset-0">
                <Image
                    src="/images/AI-Background.png"
                    alt="Bihar landscape"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center scale-[1.02]"
                />

                <div className="absolute inset-0 bg-white/64" />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.93)_32%,rgba(255,255,255,0.65)_55%,rgba(255,255,255,0.15)_80%,transparent_100%)]" />

                <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-[#fdfcf8]/95 via-[#fdfcf8]/60 to-transparent" />
            </div>

            {/*   SCROLLABLE CHAT VIEWPORT
                The PAGE never grows. Only this area scrolls. */}
            <div
                ref={chatScrollRef}
                className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain"
            >
                {!hasStartedChat ? (
                    <section className="flex min-h-full items-start justify-center px-4 pt-[8vh] pb-10 sm:px-6 sm:pt-[9vh] lg:px-8">
                        <div className="flex w-full max-w-[900px] flex-col items-center text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e8d8] bg-white/80 px-4 py-2 text-sm font-medium text-[#267144] shadow-[0_4px_18px_rgba(8,120,63,0.08)] backdrop-blur-xl">
                                <Sparkles
                                    size={16}
                                    className="text-[#08783f]"
                                />
                                <span>AI Scheme Assistant</span>
                            </div>

                            <h1 className="mt-5 max-w-[850px] text-[44px] font-bold leading-[1.04] tracking-[-2px] text-[#172033] sm:text-[56px] md:text-[64px] lg:text-[68px]">
                                Ask Anything,
                                <br />
                                <span className="text-[#08783f]">
                                    Find the Right Scheme
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
                    <section className="mx-auto w-full max-w-[1040px] px-4 pt-8 pb-10 sm:px-6 lg:px-8">
                        <div className="space-y-7">
                            {messages.map((message) => (
                                <div key={message.id}>
                                    {message.role === "user" ? (
                                        <div className="flex justify-end">
                                            <div className="flex max-w-[78%] items-end gap-2.5 sm:max-w-[65%]">
                                                <div className="rounded-[20px] rounded-br-md bg-[#08783f] px-4 py-3 text-white shadow-[0_7px_24px_rgba(8,120,63,0.14)]">
                                                    <p className="whitespace-pre-wrap text-[13px] leading-5 sm:text-sm">
                                                        {message.text}
                                                    </p>

                                                    <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-white/65">
                                                        <span>{message.time}</span>
                                                        <CheckCircle2 size={11} />
                                                    </div>
                                                </div>

                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d4e4d8] bg-white/90 text-[#08783f] shadow-sm">
                                                    <UserRound size={15} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfe4d4] bg-white/90 text-[#08783f] shadow-[0_4px_16px_rgba(8,120,63,0.10)] backdrop-blur-xl">
                                                <Sparkles
                                                    size={17}
                                                    strokeWidth={1.8}
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                {message.response && (
                                                    <AssistantResponseCard
                                                        response={message.response}
                                                        onSuggestion={handleSuggestion}
                                                        onAction={handleSchemeAction}
                                                    />
                                                )}

                                                <div className="mt-2 flex items-center gap-2 text-[10px] text-[#8a9690]">
                                                    <span>{message.time}</span>

                                                    {message.id ===
                                                        lastAssistantMessageId && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    aria-label="Helpful response"
                                                                    className="rounded-full p-1.5 transition hover:bg-white/80 hover:text-[#08783f]"
                                                                >
                                                                    <ThumbsUp size={13} />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    aria-label="Not helpful"
                                                                    className="rounded-full p-1.5 transition hover:bg-white/80 hover:text-[#08783f]"
                                                                >
                                                                    <ThumbsDown size={13} />
                                                                </button>
                                                            </>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfe4d4] bg-white/90 text-[#08783f] shadow-sm">
                                        <Sparkles
                                            size={17}
                                            className="animate-pulse"
                                        />
                                    </div>

                                    <div className="rounded-[18px] border border-white/80 bg-white/90 px-5 py-4 shadow-[0_8px_28px_rgba(30,70,45,0.08)] backdrop-blur-xl">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#08783f]" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#08783f] [animation-delay:150ms]" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#08783f] [animation-delay:300ms]" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </section>
                )}
            </div>

            {/*   FIXED BOTTOM COMPOSER
                This never moves when the conversation grows. */}
            <div className="relative z-30 shrink-0 border-t border-white/35 bg-gradient-to-t from-[#fdfcf8] via-[#fdfcf8]/95 to-transparent px-4 pb-3 pt-3 sm:px-6 sm:pb-4 sm:pt-4 lg:px-8">
                <div className="mx-auto w-full max-w-[900px]">
                    <div className="rounded-[28px] border border-[#dfe8e2] bg-white/96 p-2 shadow-[0_14px_45px_rgba(26,69,43,0.16)] backdrop-blur-2xl transition-all duration-200 focus-within:border-[#b8d6c1] focus-within:shadow-[0_16px_50px_rgba(26,69,43,0.20)] sm:p-2.5">
                        <div className="flex min-h-[58px] items-center gap-2 rounded-[21px] bg-[#f8faf8] px-3 sm:min-h-[62px] sm:px-4">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) =>
                                    setQuestion(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder={
                                    isListening
                                        ? "Listening... speak naturally"
                                        : hasStartedChat
                                            ? "Ask a follow-up question..."
                                            : "Ask about a government scheme..."
                                }
                                className="min-w-0 flex-1 bg-transparent py-3 text-[14px] text-[#172033] outline-none placeholder:text-[#8a9690] sm:text-[15px]"
                            />

                            <div className="relative shrink-0">
                                {isListening && (
                                    <span className="absolute inset-0 animate-ping rounded-full bg-[#08783f]/15" />
                                )}

                                <button
                                    type="button"
                                    onClick={handleVoiceInput}
                                    aria-label={
                                        isListening
                                            ? "Stop listening"
                                            : "Speak your question"
                                    }
                                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all sm:h-11 sm:w-11 ${isListening
                                            ? "border-[#08783f] bg-[#e7f5eb] text-[#08783f] shadow-[0_0_0_4px_rgba(8,120,63,0.08)]"
                                            : "border-[#dce5df] bg-white text-[#08783f] hover:border-[#08783f] hover:bg-[#f1f8f2]"
                                        }`}
                                >
                                    <Mic size={18} strokeWidth={1.8} />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={handleAsk}
                                aria-label="Send question to Sahay AI"
                                disabled={!question.trim() || isTyping}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08783f] text-white shadow-[0_5px_16px_rgba(8,120,63,0.22)] transition-all hover:bg-[#056b37] hover:shadow-[0_7px_20px_rgba(8,120,63,0.28)] disabled:cursor-not-allowed disabled:opacity-35 sm:h-11 sm:w-11"
                            >
                                <Send size={18} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    {!hasStartedChat && (
                        <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-[#63806d] sm:text-[12px]">
                            <CheckCircle2
                                size={13}
                                className="text-[#08783f]"
                            />
                            <span>
                                Reliable information. Simple language. Better
                                tomorrow.
                            </span>
                        </div>
                    )}

                    {hasStartedChat && (
                        <p className="mt-1.5 text-center text-[10px] text-[#8a9690]">
                            Sahay AI helps you discover Bihar government
                            schemes. Always verify eligibility with the
                            official department.
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}