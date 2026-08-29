export type SchemeFAQ = {
    question: string;
    answer: string;
};

export type SchemeData = {
    id: string;
    name: string;
    department: string;
    description: string;

    categories?: string[];

    overview?: {
        about?: string;
        highlights?: {
            label: string;
            value: string;
        }[];
    };

    benefits?: string[];

    eligibility?: {
        title?: string;
        description?: string;
        criteria?: string[];
    };

    documents?: string[];

    howToApply?: {
        step: number;
        title: string;
        description: string;
    }[];

    faqs?: SchemeFAQ[];

    officialUrl?: string;
};