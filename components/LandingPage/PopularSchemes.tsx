import Link from "next/link";
import {
  GraduationCap,
  Tractor,
  UserRound,
  BriefcaseBusiness,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";


// ============================================================
// TYPE
// ============================================================

type Scheme = {
  id: number;
  scheme_code: string;
  scheme_name: string;
  department: string;
  state: string;
  description: string;
};


// ============================================================
// YOUR CURRENT BACKEND RESPONSE
// ============================================================

const schemes: Scheme[] = [
  {
    id: 1,
    scheme_code: "",
    scheme_name: "BC & EBC Girls Residential +2 High School",
    department: "BC & EBC Welfare Department",
    state: "Bihar",
    description:
      "The BC & EBC Girls Residential +2 High School Scheme, launched by the BC & EBC Welfare Department, Government of Bihar, provides quality residential education to girl students belonging to the Backward Class (BC) and Extremely Backward Class (EBC). Residential schools have been established in all 38 districts of Bihar to ensure quality education, free accommodation, nutritious food, skill development, and modern learning facilities.",
  },
  {
    id: 11,
    scheme_code: "",
    scheme_name: "Krishi Input Anudan Yojana",
    department: "Department of Agriculture",
    state: "Bihar",
    description:
      "Krishi Input Anudan Yojana is a relief scheme launched by the Department of Agriculture, Government of Bihar, to provide agricultural input subsidies to farmers whose crops have suffered more than 33% damage due to heavy rainfall, floods, or an unexpected rise in the water level of rivers such as the Ganga and Kosi.",
  },
  {
    id: 20,
    scheme_code: "",
    scheme_name:
      "Bihar Shatabdi Asangathit Karyakshetra Kamagaar Evan Shilpakar Samajik Suraksha Yojana: Total Permanent Disability",
    department: "Labour Resources Department",
    state: "Bihar",
    description:
      "The Bihar Shatabdi Asangathit Karyakshetra Kamagaar Evan Shilpakar Samajik Suraksha Yojana is a social security scheme launched by the Labour Resources Department, Government of Bihar. Financial assistance is provided to registered workers and artisans in the unorganised sector who suffer total permanent disability due to an accident.",
  },
  {
    id: 6,
    scheme_code: "",
    scheme_name:
      "Chief Minister Divyangjan Empowerment Scheme (Sambal)",
    department: "Department of Social Welfare",
    state: "Bihar",
    description:
      "The Chief Minister Divyangjan Empowerment Scheme (Sambal) is an initiative of the Government of Bihar to ensure the welfare and empowerment of persons with disabilities. The scheme aims to provide timely access to disability-related welfare schemes and support their physical, social, educational, and economic empowerment.",
  },
  {
    id: 5,
    scheme_code: "",
    scheme_name: "Bihar Shatabdi Leper Welfare Scheme",
    department: "Social Welfare Department",
    state: "Bihar",
    description:
      "The Bihar Shatabdi Leper Welfare Scheme is implemented by the Social Welfare Department, Government of Bihar. The scheme provides monthly financial assistance to leprosy patients suffering from Visible Deformities Grade-II.",
  },
];


// ============================================================
// DEPARTMENT ICON
// ============================================================

function getSchemeIcon(department: string) {
  const value = department.toLowerCase();

  if (
    value.includes("agriculture") ||
    value.includes("animal") ||
    value.includes("fisher")
  ) {
    return Tractor;
  }

  if (value.includes("education")) {
    return GraduationCap;
  }

  if (
    value.includes("labour") ||
    value.includes("industry")
  ) {
    return BriefcaseBusiness;
  }

  if (
    value.includes("social welfare") ||
    value.includes("bc & ebc")
  ) {
    return UserRound;
  }

  return ShieldCheck;
}


// ============================================================
// DEPARTMENT LABEL
// ============================================================

function getDepartmentLabel(department: string) {
  const value = department.toLowerCase();

  if (value.includes("agriculture")) {
    return "Agriculture";
  }

  if (value.includes("education")) {
    return "Education";
  }

  if (value.includes("labour")) {
    return "Labour & Employment";
  }

  if (value.includes("bc & ebc")) {
    return "BC & EBC Welfare";
  }

  if (value.includes("social welfare")) {
    return "Social Welfare";
  }

  return department;
}


// ============================================================
// COMPONENT
// ============================================================

export default function PopularSchemes() {
  return (
    <section className="w-full bg-white py-16 sm:py-20">

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">

        {/* ====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mx-auto mb-12 max-w-[650px] text-center">

          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-[#8db79b]" />

            <div className="flex items-center gap-2">
              <Sparkles
                size={14}
                className="text-[#08783f]"
              />

              <span
                className="
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#4d8b62]
                "
              >
                Bihar Government
              </span>
            </div>

            <span className="h-px w-8 bg-[#8db79b]" />

          </div>


          <h2
            className="
              text-3xl
              font-bold
              tracking-[-0.8px]
              text-[#172033]
              sm:text-4xl
            "
          >
            Popular{" "}
            <span className="text-[#08783f]">
              Schemes
            </span>{" "}
            in Bihar
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-[560px]
              text-sm
              leading-6
              text-[#68717b]
              sm:text-[15px]
            "
          >
            Discover important government schemes and welfare
            programs designed to support citizens across Bihar.
          </p>

        </div>


        {/* ====================================================
            3 CARD LAYOUT
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {schemes.slice(0, 3).map((scheme) => {

            const Icon = getSchemeIcon(
              scheme.department
            );

            const department =
              getDepartmentLabel(
                scheme.department
              );

            return (
              <article
                key={scheme.id}
                className="
                  group
                  relative
                  flex
                  min-h-[380px]
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#e3e9e5]
                  bg-white
                  p-7
                  shadow-[0_4px_18px_rgba(20,60,35,0.045)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#cbded1]
                  hover:shadow-[0_18px_40px_rgba(20,70,40,0.10)]
                "
              >

                {/* ==================================================
                    PREMIUM TOP ACCENT
                ================================================== */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-[3px]
                    w-full
                    bg-gradient-to-r
                    from-[#08783f]
                    via-[#4da46b]
                    to-transparent
                  "
                />


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#dcebe0]
                      bg-[#f1f8f3]
                    "
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className="text-[#08783f]"
                    />
                  </div>


                  <span
                    className="
                      text-[11px]
                      font-semibold
                      text-[#668c73]
                    "
                  >
                    {scheme.state}
                  </span>

                </div>


                {/* ==================================================
                    DEPARTMENT
                ================================================== */}

                <div className="mt-7">

                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#6c987a]
                    "
                  >
                    {department}
                  </p>

                </div>


                {/* ==================================================
                    TITLE
                ================================================== */}

                <h3
                  title={scheme.scheme_name}
                  className="
                    mt-3
                    min-h-[72px]
                    line-clamp-3
                    text-[19px]
                    font-bold
                    leading-[25px]
                    tracking-[-0.25px]
                    text-[#172033]
                    transition-colors
                    group-hover:text-[#08783f]
                  "
                >
                  {scheme.scheme_name}
                </h3>


                {/* ==================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  title={scheme.description}
                  className="
                    mt-4
                    line-clamp-4
                    min-h-[80px]
                    text-[13px]
                    leading-[20px]
                    text-[#6b737c]
                  "
                >
                  {scheme.description}
                </p>


                {/* ==================================================
                    DIVIDER
                ================================================== */}

                <div className="my-6 h-px bg-[#edf0ee]" />


                {/* ==================================================
                    ACTION
                ================================================== */}

                <div className="mt-auto">

                  <Link
                    href={`/schemes/${scheme.id}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[13px]
                      font-bold
                      text-[#08783f]
                      transition-colors
                      hover:text-[#055e32]
                    "
                  >
                    Explore Scheme

                    <span
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-[#edf7ef]
                        transition-all
                        duration-200
                        group-hover:bg-[#08783f]
                        group-hover:text-white
                      "
                    >
                      <ArrowUpRight
                        size={14}
                        strokeWidth={2}
                      />
                    </span>
                  </Link>

                </div>

              </article>
            );
          })}

        </div>


        {/* ====================================================
            VIEW ALL
        ===================================================== */}

        <div className="mt-10 flex justify-center">

          <Link
            href="/schemes"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#cfe1d4]
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-[#08783f]
              shadow-[0_3px_10px_rgba(20,70,40,0.05)]
              transition-all
              hover:border-[#08783f]
              hover:bg-[#f3faf5]
            "
          >
            View All Schemes

            <ArrowUpRight size={16} />

          </Link>

        </div>

      </div>
    </section>
  );
}