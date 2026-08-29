import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SchemeNotFound() {
    return (
        <main className="min-h-screen bg-[#fdfcf9] px-5 py-20">
            <div className="mx-auto max-w-xl rounded-[28px] border border-[#dfe8e2] bg-white p-10 text-center shadow-[0_16px_45px_rgba(20,60,38,0.08)]">
                <p className="text-sm font-bold text-[#08783f]">
                    Sahay Bihar
                </p>

                <h1 className="mt-3 text-3xl font-bold text-[#142019]">
                    Scheme not found
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#68756e]">
                    We could not find a scheme for this ID.
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#08783f] px-5 py-3 text-sm font-semibold text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Results
                </Link>
            </div>
        </main>
    );
}
