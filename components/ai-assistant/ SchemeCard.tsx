import {
    ArrowRight,
    CheckCircle2,
    GraduationCap,
    MapPin,
    Sprout,
    Sparkles,
    UserRound,
} from "lucide-react";

import type { AssistantScheme } from "./types";

type SchemeCardProps = {
    scheme: AssistantScheme;
    onViewDetails: (
        scheme: AssistantScheme
    ) => void;
};

/* =========================================================
   CLEAN TEXT
   Removes markdown characters such as:
   *, **, bullets, extra spaces, etc.
========================================================= */

function cleanText(value: string): string {
    if (!value) return "";

    return value
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/^[-•]\s*/gm, "")
        .replace(/^\s+/gm, "")
        .replace(/\s+/g, " ")
        .trim();
}


/* =========================================================
   SCHEME ICON
========================================================= */

function SchemeIcon({
    scheme,
}: {
    scheme: AssistantScheme;
}) {
    const name = cleanText(
        scheme.name || ""
    ).toLowerCase();

    const department = cleanText(
        scheme.department || ""
    ).toLowerCase();

    if (
        name.includes("student") ||
        name.includes("medhavriti") ||
        name.includes("school") ||
        name.includes("education") ||
        name.includes("scholarship") ||
        department.includes("education")
    ) {
        return (
            <GraduationCap
                size={25}
                strokeWidth={1.9}
            />
        );
    }

    if (
        name.includes("kisan") ||
        name.includes("farmer") ||
        name.includes("sinchai") ||
        name.includes("agriculture") ||
        department.includes("agriculture") ||
        department.includes("water resources")
    ) {
        return (
            <Sprout
                size={25}
                strokeWidth={1.9}
            />
        );
    }

    return (
        <Sparkles
            size={24}
            strokeWidth={1.9}
        />
    );
}


/* =========================================================
   SCHEME CARD
========================================================= */

