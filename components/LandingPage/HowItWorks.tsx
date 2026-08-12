import Image from "next/image";
import { ArrowRight } from "lucide-react";


const steps = [
    {
        id: 1,
        title: "Find a Scheme",
        description:
            "Explore government schemes based on your needs, category and requirements.",
        image: "/Step-1.png",
    },

    {
        id: 2,
        title: "Check Eligibility",
        description:
            "Understand the eligibility criteria and see if the scheme is right for you.",
        image: "/Step-2.png",
    },

    {
        id: 3,
        title: "Apply Easily",
        description:
            "Get the required information and follow the simple steps to apply.",
        image: "/Step-3.png",
    },

    {
        id: 4,
        title: "Track Your Application",
        description:
            "Stay updated and check your application status whenever you need.",
        image: "/Step-4.png",
    },
];


export default function HowItWorks() {
    return (
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">

            <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6">

                <div className="mx-auto mb-14 max-w-[650px] text-center">

                    {/* Small Label */}

                    <div className="mb-3 flex items-center justify-center gap-3">

                        <span className="h-px w-8 bg-[#91b79d]" />

                        <span
                            className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#4d8b62]
                sm:text-[12px]
              "
                        >
                            Simple Process
                        </span>

                        <span className="h-px w-8 bg-[#91b79d]" />

                    </div>


                    {/* Main Heading */}

                    <h2
                        className="
              text-3xl
              font-bold
              leading-tight
              tracking-[-0.8px]
              text-[#172033]
              sm:text-4xl
            "
                    >
                        How to Find{" "}
                        <span className="text-[#08783f]">
                            Your Scheme
                        </span>
                    </h2>


                    {/* Description */}

                    <p
                        className="
              mx-auto
              mt-4
              max-w-[570px]
              text-sm
              leading-6
              text-[#68717b]
              sm:text-[15px]
            "
                    >
                        Finding the right government scheme is simple.
                        Discover, check your eligibility, apply and track
                        your application — all in one place.
                    </p>

                </div>

                <div
                    className="
            grid
            grid-cols-1
            gap-12
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-0
          "
                >

                    {steps.map((step, index) => (

                        <div
                            key={step.id}
                            className="
                relative
                flex
                flex-col
                items-center
                text-center
                lg:px-6
              "
                        >

                            <div
                                className="
                  relative
                  flex
                  h-[185px]
                  w-[260px]
                  items-center
                  justify-center
                  sm:h-[195px]
                  sm:w-[270px]
                "
                            >

                                <Image
                                    src={step.image}
                                    alt={`Step ${step.id}: ${step.title}`}
                                    fill
                                    sizes="
                    (max-width: 640px) 260px,
                    270px
                  "
                                    className="
                    object-contain
                    object-center
                  "
                                />

                                <div
                                    className="
                    absolute
                    left-1
                    top-2
                    z-20
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-white
                    bg-[#08783f]
                    text-[12px]
                    font-bold
                    text-white
                    shadow-[0_4px_12px_rgba(8,120,63,0.22)]
                  "
                                >
                                    {step.id}
                                </div>

                            </div>


                            <div
                                className="
                  mt-4
                  max-w-[260px]
                  sm:mt-5
                "
                            >

                                <h3
                                    className="
                    text-[16px]
                    font-bold
                    leading-6
                    tracking-[-0.15px]
                    text-[#172033]
                    sm:text-[17px]
                  "
                                >
                                    {step.title}
                                </h3>


                                <p
                                    className="
                    mt-2
                    text-[12px]
                    leading-[19px]
                    text-[#6b7280]
                    sm:text-[13px]
                  "
                                >
                                    {step.description}
                                </p>

                            </div>


                            {index < steps.length - 1 && (
                                <div
                                    className="
                    absolute
                    right-[-12px]
                    top-[91px]
                    z-30
                    hidden
                    h-6
                    w-[65px]
                    items-center
                    lg:flex
                  "
                                >

                                    {/* Dashed connector */}

                                    <div
                                        className="
                      absolute
                      left-0
                      right-1
                      top-1/2
                      -translate-y-1/2
                      border-t
                      border-dashed
                      border-[#79a98a]
                    "
                                    />


                                    {/* Arrow */}

                                    <ArrowRight
                                        size={19}
                                        strokeWidth={1.8}
                                        className="
                      absolute
                      right-0
                      bg-white
                      pl-1
                      text-[#08783f]
                    "
                                    />

                                </div>
                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}