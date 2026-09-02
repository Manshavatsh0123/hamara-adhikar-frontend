"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ActionButtonVariant = "primary" | "secondary";

type ActionButtonProps = {
    children: ReactNode;
    href?: string;
    variant?: ActionButtonVariant;
    icon?: ReactNode;
    mobileLabel?: string;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
};

export default function ActionButton({
    children,
    href,
    variant = "primary",
    icon,
    mobileLabel,
    className = "",
    onClick,
    ariaLabel,
}: ActionButtonProps) {
    const isPrimary = variant === "primary";

    const baseStyles =
        "group inline-flex h-11 items-center gap-2 rounded-xl px-3.5 sm:px-4 " +
        "text-sm font-semibold tracking-[-0.01em] " +
        "transition-all duration-200 ease-out " +
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#08783f]/30 " +
        "active:scale-[0.98]";

    const variantStyles = isPrimary
        ? [
              "border border-[#08783f]",
              "bg-[#08783f]",
              "text-white",
              "shadow-[0_4px_14px_rgba(8,120,63,0.14)]",
              "hover:bg-[#075f32]",
              "hover:border-[#075f32]",
              "hover:shadow-[0_7px_20px_rgba(8,120,63,0.20)]",
          ].join(" ")
        : [
              "border border-[#d5e2da]",
              "bg-white",
              "text-[#173c2b]",
              "shadow-[0_2px_8px_rgba(23,60,43,0.05)]",
              "hover:border-[#08783f]",
              "hover:bg-[#08783f]",
              "hover:text-white",
              "hover:shadow-[0_7px_18px_rgba(8,120,63,0.16)]",
          ].join(" ");

    const iconStyles = isPrimary
        ? "bg-white/12 text-white group-hover:bg-white/18"
        : "bg-[#edf7f0] text-[#08783f] group-hover:bg-white/15 group-hover:text-white";

    const content = (
        <>
            {icon && (
                <span
                    className={[
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                        "transition-colors duration-200",
                        iconStyles,
                    ].join(" ")}
                >
                    {icon}
                </span>
            )}

            <span className="hidden sm:inline">
                {children}
            </span>

            {mobileLabel && (
                <span className="sm:hidden">
                    {mobileLabel}
                </span>
            )}
        </>
    );

    const classes = `${baseStyles} ${variantStyles} ${className}`;

    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                aria-label={ariaLabel}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={classes}
            aria-label={ariaLabel}
        >
            {content}
        </button>
    );
}