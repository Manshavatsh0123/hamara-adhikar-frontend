import type { AssistantResponse, Scheme } from "./types";
import { SCHEMES, ALL_SUGGESTIONS } from "./data";

export const getTime = () =>
    new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

function normalizeQuestion(value: string) {
    return value.toLowerCase().replace(/[^\w\s₹]/g, " ");
}

export function buildAssistantResponse(question: string): AssistantResponse {
    const q = normalizeQuestion(question);

    const isBihar =
        q.includes("bihar") ||
        q.includes("patna") ||
        q.includes("resident");

    const isFarmer =
        q.includes("farmer") ||
        q.includes("agriculture") ||
        q.includes("kisan") ||
        q.includes("farming") ||
        q.includes("crop") ||
        q.includes("irrigation");

    const isStudent =
        q.includes("student") ||
        q.includes("education") ||
        q.includes("college") ||
        q.includes("school") ||
        q.includes("study") ||
        q.includes("scholarship");

    const isFinancial =
        q.includes("financial") ||
        q.includes("money") ||
        q.includes("loan") ||
        q.includes("assistance") ||
        q.includes("support");

    const isHousing =
        q.includes("housing") ||
        q.includes("house") ||
        q.includes("home");

    const isEmployment =
        q.includes("job") ||
        q.includes("employment") ||
        q.includes("skill") ||
        q.includes("work");

    const isSchemeRequest =
        q.includes("scheme") ||
        q.includes("yojana") ||
        q.includes("benefit") ||
        q.includes("eligible") ||
        q.includes("eligibility") ||
        q.includes("apply");

    const isClearlyOutOfScope =
        q.includes("weather") ||
        q.includes("capital of") ||
        q.includes("football") ||
        q.includes("cricket") ||
        q.includes("coding") ||
        q.includes("javascript") ||
        q.includes("react") ||
        q.includes("movie") ||
        q.includes("song");

    if (isClearlyOutOfScope) {
        return {
            type: "out-of-scope",
            title: "Let's find a Bihar government scheme",
            subtitle:
                "I’m designed to help you discover government schemes and benefits available in Bihar.",
            suggestions: ALL_SUGGESTIONS,
        };
    }

    let schemes: Scheme[] = [];

    if (isFarmer) {
        schemes = SCHEMES.filter((scheme) =>
            scheme.categories.includes("Agriculture")
        );
    } else if (isStudent) {
        schemes = SCHEMES.filter((scheme) =>
            scheme.categories.includes("Education")
        );
    } else if (isFinancial) {
        schemes = SCHEMES.filter((scheme) =>
            scheme.categories.includes("Financial Support")
        );
    } else if (isHousing || isEmployment) {
        schemes = [];
    } else if (isBihar || isSchemeRequest) {
        schemes = SCHEMES;
    }

    if (schemes.length > 0) {
        return {
            type: "schemes",
            title:
                isFarmer
                    ? "Schemes for Farmers"
                    : isStudent
                        ? "Schemes for Students"
                        : isFinancial
                            ? "Financial Support Schemes"
                            : "Schemes for You",
            subtitle: `We found ${schemes.length} schemes that may be relevant based on your question.`,
            schemes: schemes.slice(0, 3),
        };
    }

    return {
        type: "clarification",
        title: "Tell me a little more",
        subtitle:
            "I can help you find the right Bihar government scheme. Tell me who you are or what kind of support you need.",
        suggestions: ALL_SUGGESTIONS,
    };
}
