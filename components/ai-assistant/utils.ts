import type {
    AssistantResponse,
    AssistantScheme,
} from "./types";

export const getTime = () =>
    new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

export const ALL_SUGGESTIONS = [
    "I am a student from Bihar",
    "I am a farmer from Bihar",
    "I need financial assistance",
    "I am looking for an education scheme",
];

/* =========================================================
   CLEAN AI MARKDOWN
========================================================= */

export function cleanAIText(text: string): string {
    if (!text) {
        return "";
    }

    return text
        .replace(/\r/g, "")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/^#{1,6}\s*/gm, "")
        .replace(/\*\*/g, "")
        .replace(/__([^_]+)__/g, "$1")
        .replace(/^\s*---+\s*$/gm, "")
        .replace(/^\s*--+\s*$/gm, "")
        .replace(/^\s*[-*•]\s+/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

/* =========================================================
   EXTRACT SECTION FROM AI RESPONSE
========================================================= */

export function extractSection(
    text: string,
    sectionNames: string[]
): string[] {
    if (!text) {
        return [];
    }

    const cleaned = text.replace(/\r/g, "");

    const escapedNames = sectionNames.map((name) =>
        name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    const otherSections = [
        "Eligibility",
        "Benefits",
        "Description & Benefits",
        "Description and Benefits",
        "Department",
        "State",
    ];

    const otherNames = otherSections
        .filter(
            (name) =>
                !sectionNames.some(
                    (selected) =>
                        selected.toLowerCase() ===
                        name.toLowerCase()
                )
        )
        .map((name) =>
            name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        )
        .join("|");

    const regex = new RegExp(
        `(?:^|\\n)\\s*(?:[*#]+\\s*)?(?:${escapedNames.join(
            "|"
        )})(?:\\s*[*#]+)?\\s*:?\\s*([\\s\\S]*?)(?=\\n\\s*(?:[*#]+\\s*)?(?:${otherNames})(?:\\s*[*#]+)?\\s*:|\\n\\s*#{1,6}\\s*\\d+\\.|\\n\\s*---+|$)`,
        "i"
    );

    const match = cleaned.match(regex);

    if (!match?.[1]) {
        return [];
    }

    return match[1]
        .split(/\n+/)
        .map((line) =>
            line
                .replace(/^\s*[-*•]\s*/, "")
                .replace(/\*\*/g, "")
                .replace(/^#+\s*/, "")
                .replace(/^\s*:\s*/, "")
                .trim()
        )
        .filter(Boolean);
}

/* =========================================================
   FIND SCHEME SECTION
========================================================= */

export function getSchemeSection(
    reply: string,
    schemeName: string
): string {
    if (!reply || !schemeName) {
        return "";
    }

    const escapedName = schemeName.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    const regex = new RegExp(
        `#{1,6}\\s*\\d+\\.\\s*\\*{0,2}${escapedName}\\*{0,2}([\\s\\S]*?)(?=\\n\\s*---+|\\n\\s*#{1,6}\\s*\\d+\\.|$)`,
        "i"
    );

    return reply.match(regex)?.[1] || "";
}

/* =========================================================
   MAP BACKEND SCHEME → FRONTEND SCHEME
========================================================= */

export function mapBackendScheme(
    source: {
        id: number;
        scheme_name: string;
        department: string | null;
        state: string | null;
        description: string | null;
        rank?: number;
    },
    reply: string
): AssistantScheme {
    const section = getSchemeSection(
        reply,
        source.scheme_name
    );

    let benefits = extractSection(section, [
        "Benefits",
        "Description & Benefits",
        "Description and Benefits",
    ]);

    const eligibility = extractSection(section, [
        "Eligibility",
    ]);

    /*
     * Some Gemini responses put the entire
     * Description & Benefits text on one line.
     *
     * If parsing still fails, use the database
     * description as the benefit fallback.
     */
    if (benefits.length === 0 && source.description) {
        benefits = [source.description];
    }

    return {
        id: String(source.id),

        name: source.scheme_name,

        department:
            source.department ||
            "Government of Bihar",

        state:
            source.state ||
            "Bihar",

        description:
            source.description ||
            "Details are available from the concerned government department.",

        rank: source.rank,

        benefits,

        eligibility,
    };
}

/* =========================================================
   CREATE FRONTEND RESPONSE
========================================================= */

export function createAssistantResponse(
    reply: string,
    sources: Array<{
        id: number;
        scheme_name: string;
        department: string | null;
        state: string | null;
        description: string | null;
        rank?: number;
    }>
): AssistantResponse {
    const cleanReply = reply.trim();

    const sortedSources = [...sources].sort(
        (a, b) =>
            (b.rank ?? 0) -
            (a.rank ?? 0)
    );

    /*
     * Remove duplicates by scheme ID.
     */
    const uniqueSources = sortedSources.filter(
        (scheme, index, array) =>
            index ===
            array.findIndex(
                (item) => item.id === scheme.id
            )
    );

    /*
     * Prefer schemes actually mentioned
     * by the AI.
     */
    const mentionedSources =
        uniqueSources.filter((source) =>
            cleanReply
                .toLowerCase()
                .includes(
                    source.scheme_name.toLowerCase()
                )
        );

    const selectedSources =
        mentionedSources.length > 0
            ? mentionedSources
            : uniqueSources.slice(0, 5);

    if (selectedSources.length > 0) {
        return {
            type: "schemes",

            title: "Schemes for You",

            subtitle:
                "Government schemes that best match your question.",

            /*
             * Keep this internally.
             * AssistantResponseCard will NOT display it.
             */
            reply: cleanReply,

            schemes: selectedSources.map(
                (source) =>
                    mapBackendScheme(
                        source,
                        cleanReply
                    )
            ),
        };
    }

    if (cleanReply) {
        return {
            type: "clarification",

            title: "Sahay AI",

            subtitle: cleanAIText(cleanReply),

            reply: cleanReply,

            suggestions: ALL_SUGGESTIONS,
        };
    }

    return {
        type: "clarification",

        title: "Tell me a little more",

        subtitle:
            "Tell me whether you are a student, farmer, worker, senior citizen, or looking for financial assistance.",

        suggestions: ALL_SUGGESTIONS,
    };
}