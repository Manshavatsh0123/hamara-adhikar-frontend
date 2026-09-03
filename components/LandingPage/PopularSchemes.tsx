"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
    Accessibility,
    ArrowRight,
    BookOpen,
    BriefcaseBusiness,
    CheckCircle2,
    Coins,
    GraduationCap,
    HeartPulse,
    Landmark,
    RefreshCw,
    ShieldCheck,
    Sprout,
    UserRound,
    UsersRound,
    WalletCards,
    Wheat,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { getRandomSchemes } from "@/lib/api/schemes";
import type { Scheme } from "@/types/scheme";

type IconConfig = {
    icon: LucideIcon;
    label: string;
};

function getSchemeIcon(scheme: Scheme): IconConfig {
    const text = [
        scheme.scheme_name,
        scheme.department,
        scheme.description,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    if (
        text.includes("agriculture") ||
        text.includes("farmer") ||
        text.includes("farming") ||
        text.includes("crop") ||
        text.includes("krishi") ||
        text.includes("makhana") ||
        text.includes("horticulture") ||
        text.includes("fisher")
    ) {
        return {
            icon: Wheat,
            label: "Agriculture",
        };
    }

    if (
        text.includes("education") ||
        text.includes("school") ||
        text.includes("student") ||
        text.includes("scholarship") ||
        text.includes("matric") ||
        text.includes("college") ||
        text.includes("university") ||
        text.includes("examination") ||
        text.includes("medhavriti")
    ) {
        return {
            icon: GraduationCap,
            label: "Education",
        };
    }

    if (
        text.includes("employment") ||
        text.includes("job") ||
        text.includes("skill") ||
        text.includes("livelihood") ||
        text.includes("self employment") ||
        text.includes("entrepreneur") ||
        text.includes("business")
    ) {
        return {
            icon: BriefcaseBusiness,
            label: "Employment",
        };
    }

    if (
        text.includes("pension") ||
        text.includes("widow") ||
        text.includes("senior citizen") ||
        text.includes("social security")
    ) {
        return {
            icon: WalletCards,
            label: "Social Security",
        };
    }

    if (
        text.includes("health") ||
        text.includes("medical") ||
        text.includes("hospital") ||
        text.includes("healthcare")
    ) {
        return {
            icon: HeartPulse,
            label: "Healthcare",
        };
    }

    if (
        text.includes("women") ||
        text.includes("girl") ||
        text.includes("female") ||
        text.includes("mahila")
    ) {
        return {
            icon: UserRound,
            label: "Women Welfare",
        };
    }

    if (
        text.includes("child") ||
        text.includes("anganwadi") ||
        text.includes("pre-school")
    ) {
        return {
            icon: UsersRound,
            label: "Child Welfare",
        };
    }

    if (
        text.includes("disability") ||
        text.includes("disabled") ||
        text.includes("pwd") ||
        text.includes("accessibility")
    ) {
        return {
            icon: Accessibility,
            label: "Disability Support",
        };
    }

    if (
        text.includes("loan") ||
        text.includes("financial") ||
        text.includes("assistance") ||
        text.includes("subsidy") ||
        text.includes("grant") ||
        text.includes("₹")
    ) {
        return {
            icon: Coins,
            label: "Financial Assistance",
        };
    }

    if (
        text.includes("housing") ||
        text.includes("house") ||
        text.includes("residential") ||
        text.includes("accommodation")
    ) {
        return {
            icon: Landmark,
            label: "Housing",
        };
    }

    if (
        text.includes("welfare") ||
        text.includes("social") ||
        text.includes("community")
    ) {
        return {
            icon: ShieldCheck,
            label: "Social Welfare",
        };
    }

    if (
        text.includes("plant") ||
        text.includes("plantation") ||
        text.includes("environment") ||
        text.includes("tree")
    ) {
        return {
            icon: Sprout,
            label: "Development",
        };
    }

    return {
        icon: BookOpen,
        label: "Government Scheme",
    };
}

function getShortTitle(title: string | null | undefined): string {
    if (!title) {
        return "Government Scheme";
    }

    return title.trim();
}

function getShortDescription(
    description: string | null | undefined
): string {
    if (!description) {
        return "Government support scheme for eligible citizens of Bihar.";
    }

    const cleanDescription = description.trim();

    if (cleanDescription.length <= 120) {
        return cleanDescription;
    }

    return `${cleanDescription.slice(0, 120).trim()}...`;
}

function formatDepartment(
    department: string | null | undefined
): string {
    if (!department) {
        return "Government of Bihar";
    }

    const cleanDepartment = department.trim();

    if (cleanDepartment.length <= 45) {
        return cleanDepartment;
    }

    return `${cleanDepartment.slice(0, 45).trim()}...`;
}

export default function PopularSchemes() {
    const [schemes, setSchemes] = useState<Scheme[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const loadSchemes = useCallback(
        async (isRefresh = false) => {
            try {
                setError("");

                if (isRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                const data = await getRandomSchemes(5);

                setSchemes(data);
            } catch (err) {
                console.error(
                    "Failed to load popular schemes:",
                    err
                );

                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to load schemes."
                );

                setSchemes([]);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        []
    );

    useEffect(() => {
        void loadSchemes();
    }, [loadSchemes]);

    if (loading) {
        return (
            <section className="w-full bg-[#fbfdfb] py-16 sm:py-20 lg:py-24">
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[1200px]
                        px-5
                        sm:px-6
                        lg:px-8
                    "
                >
                    <div className="mx-auto max-w-[700px] text-center">
                        <div className="mx-auto h-7 w-40 animate-pulse rounded-full bg-[#edf3ef]" />

                        <div className="mx-auto mt-5 h-10 w-[380px] max-w-full animate-pulse rounded-xl bg-[#edf3ef]" />

                        <div className="mx-auto mt-4 h-4 w-[480px] max-w-full animate-pulse rounded-full bg-[#f1f5f2]" />
                    </div>

                    <div
                        className=" mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3
                        "
                    >
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className=" min-h-[295px] animate-pulse rounded-2xl border border-[#e8eee9] bg-white p-6
                                "
                            >
                                <div className="h-14 w-14 rounded-2xl bg-[#edf5ef]" />

                                <div className="mt-6 h-5 w-4/5 rounded bg-[#edf3ef]" />

                                <div className="mt-3 h-3 w-3/5 rounded bg-[#f1f5f2]" />

                                <div className="mt-6 space-y-2">
                                    <div className="h-3 w-full rounded bg-[#f1f5f2]" />
                                    <div className="h-3 w-11/12 rounded bg-[#f1f5f2]" />
                                    <div className="h-3 w-4/5 rounded bg-[#f1f5f2]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full bg-[#fbfdfb] py-16 sm:py-20 lg:py-24">
                <div
                    className=" mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8
                    "
                >
                    <div
                        className=" mx-auto max-w-[520px] rounded-2xl border border-[#e5ebe7] bg-white p-8 text-center shadow-[0_8px_30px_rgba(25,70,40,0.05)]
                        "
                    >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf8f0]">
                            <ShieldCheck
                                size={26}
                                className="text-[#08783f]"
                            />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-[#172033]">
                            Schemes are temporarily unavailable
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#737b87]">
                            We could not load the latest government schemes.
                            Please try again.
                        </p>

                        <button
                            type="button"
                            onClick={() => void loadSchemes()}
                            className=" mt-6 inline-flex items-center gap-2 rounded-xl bg-[#08783f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b38]
                            "
                        >
                            <RefreshCw size={16} />
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative w-full overflow-hidden bg-[#fbfdfb] py-16 sm:py-20 lg:py-24">
            <div
                className=" pointer-events-none absolute -left-40 top-16 h-80 w-80 rounded-full bg-[#eaf7ee] opacity-70 blur-3xl
                "
            />

            <div
                className=" pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#edf8f1] opacity-70 blur-3xl
                "
            />

            <div
                className=" relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8
                "
            >
                <div className="mx-auto max-w-[720px] text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#dcebe0] bg-[#f3faf5] px-4 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />

                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#08783f]">
                            Lokpriya Sarkari Yojna
                        </span>
                    </div>

                    <h2
                        className=" mt-5 text-3xl font-bold tracking-[-1px] text-[#172033] sm:text-4xl lg:text-[42px]
                        "
                    >
                        Lokpriya Sarkari{" "}
                        <span className="text-[#08783f]">
                            Yojna
                        </span>
                    </h2>

                    <p
                        className=" mx-auto mt-4 max-w-[600px] text-sm leading-6 text-[#707987] sm:text-[15px]
                        "
                    >
                        Bihar ke logon ke liye useful aur popular government
                        schemes ko ek jagah par dekhein.
                    </p>
                </div>

                {schemes.length > 0 ? (
                    <div
                        className=" mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3
                        "
                    >
                        {schemes.slice(0, 3).map((scheme) => {
                            const {
                                icon: SchemeIcon,
                                label,
                            } = getSchemeIcon(scheme);

                            return (
                                <Link
                                    key={scheme.id}
                                    href={`/schemes/${scheme.id}`}
                                    className=" group relative flex min-h-[295px] flex-col overflow-hidden rounded-2xl border border-[#e4ebe6] bg-white p-6 shadow-[0_4px_18px_rgba(25,70,40,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe2d5] hover:shadow-[0_16px_38px_rgba(20,80,40,0.11)]
                                    "
                                >
                                    <div
                                        className=" absolute left-6 right-6 top-0 h-[3px] origin-center scale-x-0 rounded-b-full bg-[#08783f] transition-transform duration-300 group-hover:scale-x-100
                                        "
                                    />

                                    <div className="flex items-start justify-between">
                                        <div
                                            className=" flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8f1] ring-1 ring-[#dceee1] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#e5f5e9] "
                                        >
                                            <SchemeIcon
                                                size={27}
                                                strokeWidth={1.8}
                                                className="text-[#08783f]"
                                            />
                                        </div>

                                        <span
                                            className=" rounded-full bg-[#f5f8f5] px-2.5 py-1 text-[10px] font-semibold text-[#6b8171]
                                            ">
                                            Bihar
                                        </span>
                                    </div>

                                    <div
                                        className=" mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4f9566]
                                        "
                                    >
                                        {label}
                                    </div>

                                    <h3
                                        className=" mt-2 line-clamp-3 text-[16px] font-bold leading-[22px] text-[#172033] transition-colors group-hover:text-[#08783f]
                                        "
                                    >
                                        {getShortTitle(scheme.scheme_name)}
                                    </h3>

                                    <p
                                        className=" mt-3 line-clamp-2 text-[11px] font-medium leading-[17px] text-[#8a929d]
                                        ">
                                        {formatDepartment(scheme.department)}
                                    </p>

                                    <p
                                        className=" mt-3 line-clamp-3 text-[12px] leading-[18px] text-[#737b87]
                                        ">
                                        {getShortDescription(scheme.description)}
                                    </p>

                                    <div
                                        className=" mt-auto flex items-center justify-between border-t border-[#edf1ee] pt-5
                                        "
                                    >
                                        <span
                                            className=" inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#08783f]
                                            ">
                                            <CheckCircle2
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            Learn more
                                        </span>

                                        <span
                                            className=" flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f8f3] text-[#08783f] transition-all duration-300 group-hover:bg-[#08783f] group-hover:text-white
                                            "
                                        >
                                            <ArrowRight size={15} />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div
                        className=" mt-10 rounded-2xl border border-[#e6ece8] bg-white px-6 py-12 text-center shadow-[0_4px_18px_rgba(25,70,40,0.035)]
                        ">
                        <BookOpen
                            size={30}
                            className="mx-auto text-[#08783f]"
                        />

                        <h3 className="mt-4 text-lg font-bold text-[#172033]">
                            No schemes available
                        </h3>

                        <p className="mt-2 text-sm text-[#737b87]">
                            Please check again shortly.
                        </p>
                    </div>
                )}

                <div className="mt-9 flex justify-center">
                    <button
                        type="button"
                        onClick={() => void loadSchemes(true)}
                        disabled={refreshing}
                        className=" inline-flex items-center gap-2 rounded-xl border border-[#dce9df] bg-white px-4 py-2.5 text-sm font-medium text-[#657269] shadow-[0_2px_8px_rgba(25,70,40,0.04)] transition-all hover:border-[#bcd8c5] hover:text-[#08783f] hover:shadow-[0_5px_16px_rgba(25,70,40,0.07)] disabled:cursor-not-allowed disabled:opacity-60
                        ">
                        <RefreshCw
                            size={15}
                            className={refreshing ? "animate-spin" : ""}
                        />

                        {refreshing
                            ? "Refreshing..."
                            : "Show different schemes"}
                    </button>
                </div>

                <div className="mt-7 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-5 rounded-full bg-[#08783f]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9d9ce]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9d9ce]" />
                </div>
            </div>
        </section>
    );
}