export default function SchemeCard({
    scheme,
    onViewDetails,
}: SchemeCardProps) {

    const benefits = Array.isArray(
        scheme.benefits
    )
        ? scheme.benefits
            .map(cleanText)
            .filter(Boolean)
        : [];

    const eligibility = Array.isArray(
        scheme.eligibility
    )
        ? scheme.eligibility
            .map(cleanText)
            .filter(Boolean)
        : [];

    /*
     * Keep the recommendation card compact.
     * Full information will be shown on SchemeDetails.
     */
    const visibleBenefits =
        benefits.slice(0, 3);

    const visibleEligibility =
        eligibility.slice(0, 2);

    const schemeName = cleanText(
        scheme.name || ""
    );

    const department = cleanText(
        scheme.department || ""
    );

    const description = cleanText(
        scheme.description || ""
    );

    const state = cleanText(
        scheme.state || "Bihar"
    );

    return (
        <article
            className="
                group
                overflow-hidden
                rounded-[24px]
                border
                border-[#dce8e0]
                bg-white
                shadow-[0_10px_32px_rgba(25,65,42,0.08)]
                backdrop-blur-xl
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:border-[#c4ddce]
                hover:shadow-[0_15px_40px_rgba(25,65,42,0.12)]
            "
        >

            <div
                className="
                    grid
                    md:grid-cols-[minmax(0,1.6fr)_minmax(190px,0.85fr)_minmax(190px,0.85fr)]
                "
            >

                {/* =================================================
                    MAIN SCHEME INFORMATION
                ================================================= */}

                <div className="p-5 sm:p-6 lg:p-7">

                    <div className="flex items-start gap-4">

                        {/* ICON */}

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#e2f3e7]
                                text-[#08783f]
                                ring-1
                                ring-[#d2ead9]
                            "
                        >
                            <SchemeIcon
                                scheme={scheme}
                            />
                        </div>


                        {/* TEXT */}

                        <div className="min-w-0 flex-1">

                            <h3
                                className="
                                    text-[18px]
                                    font-bold
                                    leading-6
                                    tracking-[-0.2px]
                                    text-[#172033]
                                    sm:text-[20px]
                                "
                            >
                                {schemeName}
                            </h3>


                            {department && (
                                <p
                                    className="
                                        mt-1.5
                                        text-[12px]
                                        font-semibold
                                        leading-5
                                        text-[#68766f]
                                        sm:text-[13px]
                                    "
                                >
                                    {department}
                                </p>
                            )}


                            {description && (
                                <p
                                    className="
                                        mt-4
                                        line-clamp-5
                                        text-[13px]
                                        leading-[1.65]
                                        text-[#536159]
                                        sm:text-[14px]
                                    "
                                >
                                    {description}
                                </p>
                            )}

                        </div>

                    </div>


                    {/* STATE */}

                    {state && (
                        <div className="mt-5">

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    bg-[#edf8f0]
                                    px-3
                                    py-1.5
                                    text-[11px]
                                    font-semibold
                                    text-[#267144]
                                "
                            >
                                <MapPin
                                    size={12}
                                />

                                {state}
                            </span>

                        </div>
                    )}

                </div>


                {/* =================================================
                    KEY BENEFITS
                ================================================= */}

                <div
                    className="
                        border-t
                        border-[#edf1ee]
                        p-5
                        sm:p-6
                        md:border-l
                        md:border-t-0
                    "
                >

                    <div className="flex items-center gap-2">

                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-[#e8f6ec]
                                text-[#08783f]
                            "
                        >
                            <CheckCircle2
                                size={17}
                            />
                        </div>

                        <h4
                            className="
                                text-[14px]
                                font-bold
                                text-[#172033]
                                sm:text-[15px]
                            "
                        >
                            Key Benefits
                        </h4>

                    </div>


                    {visibleBenefits.length >
                    0 ? (

                        <ul
                            className="
                                mt-4
                                space-y-3
                            "
                        >

                            {visibleBenefits.map(
                                (
                                    benefit,
                                    index
                                ) => (
                                    <li
                                        key={`${benefit}-${index}`}
                                        className="
                                            flex
                                            items-start
                                            gap-2.5
                                            text-[12px]
                                            leading-[1.55]
                                            text-[#536159]
                                            sm:text-[13px]
                                        "
                                    >

                                        <CheckCircle2
                                            size={15}
                                            className="
                                                mt-0.5
                                                shrink-0
                                                text-[#08783f]
                                            "
                                        />

                                        <span>
                                            {benefit}
                                        </span>

                                    </li>
                                )
                            )}

                        </ul>

                    ) : (

                        <p
                            className="
                                mt-4
                                text-[12px]
                                leading-5
                                text-[#7a867f]
                                sm:text-[13px]
                            "
                        >
                            Benefit details
                            available on
                            the scheme
                            details page.
                        </p>

                    )}

                </div>


                {/* =================================================
                    WHO CAN APPLY
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        border-t
                        border-[#edf1ee]
                        p-5
                        sm:p-6
                        md:border-l
                        md:border-t-0
                    "
                >

                    <div className="flex items-center gap-2">

                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-[#e8f6ec]
                                text-[#08783f]
                            "
                        >
                            <UserRound
                                size={17}
                            />
                        </div>

                        <h4
                            className="
                                text-[14px]
                                font-bold
                                text-[#172033]
                                sm:text-[15px]
                            "
                        >
                            Who can apply?
                        </h4>

                    </div>


                    {visibleEligibility.length >
                    0 ? (

                        <ul
                            className="
                                mt-4
                                space-y-3
                            "
                        >

                            {visibleEligibility.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <li
                                        key={`${item}-${index}`}
                                        className="
                                            flex
                                            items-start
                                            gap-2.5
                                            text-[12px]
                                            leading-[1.55]
                                            text-[#536159]
                                            sm:text-[13px]
                                        "
                                    >

                                        <UserRound
                                            size={15}
                                            className="
                                                mt-0.5
                                                shrink-0
                                                text-[#08783f]
                                            "
                                        />

                                        <span className="line-clamp-3">
                                            {item}
                                        </span>

                                    </li>
                                )
                            )}

                        </ul>

                    ) : (

                        <p
                            className="
                                mt-4
                                text-[12px]
                                leading-5
                                text-[#7a867f]
                                sm:text-[13px]
                            "
                        >
                            Eligibility
                            details
                            available on
                            the scheme
                            details page.
                        </p>

                    )}


                    {/* =================================================
                        VIEW DETAILS
                    ================================================= */}

                    <button
                        type="button"
                        onClick={() =>
                            onViewDetails(
                                scheme
                            )
                        }
                        className="
                            mt-6
                            inline-flex
                            min-h-11
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-[#08783f]
                            px-4
                            text-[13px]
                            font-semibold
                            text-white
                            shadow-[0_6px_18px_rgba(8,120,63,0.20)]
                            transition-all
                            duration-200
                            hover:bg-[#056b37]
                            hover:shadow-[0_8px_22px_rgba(8,120,63,0.25)]
                            active:scale-[0.98]
                        "
                    >
                        <span>
                            View Details
                        </span>

                        <ArrowRight
                            size={16}
                            className="
                                transition-transform
                                duration-200
                                group-hover:translate-x-0.5
                            "
                        />
                    </button>

                </div>

            </div>

        </article>
    );
}