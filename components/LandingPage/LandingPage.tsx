"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fdfcf9]">

      {/* Soft background glow */}
      <div className="pointer-events-none absolute -left-32  -top-32  h-72  w-72 rounded-full bg-[#edf7ef]  opacity-70 blur-3xl  " />

      <div
        className=" pointer-events-none absolute
                    bottom-[-120px]
                    left-[35%]
                    h-72
                    w-72
                    rounded-full
                    bg-[#eef8f0]
                    opacity-50
                    blur-3xl
                "
      />


      <div
        className="
                    relative
                    min-h-[680px]
                    sm:min-h-[700px]
                    md:min-h-[650px]
                    lg:h-[580px]
                    lg:min-h-0
                "
      >


        <div
          className="
                        relative
                        z-20
                        mx-auto
                        flex
                        h-full
                        w-full
                        max-w-[1200px]
                        items-center
                        px-5
                        py-12
                        sm:px-8
                        sm:py-14
                        lg:px-10
                        lg:py-0
                        xl:px-0
                    "
        >

          <div
            className="
                            w-full
                            lg:w-[47%]
                        "
          >

            <div className="w-full max-w-[560px]">

              <div
                className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-2.5
                                    sm:mb-5
                                "
              >
                <span
                  className="
                                        h-[2px]
                                        w-9
                                        rounded-full
                                        bg-[#18804a]
                                    "
                />

                <p
                  className="
                                        text-[12px]
                                        font-semibold
                                        tracking-[0.02em]
                                        text-[#57936d]
                                        sm:text-[14px]
                                    "
                >
                  Bihar Ki Har{" "}
                  <span className="text-[#176c40]">
                    Yojana
                  </span>
                </p>
              </div>



              <h1 className=" max-w-[540px]
                                    text-[43px]
                                    font-extrabold
                                    leading-[0.98]
                                    tracking-[-2px]
                                    text-[#171b1a]
                                    sm:text-[50px]
                                    sm:tracking-[-2.4px]
                                    md:text-[56px]
                                    lg:text-[51px]
                                    xl:text-[60px]
                                "
              >
                Ab Aapke
                <br />
                Ungliyon Par
                <span className="text-[#13804a]">
                  .
                </span>
              </h1>


              {/* Decorative line */}

              <div
                className="
                                    my-5
                                    flex
                                    items-center
                                    gap-2
                                    sm:my-6
                                "
              >
                <div
                  className="
                                        h-[3px]
                                        w-12
                                        rounded-full
                                        bg-[#18804a]
                                    "
                />

                <div
                  className="
                                        h-[3px]
                                        w-2
                                        rounded-full
                                        bg-[#b9d8c1]
                                    "
                />
              </div>



              <p
                className="
                                    max-w-[500px]
                                    text-[14px]
                                    leading-[1.7]
                                    text-[#3e4842]
                                    sm:text-[16px]
                                    sm:leading-[1.75]
                                "
              >
                Bihar government schemes ki jaankari,
                eligibility, benefits aur application
                process —{" "}
                <span
                  className="
                                        font-semibold
                                        text-[#25352c]
                                    "
                >
                  sab kuch ek hi jagah.
                </span>
              </p>



              <Link
                href="/ai-assistant"
                className="
                                    group
                                    mt-6
                                    flex
                                    w-full
                                    max-w-[500px]
                                    items-center
                                    justify-between
                                    rounded-2xl
                                    border
                                    border-[#d9e9dd]
                                    bg-white
                                    p-2
                                    shadow-[0_8px_28px_rgba(23,60,43,0.07)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
                                    hover:border-[#b9d8c1]
                                    hover:shadow-[0_12px_32px_rgba(23,60,43,0.11)]
                                    sm:mt-7
                                "
              >

                <div className="flex min-w-0 items-center gap-3">

                  {/* AI icon */}

                  <div
                    className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#08783f]
                                            text-white
                                            shadow-[0_5px_15px_rgba(8,120,63,0.18)]
                                            transition-transform
                                            duration-300
                                            group-hover:scale-105
                                            sm:h-12
                                            sm:w-12
                                        "
                  >
                    <Sparkles
                      size={20}
                      strokeWidth={2}
                    />
                  </div>


                  {/* AI text */}

                  <div className="min-w-0">

                    <div
                      className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                    >
                      <p
                        className="
                                                    text-[13px]
                                                    font-bold
                                                    text-[#173c2b]
                                                    sm:text-[14px]
                                                "
                      >
                        Ask Sahay AI
                      </p>

                      <span
                        className="
                                                    hidden
                                                    rounded-full
                                                    bg-[#edf7f0]
                                                    px-2
                                                    py-0.5
                                                    text-[9px]
                                                    font-semibold
                                                    uppercase
                                                    tracking-wide
                                                    text-[#08783f]
                                                    sm:inline-flex
                                                "
                      >
                        Smart Help
                      </span>
                    </div>

                    <p
                      className="
                                                mt-0.5
                                                truncate
                                                text-[10px]
                                                text-[#7a857e]
                                                sm:text-[11px]
                                            "
                    >
                      Kuch bhi poochiye — yojana,
                      eligibility aur application.
                    </p>

                  </div>

                </div>


                {/* Arrow */}

                <div
                  className="
                                        mr-1
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#edf7f0]
                                        text-[#08783f]
                                        transition-all
                                        duration-300
                                        group-hover:bg-[#08783f]
                                        group-hover:text-white
                                    "
                >
                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                  />
                </div>

              </Link>



              <div
                className="
                                    mt-3
                                    grid
                                    grid-cols-3
                                    gap-2
                                    sm:mt-4
                                    sm:gap-3
                                "
              >

                {/* Find Schemes */}

                <div
                  className="
                                        group
                                        rounded-xl
                                        border
                                        border-[#e0e9e2]
                                        bg-white/90
                                        px-2.5
                                        py-3
                                        shadow-[0_3px_14px_rgba(23,60,43,0.035)]
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:border-[#c8dfcf]
                                        hover:shadow-[0_7px_20px_rgba(23,60,43,0.07)]
                                        sm:px-3
                                        sm:py-3.5
                                    "
                >
                  <div
                    className="
                                            mb-2
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-[#eaf6ed]
                                            text-[#08783f]
                                            transition-colors
                                            group-hover:bg-[#dff1e4]
                                        "
                  >
                    <Search
                      size={15}
                      strokeWidth={2}
                    />
                  </div>

                  <p
                    className="
                                            text-[10px]
                                            font-bold
                                            leading-4
                                            text-[#26302a]
                                            sm:text-[11px]
                                        "
                  >
                    Kholiye
                  </p>

                  <p
                    className="
                                            mt-0.5
                                            hidden
                                            text-[9px]
                                            leading-4
                                            text-[#7a857e]
                                            sm:block
                                        "
                  >
                    Schemes khojiye
                  </p>
                </div>


                {/* Eligibility */}

                <div
                  className="
                                        group
                                        rounded-xl
                                        border
                                        border-[#e0e9e2]
                                        bg-white/90
                                        px-2.5
                                        py-3
                                        shadow-[0_3px_14px_rgba(23,60,43,0.035)]
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:border-[#c8dfcf]
                                        hover:shadow-[0_7px_20px_rgba(23,60,43,0.07)]
                                        sm:px-3
                                        sm:py-3.5
                                    "
                >
                  <div
                    className="
                                            mb-2
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-[#eaf6ed]
                                            text-[#08783f]
                                            transition-colors
                                            group-hover:bg-[#dff1e4]
                                        "
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={2}
                    />
                  </div>

                  <p
                    className="
                                            text-[10px]
                                            font-bold
                                            leading-4
                                            text-[#26302a]
                                            sm:text-[11px]
                                        "
                  >
                    Samjhiye
                  </p>

                  <p
                    className="
                                            mt-0.5
                                            hidden
                                            text-[9px]
                                            leading-4
                                            text-[#7a857e]
                                            sm:block
                                        "
                  >
                    Eligibility samjhiye
                  </p>
                </div>


                {/* Application */}

                <div
                  className="
                                        group
                                        rounded-xl
                                        border
                                        border-[#e0e9e2]
                                        bg-white/90
                                        px-2.5
                                        py-3
                                        shadow-[0_3px_14px_rgba(23,60,43,0.035)]
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:border-[#c8dfcf]
                                        hover:shadow-[0_7px_20px_rgba(23,60,43,0.07)]
                                        sm:px-3
                                        sm:py-3.5
                                    "
                >
                  <div
                    className="
                                            mb-2
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-[#eaf6ed]
                                            text-[#08783f]
                                            transition-colors
                                            group-hover:bg-[#dff1e4]
                                        "
                  >
                    <FileText
                      size={15}
                      strokeWidth={2}
                    />
                  </div>

                  <p
                    className="
                                            text-[10px]
                                            font-bold
                                            leading-4
                                            text-[#26302a]
                                            sm:text-[11px]
                                        "
                  >
                    Laabh Uthaiye
                  </p>

                  <p
                    className="
                                            mt-0.5
                                            hidden
                                            text-[9px]
                                            leading-4
                                            text-[#7a857e]
                                            sm:block
                                        "
                  >
                    Apply aur laabh uthaiye
                  </p>
                </div>

              </div>


              {/* Trust line */}

              <div
                className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-2
                                    text-[10px]
                                    text-[#66736b]
                                    sm:mt-5
                                    sm:text-[11px]
                                "
              >
                <span
                  className="
                                        flex
                                        h-6
                                        w-6
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#e7f4ea]
                                    "
                >
                  <Sparkles
                    size={11}
                    strokeWidth={2}
                    className="text-[#18804a]"
                  />
                </span>

                <span>
                  Sahi jankari. Sahi samay par. Sahi jagah.
                </span>
              </div>

            </div>
          </div>
        </div>



        <div
          className="
                        absolute
                        right-0
                        top-0
                        hidden
                        h-full
                        w-[52%]
                        lg:block
                        lg:w-[55%]
                    "
        >
          <Image
            src="/LandingPage.png"
            alt="Bihar government schemes"
            fill
            priority
            sizes="55vw"
            className="
                            object-cover
                            object-center
                        "
          />

          {/* Image fade into content */}

          <div
            className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            left-0
                            w-[180px]
                            bg-gradient-to-r
                            from-[#fdfcf9]
                            via-[#fdfcf9]/70
                            to-transparent
                        "
          />

          {/* Slight bottom fade */}

          <div
            className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            bottom-0
                            h-20
                            bg-gradient-to-t
                            from-[#fdfcf9]/20
                            to-transparent
                        "
          />
        </div>



        <div
          className="
                        relative
                        h-[270px]
                        w-full
                        sm:h-[330px]
                        md:h-[360px]
                        lg:hidden
                    "
        >
          <Image
            src="/LandingPage.png"
            alt="Bihar government schemes"
            fill
            sizes="100vw"
            className="
                            object-cover
                            object-center
                        "
          />

          {/* Mobile top fade */}

          <div
            className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            top-0
                            h-24
                            bg-gradient-to-b
                            from-[#fdfcf9]
                            to-transparent
                        "
          />
        </div>

      </div>
    </section>
  );
}