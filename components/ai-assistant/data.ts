import type { Scheme } from "./types";

export const SCHEMES: Scheme[] = [
    {
        id: "student-credit-card",
        name: "Bihar Student Credit Card Scheme",
        department: "Department of Education, Government of Bihar",
        description:
            "Provides education loan up to ₹4 lakh to students for higher education in Bihar at low interest.",
        benefits: [
            "Loan up to ₹4 Lakh",
            "Low interest rate",
            "For higher education",
        ],
        whoCanApply: ["Students", "Bihar Residents"],
        categories: ["Education", "Financial Support"],
    },
    {
        id: "pm-kisan",
        name: "PM-KISAN Samman Nidhi Yojana",
        department: "Department of Agriculture, Government of Bihar",
        description:
            "Financial assistance of ₹6,000 per year to eligible farmer families across India.",
        benefits: [
            "₹6,000 per year",
            "Direct bank transfer",
            "For eligible farmers",
        ],
        whoCanApply: ["Farmers", "Bihar Residents"],
        categories: ["Agriculture", "Financial Support"],
    },
    {
        id: "sinchai",
        name: "Mukhyamantri Sinchai Yojana",
        department: "Water Resources Department, Government of Bihar",
        description:
            "Financial assistance for minor irrigation, water conservation and related activities.",
        benefits: [
            "Assistance for irrigation",
            "Water resource development",
            "Support for farmers",
        ],
        whoCanApply: ["Farmers", "Bihar Residents"],
        categories: ["Agriculture"],
    },
    {
        id: "kanya-utthan",
        name: "Mukhyamantri Kanya Utthan Yojana",
        department: "Government of Bihar",
        description:
            "Financial support for eligible girls and women through different stages of education.",
        benefits: [
            "Education support",
            "Financial assistance",
            "Support for eligible beneficiaries",
        ],
        whoCanApply: ["Eligible girls", "Bihar Residents"],
        categories: ["Education", "Financial Support"],
    },
    {
        id: "student-protsahan",
        name: "Bihar Student Protsahan Yojana",
        department: "Government of Bihar",
        description:
            "Financial assistance for eligible students under Bihar government student support programmes.",
        benefits: [
            "Student financial support",
            "Education assistance",
            "For eligible students",
        ],
        whoCanApply: ["Students", "Bihar Residents"],
        categories: ["Education", "Financial Support"],
    },
];

export const ALL_SUGGESTIONS = [
    "I am a farmer from Bihar",
    "I am a student from Bihar",
    "I need financial assistance",
    "I am looking for an education scheme",
];
