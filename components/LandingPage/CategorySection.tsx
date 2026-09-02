"use client";

import {
    Accessibility,
    BadgeIndianRupee,
    Baby,
    BookOpen,
    BriefcaseBusiness,
    CheckCircle2,
    GraduationCap,
    HandCoins,
    HeartPulse,
    House,
    Landmark,
    LucideIcon,
    Search,
    ShieldCheck,
    Sprout,
    Tractor,
    UserRound,
    Users,
    Wheat,
} from "lucide-react";

type Category = {
    id: string;
    title: string;
    icon: LucideIcon;
};

const categoryIcons: Record<string, LucideIcon> = {
    agriculture: Wheat,
    anganwadi: Baby,
    "backward class": Users,
    "backward classes": Users,
    bpl: HandCoins,
    business: BriefcaseBusiness,
    "capacity building": Landmark,
    "child welfare": Baby,
    "civil services": Landmark,
    "competitive examination": BookOpen,
    "construction worker": Users,
    craftsmen: Users,
    "crop assistance": Wheat,
    "crop damage": Wheat,
    "digital learning": BookOpen,
    disability: Accessibility,
    "disability assistance": Accessibility,
    "disability support": Accessibility,
    "dragon fruit development": Sprout,
    education: GraduationCap,
    employment: BriefcaseBusiness,
    empowerment: ShieldCheck,
    entrepreneurship: BriefcaseBusiness,
    "equipment grant": HandCoins,
    "extremely backward class": Users,
    "extremely backward classes": Users,
    farmer: Tractor,
    "farmer welfare": Tractor,
    "financial assistance": HandCoins,
    fisheries: Wheat,
    "fish farmer": Tractor,
    "flood relief": House,
    "free accommodation": House,
    "free education": GraduationCap,
    "girl student": GraduationCap,
    healthcare: HeartPulse,
    "higher education": GraduationCap,
    horticulture: Sprout,
    hostel: House,
    irrigation: Wheat,
    labour: Users,
    "leprosy patient": HeartPulse,
    library: BookOpen,
    "livelihood support": HandCoins,
    "makhana development": Sprout,
    marriage: Users,
    matric: GraduationCap,
    minority: Users,
    "minority welfare": Users,
    "natural disaster": House,
    "papaya development": Sprout,
    pension: BadgeIndianRupee,
    plantation: Sprout,
    "plant supply": Sprout,
    "pond development": Wheat,
    "pre-school": Baby,
    pwd: Accessibility,
    "residential school": House,
    "rural development": House,
    "scheduled caste": Users,
    "scheduled tribe": Users,
    scholarship: GraduationCap,
    "self employment": BriefcaseBusiness,
    "skill development": BriefcaseBusiness,
    "skill upgradation": BriefcaseBusiness,
    "social security": ShieldCheck,
    "social welfare": Users,
    student: GraduationCap,
    "student empowerment": GraduationCap,
    "student loan": HandCoins,
    "student welfare": GraduationCap,
    subsidy: HandCoins,
    "technology adoption": Landmark,
    tools: BriefcaseBusiness,
    training: BookOpen,
    uniform: GraduationCap,
    "unorganised workers": Users,
    "unorganized workers": Users,
    "vocational training": BriefcaseBusiness,
    widow: Users,
    "widow pension": BadgeIndianRupee,
    women: UserRound,
    "women welfare": UserRound,
    youth: BriefcaseBusiness,
};

function getCategoryIcon(category: string): LucideIcon {
    return categoryIcons[category.toLowerCase().trim()] ?? Landmark;
}

