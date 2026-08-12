"use client"
import {
  GraduationCap,
  Tractor,
  UserRound,
  BadgeIndianRupee,
  House,
  BriefcaseBusiness,
  LucideIcon,
} from "lucide-react";



type Category = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;

  // Future API support
  schemeCount?: number;
};



const categories: Category[] = [
  {
    id: "education",
    title: "Education",
    description: "Scholarships, education & student support",
    icon: GraduationCap,
    schemeCount: 12,
  },

  {
    id: "farmers",
    title: "Farmers",
    description: "Agriculture, farming & financial support",
    icon: Tractor,
    schemeCount: 8,
  },

  {
    id: "women",
    title: "Women",
    description: "Women empowerment & welfare schemes",
    icon: UserRound,
    schemeCount: 15,
  },

  {
    id: "pension",
    title: "Pension",
    description: "Social security & senior citizen support",
    icon: BadgeIndianRupee,
    schemeCount: 7,
  },

  {
    id: "housing",
    title: "Housing",
    description: "Housing, shelter & basic amenities",
    icon: House,
    schemeCount: 9,
  },

  {
    id: "employment",
    title: "Employment",
    description: "Jobs, skills & livelihood opportunities",
    icon: BriefcaseBusiness,
    schemeCount: 11,
  },
];


export default function CategorySection() {
  return (
    <section className="w-full bg-[#fbfcfa] py-16 sm:py-20">

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">


        <div className="mx-auto mb-11 max-w-[650px] text-center">

          {/* Small Label */}
          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-[#75a988]" />

            <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#4b8c63]">
              Explore
            </span>

            <span className="h-px w-8 bg-[#75a988]" />

          </div>


          {/* Main Heading */}
          <h2
            className="
              text-3xl
              font-bold
              tracking-[-0.8px]
              text-[#172033]
              sm:text-4xl
            "
          >
            Government{" "}
            <span className="text-[#08783f]">
              Schemes
            </span>{" "}
            by Category
          </h2>


          {/* Description */}
          <p
            className="
              mx-auto
              mt-4
              max-w-[540px]
              text-sm
              leading-6
              text-[#6b7280]
              sm:text-[15px]
            "
          >
            Discover government schemes organized around your
            needs, goals and everyday requirements.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:gap-5
            md:grid-cols-3
            lg:grid-cols-6
          "
        >

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  // Future:
                  // router.push(`/categories/${category.id}`)
                }}
                className="
                  group
                  relative
                  flex
                  min-h-[225px]
                  flex-col
                  items-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#e4e9e5]
                  bg-white
                  px-4
                  py-7
                  text-center
                  shadow-[0_3px_12px_rgba(20,60,35,0.045)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#cfe1d4]
                  hover:shadow-[0_12px_30px_rgba(20,80,40,0.10)]
                "
              >

                <div
                  className="
                    absolute
                    left-1/2
                    top-0
                    h-[3px]
                    w-0
                    -translate-x-1/2
                    rounded-b-full
                    bg-[#08783f]
                    transition-all
                    duration-300
                    group-hover:w-14
                  "
                />

                <div
                  className="
                    flex
                    h-[62px]
                    w-[62px]
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#eff8f1]
                    ring-1
                    ring-[#e0efe3]
                    transition-all
                    duration-300
                    group-hover:bg-[#e5f4e8]
                    group-hover:ring-[#cfe5d4]
                    group-hover:scale-105
                  "
                >
                  <Icon
                    size={34}
                    strokeWidth={1.8}
                    className="text-[#08783f]"
                  />
                </div>

                <h3
                  className="
                    mt-5
                    text-[15px]
                    font-bold
                    text-[#172033]
                  "
                >
                  {category.title}
                </h3>

                <p
                  className="
                    mt-2
                    min-h-[38px]
                    max-w-[170px]
                    text-[12px]
                    leading-[18px]
                    text-[#737b87]
                  "
                >
                  {category.description}
                </p>

                {category.schemeCount !== undefined && (
                  <div
                    className="
                      mt-auto
                      pt-5
                      text-[11px]
                      font-semibold
                      tracking-wide
                      text-[#4f8f64]
                    "
                  >
                    {category.schemeCount}+ Schemes
                  </div>
                )}

              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
}