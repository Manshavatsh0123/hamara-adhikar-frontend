import { apiClient } from "./client";

import type { SchemeApplicationInfo } from "@/types/scheme";

export async function getApplicationInfo(
    schemeId: number | string
): Promise<SchemeApplicationInfo> {
    return apiClient<SchemeApplicationInfo>(
        `/schemes/${schemeId}/application`
    );
}