export default function CategorySection() {
    const categories = [
        "Disability Assistance",
        "Disability Support",
        "Dragon Fruit Development",
        "Education",
        "Employment",
        "Empowerment",
    ];

    return (
        <section className="relative w-full overflow-hidden bg-[#fbfdfb] py-16 sm:py-20 lg:py-24">
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-[360px]
                    w-[760px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#eef8f1]
                    opacity-70
                    blur-3xl
                "
            />

            <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 xl:px-0">
                <div className="mx-auto max-w-[700px] text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dcebe0] bg-white px-3.5 py-1.5 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />

                        <span
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-[#08783f]
                                sm:text-[11px]
                            "
                        >
                            Explore Categories
                        </span>
                    </div>

                    <h2
                        className="
                            text-[30px]
                            font-bold
                            leading-[1.15]
                            tracking-[-1px]
                            text-[#142033]
                            sm:text-[36px]
                            md:text-[40px]
                        "
                    >
                        Har Zaroorat Ke Liye{" "}
                        <span className="text-[#08783f]">
                            Ek Yojana
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-4
                            max-w-[600px]
                            text-[14px]
                            leading-6
                            text-[#718096]
                            sm:text-[15px]
                            sm:leading-7
                        "
                    >
                        Education, employment, agriculture, healthcare aur
                        social welfare — apni zaroorat ke hisaab se Bihar
                        government schemes explore karein.
                    </p>
                </div>

                <div
                    className="
                        mt-10
                        grid
                        grid-cols-2
                        gap-3
                        sm:mt-12
                        sm:grid-cols-3
                        sm:gap-4
                        lg:grid-cols-6
                    "
                >
                    {categories.map((title) => {
                        const Icon = getCategoryIcon(title);

                        return (
                            <button
                                key={title}
                                type="button"
                                className="
                                    group
                                    relative
                                    flex
                                    min-h-[170px]
                                    flex-col
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-[20px]
                                    border
                                    border-[#e1ebe4]
                                    bg-white
                                    px-4
                                    py-6
                                    text-center
                                    shadow-[0_4px_18px_rgba(23,60,43,0.035)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-[#c8dfcf]
                                    hover:shadow-[0_14px_30px_rgba(8,120,63,0.09)]
                                    active:translate-y-0
                                "
                            >
                                <span
                                    className="
                                        absolute
                                        left-1/2
                                        top-0
                                        h-[2px]
                                        w-0
                                        -translate-x-1/2
                                        rounded-b-full
                                        bg-[#08783f]
                                        transition-all
                                        duration-300
                                        group-hover:w-12
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        h-[58px]
                                        w-[58px]
                                        items-center
                                        justify-center
                                        rounded-[17px]
                                        bg-[#eff8f2]
                                        ring-1
                                        ring-[#dceee1]
                                        transition-all
                                        duration-300
                                        group-hover:scale-105
                                        group-hover:bg-[#e6f5ea]
                                        group-hover:ring-[#c9e5d1]
                                    "
                                >
                                    <Icon
                                        size={28}
                                        strokeWidth={1.8}
                                        className="
                                            text-[#08783f]
                                            transition-transform
                                            duration-300
                                            group-hover:scale-105
                                        "
                                    />
                                </div>

                                <h3
                                    className="
                                        mt-5
                                        max-w-[155px]
                                        text-[13px]
                                        font-semibold
                                        leading-5
                                        text-[#172033]
                                        transition-colors
                                        duration-200
                                        group-hover:text-[#08783f]
                                        sm:text-[14px]
                                    "
                                >
                                    {title}
                                </h3>

                                <span
                                    className="
                                        mt-1
                                        text-[10px]
                                        font-medium
                                        text-[#94a19a]
                                        transition-colors
                                        duration-200
                                        group-hover:text-[#57936d]
                                    "
                                >
                                    Explore schemes
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-10 flex items-center justify-center gap-1.5 sm:mt-12">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9dfd0]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9dfd0]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9dfd0]" />
                    <span className="mx-1 h-1.5 w-8 rounded-full bg-[#08783f]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9dfd0]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9dfd0]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c9dfd0]" />
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                    <ShieldCheck
                        size={14}
                        strokeWidth={1.8}
                        className="text-[#08783f]"
                    />

                    <span className="text-[10px] font-medium text-[#7b8b82] sm:text-[11px]">
                        Government schemes, organized for you
                    </span>
                </div>
            </div>
        </section>
    );
}