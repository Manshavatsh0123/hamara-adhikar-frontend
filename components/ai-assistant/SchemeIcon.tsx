import {
    GraduationCap,
    Sparkles,
    Sprout,
} from "lucide-react";

import type { AssistantScheme } from "./types";

type Props = {
    scheme: AssistantScheme;
};

export default function SchemeIcon({
    scheme,
}: Props) {
    const name = scheme.name.toLowerCase();
    const department =
        scheme.department.toLowerCase();

    if (
        name.includes("student") ||
        name.includes("medhavriti") ||
        name.includes("school") ||
        name.includes("education") ||
        department.includes("education")
    ) {
        return (
            <GraduationCap
                size={22}
                strokeWidth={2}
            />
        );
    }

    if (
        name.includes("kisan") ||
        name.includes("farmer") ||
        name.includes("sinchai") ||
        department.includes("agriculture") ||
        department.includes("water resources")
    ) {
        return (
            <Sprout
                size={22}
                strokeWidth={2}
            />
        );
    }

    return (
        <Sparkles
            size={21}
            strokeWidth={2}
        />
    );
}