export type SchemeDetail = {
    id: string;
    name: string;
    department: string;
    description: string;
    verified: boolean;

    categories: string[];

    highlights: {
        label: string;
        value: string;
    }[];

    about: string[];
    benefits: string[];
    eligibility: string[];
    documents: string[];
    whoCanApply: string[];
    applicableFor: string[];

    howToApply: {
        step: number;
        title: string;
        description: string;
    }[];

    faqs: {
        question: string;
        answer: string;
    }[];

    importantNote?: string;
    applicationUrl?: string;
};

export const SCHEME_DETAILS: Record<string, SchemeDetail> = {
    "student-credit-card": {
        id: "student-credit-card",
        name: "Bihar Student Credit Card Scheme",
        department: "Department of Education, Government of Bihar",
        description:
            "Provides financial assistance in the form of education loan up to ₹4 lakh to students for higher education in Bihar at low interest.",
        verified: true,

        categories: ["Education", "Financial Support"],

        highlights: [
            { label: "Loan Amount", value: "Up to ₹4 Lakh" },
            { label: "Interest Rate", value: "Low Interest" },
            { label: "Beneficiaries", value: "Students of Bihar" },
        ],

        about: [
            "Bihar Student Credit Card Scheme is an initiative by the Government of Bihar to provide education loans to students for pursuing higher education in India.",
            "The scheme aims to support meritorious and economically weaker students by providing easy access to credit with minimal documentation and low interest.",
        ],

        benefits: [
            "Loan up to ₹4 Lakh for higher education",
            "Low interest rate to reduce financial burden",
            "Simple and easy application process",
            "Covers tuition fees, books, accommodation and other expenses",
            "Encourages students to pursue professional and technical courses",
        ],

        // Replace/expand these with the exact PDF/official notification
        // when you connect the real scheme source.
        eligibility: [
            "Applicant must be a permanent resident of Bihar.",
            "Applicant must have passed 12th or equivalent examination.",
            "Admission in a recognized higher education institution is required.",
            "Family annual income criteria as per government norms.",
            "Other conditions may apply as per scheme guidelines.",
        ],

        documents: [
            "Aadhaar Card",
            "Income Certificate",
            "12th Marksheet / Certificate",
            "Bank Account Details",
            "Admission Letter",
            "Passport Size Photo",
        ],

        whoCanApply: ["Students", "Bihar Residents"],

        applicableFor: [
            "Higher Education",
            "Professional & Technical Courses",
        ],

        howToApply: [
            {
                step: 1,
                title: "Check eligibility",
                description:
                    "Review the official eligibility requirements before starting the application.",
            },
            {
                step: 2,
                title: "Prepare documents",
                description:
                    "Keep the required identity, education, income and admission documents ready.",
            },
            {
                step: 3,
                title: "Submit application",
                description:
                    "Complete the application through the applicable official Bihar government process.",
            },
            {
                step: 4,
                title: "Verification",
                description:
                    "The submitted information and documents are verified by the concerned authorities.",
            },
        ],

        faqs: [
            {
                question: "What is the maximum loan amount?",
                answer:
                    "The supplied design reference shows a loan amount of up to ₹4 lakh.",
            },
            {
                question: "Who can apply?",
                answer:
                    "The supplied design reference lists students and Bihar residents under who can apply.",
            },
        ],

        importantNote:
            "Loan approval is subject to verification and terms defined by the bank and scheme guidelines. Please refer to the official notification for more details.",
    },

    "pm-kisan": {
        id: "pm-kisan",
        name: "PM-KISAN Samman Nidhi Yojana",
        department: "Department of Agriculture, Government of Bihar",
        description:
            "Financial assistance of ₹6,000 per year to eligible farmer families across India.",
        verified: true,
        categories: ["Agriculture", "Financial Support"],
        highlights: [
            { label: "Financial Support", value: "₹6,000 per year" },
            { label: "Transfer", value: "Direct bank transfer" },
            { label: "Beneficiaries", value: "Eligible farmers" },
        ],
        about: [
            "Detailed scheme information should be populated from the official PM-KISAN source before production.",
        ],
        benefits: [
            "₹6,000 per year",
            "Direct bank transfer",
            "For eligible farmers",
        ],
        eligibility: [
            "Refer to the official scheme notification for complete eligibility conditions.",
        ],
        documents: [
            "Refer to the official application requirements.",
        ],
        whoCanApply: ["Farmers", "Bihar Residents"],
        applicableFor: ["Agriculture"],
        howToApply: [
            {
                step: 1,
                title: "Check eligibility",
                description: "Review the official eligibility requirements.",
            },
            {
                step: 2,
                title: "Apply through the official process",
                description:
                    "Use the official government application route.",
            },
        ],
        faqs: [],
        importantNote:
            "Always verify current eligibility, documents and application instructions with the official department.",
    },

    sinchai: {
        id: "sinchai",
        name: "Mukhyamantri Sinchai Yojana",
        department: "Water Resources Department, Government of Bihar",
        description:
            "Financial assistance for minor irrigation, water conservation and related activities.",
        verified: true,
        categories: ["Agriculture"],
        highlights: [
            { label: "Support", value: "Irrigation assistance" },
            { label: "Focus", value: "Water conservation" },
            { label: "Beneficiaries", value: "Farmers" },
        ],
        about: [
            "Detailed scheme information should be populated from the official Bihar government source before production.",
        ],
        benefits: [
            "Assistance for irrigation",
            "Water resource development",
            "Support for farmers",
        ],
        eligibility: [
            "Refer to the official scheme guidelines for complete eligibility conditions.",
        ],
        documents: [
            "Refer to the official application requirements.",
        ],
        whoCanApply: ["Farmers", "Bihar Residents"],
        applicableFor: ["Agriculture", "Irrigation"],
        howToApply: [
            {
                step: 1,
                title: "Check eligibility",
                description: "Review the official eligibility requirements.",
            },
            {
                step: 2,
                title: "Apply through the official process",
                description:
                    "Use the official government application route.",
            },
        ],
        faqs: [],
        importantNote:
            "Always verify current eligibility, documents and application instructions with the official department.",
    },
};

export function getSchemeDetails(id: string) {
    return SCHEME_DETAILS[id];
}
