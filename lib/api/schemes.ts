import { apiClient } from "./client";

import type { Scheme } from "@/types/scheme";

type SchemesResponse = {
    success: boolean;
    count: number;
    data: Scheme[];
};

type SchemeResponse = {
    success: boolean;
    data: Scheme;
};

export async function getSchemes(): Promise<Scheme[]> {
    const response = await apiClient<SchemesResponse>("/schemes");

    return response.data;
}

export async function getScheme(
    id: number | string
): Promise<Scheme> {
    const response = await apiClient<SchemeResponse>(
        `/schemes/${id}`
    );

    return response.data;
}