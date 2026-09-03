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
        <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            <div
                className=" pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#edf8f1] opacity-70 blur-3xl
                "
            />

            <div
                className=" pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-[#f0f9f3] opacity-70 blur-3xl
                "
            />

            <div
                className=" relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8
                "
            >
                <div className="mx-auto max-w-[700px] text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#dcebe0] bg-[#f3faf5] px-4 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />

                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#08783f]">
                            Simple Process
                        </span>
                    </div>

                    <h2
                        className=" mt-5 text-3xl font-bold leading-tight tracking-[-1px] text-[#172033] sm:text-4xl lg:text-[42px]
                        "
                    >
                        Yojana Tak{" "}
                        <span className="text-[#08783f]">
                            Aapka Safar
                        </span>
                    </h2>

                    <p
                        className=" mx-auto mt-4 max-w-[600px] text-sm leading-6 text-[#68717b] sm:text-[15px]
                        "
                    >
                        Sahi yojana dhoondhne se lekar application track karne
                        tak, har step ko simple aur easy banaya gaya hai.
                    </p>
                </div>

                <div
                    className=" mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-0
                    "
                >
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className=" relative flex flex-col items-center text-center lg:px-5 xl:px-7">
                            <div
                                className=" relative w-full max-w-[280px] rounded-3xl border border-[#e3ebe5] bg-white p-3 shadow-[0_8px_28px_rgba(25,70,40,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe2d5] hover:shadow-[0_16px_36px_rgba(20,80,40,0.10)]">

                                <div
                                    className=" relative h-[175px] w-full overflow-hidden rounded-2xl bg-[#f4faf5] sm:h-[185px]
                                    ">

                                    <Image
                                        src={step.image}
                                        alt={`Step ${step.id}: ${step.title}`}
                                        fill
                                        sizes=" (max-width: 640px) 280px, (max-width: 1024px) 300px, 280px
                                        "
                                        className="object-contain object-center"
                                    />

                                    <div
                                        className=" absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-[#08783f] text-[12px] font-bold text-white shadow-[0_5px_14px_rgba(8,120,63,0.22)]
                                        ">
                                        {step.id}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 max-w-[270px]">
                                <h3
                                    className=" text-[16px] font-bold leading-6 tracking-[-0.15px] text-[#172033] sm:text-[17px]
                                    ">
                                    {step.title}
                                </h3>

                                <p
                                    className=" mt-2 text-[12px] leading-[19px] text-[#6b7280] sm:text-[13px]
                                    "
                                >
                                    {step.description}
                                </p>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className=" absolute right-[-32px] top-[100px] z-30 hidden h-8 w-[64px] items-center lg:flex
                                    " >
                                    <div
                                        className=" absolute left-0 right-2 top-1/2 -translate-y-1/2 border-t border-dashed border-[#9fc1aa]
                                        "/>

                                    <span
                                        className=" absolute right-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#dcebe0] bg-white text-[#08783f] shadow-[0_3px_10px_rgba(25,70,40,0.06)]
                                        ">
                                        <ArrowRight
                                            size={14}
                                            strokeWidth={1.9}
                                        />
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex items-center justify-center sm:mt-14">
                    <div
                        className=" inline-flex items-center gap-2 rounded-full border border-[#e0ebe3] bg-white px-4 py-2.5 shadow-[0_3px_12px_rgba(25,70,40,0.04)]" >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eaf7ee]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#08783f]" />
                        </span>

                        <span className="text-[11px] font-medium text-[#66736b] sm:text-xs">
                            Simple, transparent and easy to follow
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}