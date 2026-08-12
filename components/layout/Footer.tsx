import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles
} from "lucide-react";


export default function Footer() {
  return (
    <footer className="border-t border-[#e7ece9] bg-[#f8faf8]">

      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1200px]
          grid-cols-1
          gap-10
          px-5
          py-12
          sm:px-6
          md:grid-cols-2
          lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]
          lg:gap-12
          lg:py-14
        "
      >

        <div>

          <Link
            href="/"
            className="inline-flex items-center gap-3"
          >

            {/* Logo */}

            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/Logo.png"
                alt="Sahay Bihar"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>


            {/* Brand */}

            <div>

              <h2
                className="
                  text-[21px]
                  font-extrabold
                  leading-none
                  tracking-[-0.04em]
                  text-[#173c2b]
                "
              >
                Sahay{" "}
                <span className="text-[#08783f]">
                  Bihar
                </span>
              </h2>

              <p
                className="
                  mt-1
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#718078]
                "
              >
                Your Guide to Bihar Government Schemes
              </p>

            </div>

          </Link>


          <p
            className="
              mt-6
              max-w-[330px]
              text-[13px]
              leading-6
              text-[#68736d]
            "
          >
            Discover government schemes, understand your
            eligibility and find the right benefits — all in
            one simple place.
          </p>


          <Link
            href="/ai-assistant"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#cfe1d4]
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-[#08783f]
              shadow-[0_2px_8px_rgba(20,70,40,0.04)]
              transition
              hover:border-[#08783f]
              hover:bg-[#08783f]
              hover:text-white
            "
          >
            <Sparkles size={14} />

            Ask Sahay AI

            <ArrowUpRight size={14} />
          </Link>

        </div>


        <div>

          <h3
            className="
              mb-5
              text-[13px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#172033]
            "
          >
            Explore
          </h3>


          <div className="space-y-3">

            <Link
              href="/"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              Home
            </Link>


            <Link
              href="/schemes"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              Government Schemes
            </Link>


            <Link
              href="/categories"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              Scheme Categories
            </Link>


            <Link
              href="/ai-assistant"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              Ask Sahay AI
            </Link>

          </div>

        </div>


        <div>

          <h3
            className="
              mb-5
              text-[13px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#172033]
            "
          >
            Resources
          </h3>


          <div className="space-y-3">

            <Link
              href="/about"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              About Sahay Bihar
            </Link>


            <Link
              href="/contact"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              Contact Us
            </Link>


            <Link
              href="/help"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              Help & Support
            </Link>


            <Link
              href="/privacy"
              className="
                block
                text-[13px]
                text-[#68736d]
                transition
                hover:text-[#08783f]
              "
            >
              Privacy Policy
            </Link>

          </div>

        </div>

        <div>

          <h3
            className="
              mb-5
              text-[13px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#172033]
            "
          >
            Connect With Us
          </h3>


          <p
            className="
              max-w-[250px]
              text-[13px]
              leading-5
              text-[#68736d]
            "
          >
            Have a question about a government scheme?
            We are here to help you find the right information.
          </p>



          <p
            className="
              mt-6
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.1em]
              text-[#87918b]
            "
          >
            Mobile App Coming Soon
          </p>

        </div>

      </div>


      <div className="border-t border-[#e4e9e6] bg-white">

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1200px]
            flex-col
            items-center
            justify-between
            gap-2
            px-5
            py-4
            text-center
            sm:px-6
            md:flex-row
            md:text-left
          "
        >

          <p className="text-[11px] text-[#7a837e]">
            © {new Date().getFullYear()} Sahay Bihar. All rights reserved.
          </p>


          <p className="text-[11px] text-[#7a837e]">
            Built with care for Bihar
          </p>

        </div>

      </div>

    </footer>
  );
}