import { apiClient } from "./client";

import type { SchemeEligibilityRule } from "@/types/scheme";

export async function getEligibilityRule(
    schemeId: number | string
): Promise<SchemeEligibilityRule> {
    return apiClient<SchemeEligibilityRule>(
        `/eligibility/${schemeId}`
    );
}