"use client";

import Image from "next/image";
import {
    CheckCircle2,
    Mic,
    Search,
    Send,
    Sparkles,
    ThumbsDown,
    ThumbsUp,
    UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
    id: number;
    role: "user" | "assistant";
    text: string;
    time: string;
};

const demoResponse = ` Great! I can help you find government schemes available in Bihar.

Based on your question, here are some schemes you may be eligible for:

• Post Matric Scholarship for SC/ST/OBC Students
• Mukhyamantri Kanya Utthan Yojana
• Student Credit Card Yojana
• Bihar Student Protsahan Yojana

Would you like to know more about any of these schemes?
`;

export default function AIAssistantPage() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const hasStartedChat = messages.length > 0;

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
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages, isTyping]);

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

    const handleAsk = () => {
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion || isTyping) return;

        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        const userMessage: Message = {
            id: Date.now(),
            role: "user",
            text: trimmedQuestion,
            time,
        };

        setMessages((prev) => [...prev, userMessage]);
        setQuestion("");
        setIsTyping(true);

        setTimeout(() => {
            const assistantMessage: Message = {
                id: Date.now() + 1,
                role: "assistant",
                text: demoResponse,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 900);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAsk();
        }
    };

    return (
        <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#fdfcf8]">

            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/images/AI-Background.png"
                    alt="Bihar landscape"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center scale-[1.02]"
                />

                <div className="absolute inset-0 bg-white/45" />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.93)_32%,rgba(255,255,255,0.65)_55%,rgba(255,255,255,0.15)_80%,transparent_100%)]" />

                <div className="absolute inset-x-0 bottom-0 h-[360px] bg-gradient-to-t from-[#fdfcf8]/95 via-[#fdfcf8]/55 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1240px] flex-col px-4 sm:px-6 lg:px-8">
                {/* Landing hero */}
                {!hasStartedChat && (
                    <section className="flex flex-1 items-start justify-center pt-[8vh] sm:pt-[10vh] lg:pt-[8vh]">
                        <div className="flex w-full max-w-[900px] flex-col items-center text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e8d8] bg-white/80 px-4 py-2 text-sm font-medium text-[#267144] shadow-[0_4px_18px_rgba(8,120,63,0.08)] backdrop-blur-xl">
                                <Sparkles size={16} className="text-[#08783f]" />
                                <span>AI Scheme Assistant</span>
                            </div>

                            <h1 className="mt-5 max-w-[850px] text-[44px] font-bold leading-[1.04] tracking-[-2px] text-[#172033] sm:text-[56px] md:text-[64px] lg:text-[68px]">
                                Ask Anything,
                                <br />
                                <span className="text-[#08783f]">
                                    Find the Right Scheme
                                </span>
                            </h1>

                        </div>
                    </section>
                )}

                {/* Conversation */}
                {hasStartedChat && (
                    <section className="min-h-0 flex-1 overflow-hidden pt-6 pb-[170px] sm:pt-8">
                        <div className="mx-auto h-full w-full max-w-[900px] overflow-y-auto px-1 sm:px-2">
                            <div className="space-y-5 pb-5">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex items-end gap-3 ${message.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                            }`}
                                    >
                                        {message.role === "assistant" && (
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfe4d4] bg-white/90 text-[#08783f] shadow-[0_4px_16px_rgba(8,120,63,0.10)] backdrop-blur-xl">
                                                <Sparkles size={17} strokeWidth={1.8} />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[82%] rounded-[20px] px-4 py-3.5 text-left shadow-[0_8px_28px_rgba(30,70,45,0.08)] sm:max-w-[75%] ${message.role === "user"
                                                    ? "rounded-br-md bg-[#08783f] text-white"
                                                    : "rounded-bl-md border border-white/80 bg-white/90 text-[#26332c] backdrop-blur-xl"
                                                }`}
                                        >
                                            <div className="whitespace-pre-line text-[13px] leading-6 sm:text-sm">
                                                {message.text}
                                            </div>

                                            <div
                                                className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${message.role === "user"
                                                        ? "text-white/70"
                                                        : "text-[#8a9690]"
                                                    }`}
                                            >
                                                <span>{message.time}</span>
                                                {message.role === "user" && (
                                                    <CheckCircle2 size={12} />
                                                )}
                                            </div>
                                        </div>

                                        {message.role === "user" && (
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfe4d4] bg-white/90 text-[#08783f] shadow-sm backdrop-blur-xl">
                                                <UserRound size={17} />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex items-end gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfe4d4] bg-white/90 text-[#08783f] shadow-sm">
                                            <Sparkles size={17} className="animate-pulse" />
                                        </div>

                                        <div className="rounded-[20px] rounded-bl-md border border-white/80 bg-white/90 px-5 py-4 shadow-[0_8px_28px_rgba(30,70,45,0.08)] backdrop-blur-xl">
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
                        </div>
                    </section>
                )}


                <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 sm:px-6 lg:px-8 ${hasStartedChat ? "pb-4 sm:pb-5" : "pb-3 sm:pb-4" }`}>
                    <div className="pointer-events-auto mx-auto w-full max-w-[900px]">
                        <div className="rounded-[28px] border border-[#dfe8e2] bg-white/96 p-2 shadow-[0_14px_45px_rgba(26,69,43,0.16)] backdrop-blur-2xl transition-all duration-200 focus-within:border-[#b8d6c1] focus-within:shadow-[0_16px_50px_rgba(26,69,43,0.20)] sm:p-2.5">
                            <div className="flex min-h-[58px] items-center gap-2 rounded-[21px] bg-[#f8faf8] px-3 sm:min-h-[62px] sm:px-4">
                                <Search
                                    size={20}
                                    strokeWidth={1.8}
                                    className="shrink-0 text-[#74817a]"
                                />

                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
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
                                        aria-label={isListening ? "Stop listening" : "Speak your question"}
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
                            <div className="mt-2 flex items-center justify-center gap-2 pb-0.5 text-[11px] text-[#63806d] sm:text-[12px]">
                                <CheckCircle2 size={13} className="text-[#08783f]" />
                                <span>
                                    Reliable information. Simple language. Better tomorrow.
                                </span>
                            </div>
                        )}

                        {hasStartedChat &&
                            messages.some((message) => message.role === "assistant") && (
                                <div className="mt-2 flex justify-end gap-1 pr-2">
                                    <button
                                        type="button"
                                        aria-label="Helpful response"
                                        className="rounded-full p-2 text-[#718079] transition hover:bg-white/80 hover:text-[#08783f]"
                                    >
                                        <ThumbsUp size={15} />
                                    </button>

                                    <button
                                        type="button"
                                        aria-label="Not helpful"
                                        className="rounded-full p-2 text-[#718079] transition hover:bg-white/80 hover:text-[#08783f]"
                                    >
                                        <ThumbsDown size={15} />
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </main>
    );
}