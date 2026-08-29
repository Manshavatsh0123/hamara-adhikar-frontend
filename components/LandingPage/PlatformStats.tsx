"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    ClipboardList,
    Building2,
    MapPinned,
} from "lucide-react";

import { getStats } from "@/lib/api/stats";

type StatsData = {
    totalSchemes: number;
    totalStates: number;
    totalDepartments: number;
};

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
        <section className="w-full bg-white py-5 sm:py-6">
            <div
                className="  mx-auto
                    w-full
                    max-w-[1200px]
                    px-5
                    sm:px-6
                "
            >
                <div
                    className="
                        relative
                        flex
                        min-h-[120px]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#e1e9e3]
                        bg-[#f4f8ef]
                        shadow-[0_3px_14px_rgba(20,70,40,0.05)]
                    "
                >
                    <div
                        className="
                            relative
                            z-10
                            flex
                            flex-1
                            items-center
                            px-5
                            py-5
                            sm:px-7
                            lg:px-9
                        "
                    >
                        <div
                            className="
                                grid
                                w-full
                                grid-cols-3
                                divide-x
                                divide-[#dce8dd]
                            ">
                            
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-2
                                    first:pl-0
                                    sm:gap-4
                                    sm:px-5
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#e1f1e3]
                                        text-[#08783f]
                                        sm:h-11
                                        sm:w-11
                                    "
                                >
                                    <ClipboardList
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-[16px]
                                            font-bold
                                            leading-none
                                            text-[#172033]
                                            sm:text-[18px]
                                        "
                                    >
                                        {statsData.totalSchemes}+
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-[9px]
                                            font-medium
                                            leading-3
                                            text-[#65716a]
                                            sm:text-[10px]
                                        "
                                    >
                                        Government Schemes
                                    </p>
                                </div>
                            </div>

                            
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-2
                                    sm:gap-4
                                    sm:px-5
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#e1f1e3]
                                        text-[#08783f]
                                        sm:h-11
                                        sm:w-11
                                    "
                                >
                                    <Building2
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-[16px]
                                            font-bold
                                            leading-none
                                            text-[#172033]
                                            sm:text-[18px]
                                        "
                                    >
                                        {statsData.totalDepartments}+
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-[9px]
                                            font-medium
                                            leading-3
                                            text-[#65716a]
                                            sm:text-[10px]
                                        "
                                    >
                                        Government Departments
                                    </p>
                                </div>
                            </div>

                            {/* Total States */}
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-2
                                    sm:gap-4
                                    sm:px-5
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#e1f1e3]
                                        text-[#08783f]
                                        sm:h-11
                                        sm:w-11
                                    "
                                >
                                    <MapPinned
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-[16px]
                                            font-bold
                                            leading-none
                                            text-[#172033]
                                            sm:text-[18px]
                                        "
                                    >
                                        {statsData.totalStates}
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-[9px]
                                            font-medium
                                            leading-3
                                            text-[#65716a]
                                            sm:text-[10px]
                                        "
                                    >
                                        States Covered
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div
                        className="
                            relative
                            hidden
                            w-[34%]
                            shrink-0
                            overflow-hidden
                            sm:block
                        "
                    >
                        <Image
                            src="/Stats.png"
                            alt="Bihar government schemes"
                            fill
                            sizes="34vw"
                            className="object-cover object-top"
                        />

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                left-0
                                w-[100px]
                                bg-gradient-to-r
                                from-[#f4f8ef]
                                via-[#f4f8ef]/65
                                to-transparent"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}