import Image from "next/image";
import { Sprout } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#fdfcf9]
      "
    >

      <div
        className="relative
          min-h-[540px]
          sm:min-h-[560px]
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
            px-6
            sm:px-8
            lg:px-10
            xl:px-0
          "
        >

          <div
            className="
              w-full
              lg:w-[47%]
            "
          >
            <div className="max-w-[520px]">


              <div className="mb-5 flex items-center gap-2">
                <span className="h-[2px] w-9 bg-[#4d9567]" />

                <p
                  className="
                    text-[14px]
                    font-medium
                    text-[#57936d]
                    sm:text-[16px]
                  "
                >
                  Bihar Ki Har{" "}
                  <span className="text-[#176c40]">
                    Yojana
                  </span>
                </p>
              </div>



              <h1
                className="
                  text-[46px]
                  font-bold
                  leading-[1.02]
                  tracking-[-1.5px]
                  text-[#181b1d]
                  sm:text-[52px]
                  md:text-[58px]
                  lg:text-[52px]
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



              <div
                className="
                  my-7
                  h-[3px]
                  w-[66px]
                  bg-[#287b4d]
                "
              />



              <div
                className="
                  space-y-1
                  text-[16px]
                  leading-7
                  text-[#252a2c]
                  sm:text-[17px]
                "
              >
                <p>
                  Sahi jaankari, sahi samay par.
                </p>

                <p>
                  Har yojana ki poori jankari, ek hi jagah.
                </p>
              </div>



              <div
                className="
                  mt-8
                  flex
                  max-w-[460px]
                  items-center
                  gap-4
                  rounded-xl
                  bg-[#edf6ed]
                  px-4
                  py-4
                  sm:mt-9
                  sm:px-5
                "
              >

                {/* Icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d0ead5]
                    sm:h-14
                    sm:w-14
                  "
                >
                  <Sprout
                    size={24}
                    strokeWidth={1.8}
                    className="text-[#3d9660]"
                  />
                </div>



                <div>
                  <h2
                    className="
                      text-[14px]
                      font-bold
                      text-[#202526]
                      sm:text-[15px]
                    "
                  >
                    Khojiye, Samajhiye, Aur Laabh Uthaiye
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      leading-5
                      text-[#46504a]
                      sm:text-[13px]
                    "
                  >
                    Sarkari yojanaon ki poori jankari ke saath.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>



        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-[52%]
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

        </div>


        <div
          className=" relative
            mt-8
            h-[320px]
            w-full
            lg:hidden
          "
        >
          <Image
            src="/LandingPage.png"
            alt="Bihar government schemes"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}