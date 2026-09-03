"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    BadgeCheck,
    Building2,
    ClipboardList,
    HeartHandshake,
    MapPinned,
    ShieldCheck,
} from "lucide-react";

import { getStats } from "@/lib/api/stats";

type StatsData = {
    totalSchemes: number;
    totalStates: number;
    totalDepartments: number;
};

const trustPoints = [
    {
        title: "100% Vishwasniya Jaankari",
        description: "Sarkari sources se verified jankari.",
        icon: ShieldCheck,
    },
    {
        title: "Samay Par Update",
        description: "Har yojana ki latest jankari.",
        icon: BadgeCheck,
    },
    {
        title: "Aasaan Bhasha Mein",
        description: "Har jankari saral aur samajhne layak.",
        icon: HeartHandshake,
    },
    {
        title: "Aapke Saath, Hamesha",
        description: "Sawaal poochhiye, turant jawab paaiye.",
        icon: HeartHandshake,
    },
];

export default function PlatformStats() {
    const [statsData, setStatsData] = useState<StatsData>({
        totalSchemes: 0,
        totalStates: 0,
        totalDepartments: 0,
    });

    useEffect(() => {
        async function loadStats() {
            try {
                const data = await getStats();

                setStatsData(data);
            } catch (error) {
                console.error(
                    "Failed to load platform stats:",
                    error
                );
            }
        }

        loadStats();
    }, []);

    return (
        <section className="w-full bg-white py-10 sm:py-12 lg:py-14">
            <div
                className=" mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8"
            >
                <div
                    className=" overflow-hidden rounded-2xl border border-[#dfe9e2] bg-[#f3f8f3] shadow-[0_8px_30px_rgba(20,70,40,0.06)]">
                    <div
                        className=" grid grid-cols-1 items-center lg:grid-cols-[42%_58%] "
                    >
                        <div
                            className=" relative min-h-[250px] overflow-hidden sm:min-h-[310px] lg:min-h-[350px]
                            "
                        >
                            <Image
                                src="/Stats.png"
                                alt="Bihar rural community"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 42vw"
                                className="object-cover object-center"
                            />

                            <div
                                className=" pointer-events-none absolute inset-0 bg-gradient-to-t from-[#f3f8f3]/25 via-transparent to-transparent
                                "/>
                        </div>

                        <div
                            className=" px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">

                            <div className="mb-5">
                                <span
                                    className=" inline-flex items-center rounded-full border border-[#cfe4d4] bg-white/80 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#17804a]">
                                    Kyu Chunke Samay Bihara?
                                </span>

                                <h2
                                    className=" mt-3 text-2xl font-bold tracking-[-0.03em] text-[#173c2b] sm:text-3xl
                                    ">
                                    Aapka Vishwas, Hamari Zimmedari
                                </h2>

                                <div className="mt-3 h-px w-10 bg-[#08783f]" />
                            </div>

                            <div
                                className=" grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">

                                {trustPoints.map((point) => {
                                    const Icon = point.icon;

                                    return (
                                        <div
                                            key={point.title}
                                            className=" flex items-start gap-3
                                            "
                                        >
                                            <div
                                                className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f1e5] text-[#08783f]
                                                ">
                                                <Icon
                                                    size={17}
                                                    strokeWidth={1.8}
                                                />
                                            </div>

                                            <div>
                                                <p
                                                    className=" text-[12px] font-bold leading-4 text-[#24382e] sm:text-[13px]
                                                    ">
                                                    {point.title}
                                                </p>

                                                <p
                                                    className=" mt-1 text-[10px] leading-4 text-[#68756d] sm:text-[11px]
                                                    "
                                                >
                                                    {point.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div
                        className=" border-t border-[#2a9a68]/40 bg-[#08783f] px-5 py-5 sm:px-7 sm:py-6 lg:px-9
                        "
                    >
                        <div
                            className=" grid grid-cols-2 divide-x divide-white/20 lg:grid-cols-3
                            "
                        >
                            <div
                                className=" flex items-center gap-3 px-3 first:pl-0 sm:gap-4 sm:px-5
                                "
                            >
                                <div
                                    className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white sm:h-11 sm:w-11
                                    "
                                >
                                    <ClipboardList
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className=" text-lg font-bold leading-none text-white sm:text-xl
                                        ">
                                        {statsData.totalSchemes}+
                                    </p>

                                    <p
                                        className=" mt-1 text-[9px] font-medium leading-3 text-white/75 sm:text-[10px]
                                        ">
                                        Sarkari Yojanaen
                                    </p>
                                </div>
                            </div>

                            <div
                                className=" flex items-center gap-3 px-3 sm:gap-4 sm:px-5 ">

                                <div
                                    className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white sm:h-11 sm:w-11">
                                    <Building2
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className=" text-lg font-bold leading-none text-white sm:text-xl
                                        ">
                                        {statsData.totalDepartments}+
                                    </p>

                                    <p
                                        className=" mt-1 text-[9px] font-medium leading-3 text-white/75 sm:text-[10px]">
                                        Vibhag
                                    </p>
                                </div>
                            </div>

                            <div
                                className=" col-span-2 mt-5 flex items-center gap-3 border-t border-white/20 px-3 pt-5 lg:col-span-1 lg:mt-0 lg:border-l lg:border-t-0 lg:px-5 lg:pt-0
                                ">
                                <div
                                    className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white sm:h-11 sm:w-11">
                                    <MapPinned
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p className=" text-lg font-bold leading-none text-white sm:text-xl ">
                                        {statsData.totalStates}
                                    </p>

                                    <p
                                        className=" mt-1 text-[9px] font-medium leading-3 text-white/75 sm:text-[10px]">
                                        Rajya, Apka Bihar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
