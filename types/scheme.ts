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