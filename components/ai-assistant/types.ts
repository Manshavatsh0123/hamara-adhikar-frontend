export type Scheme = {
    id: number;
    scheme_code: string;
    scheme_name: string;
    department: string | null;
    state: string | null;
    description: string | null;
};

export type SchemeWithEligibility = Scheme & {
    min_age: number | null;
    max_age: number | null;
    gender: string | null;
    eligible_states: string | null;
    occupation: string | null;
    income_limit: number | null;
    caste: string | null;
    disability: string | null;
};

export type SchemeEligibilityRule = {
    id: number;
    scheme_id: number;

    min_age: number | null;
    max_age: number | null;
    gender: string | null;
    state: string | null;
    occupation: string | null;
    caste: string | null;
    income_limit: number | null;
    disability: string | null;

    scheme_name: string;
    department: string | null;
    scheme_state: string | null;
    description: string | null;
};

export type SchemeApplicationInfo = {
    id: number;
    scheme_name: string;
    application_process: string | null;
    documents_required: string | null;
    official_source: string | null;
};

export type SchemeStats = {
    totalSchemes: number;
    totalStates: number;
    totalDepartments: number;
    totalCategories?: number;
};

/* =========================================================
   AI ASSISTANT UI TYPES
========================================================= */

export type AssistantScheme = {
    id: string;
    name: string;
    department: string;
    state: string;
    description: string;
    rank?: number;

    benefits: string[];
    eligibility: string[];
};

export type AssistantResponseType =
    | "schemes"
    | "clarification"
    | "error";

export type AssistantResponse = {
    type: AssistantResponseType;

    title: string;

    subtitle: string;

    /**
     * We keep reply available internally if needed,
     * but the UI will NOT render the raw reply
     * when scheme cards are available.
     */
    reply?: string;

    schemes?: AssistantScheme[];

    suggestions?: string[];
};

export type Message = {
    id: number;

    role: "user" | "assistant";

    text?: string;

    time: string;

    response?: AssistantResponse;
};