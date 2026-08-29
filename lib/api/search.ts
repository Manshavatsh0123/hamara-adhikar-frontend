import { apiClient } from "./client";

import type { Scheme } from "@/types/scheme";

export async function searchSchemes(
    keyword: string
): Promise<Scheme[]> {
    return apiClient<Scheme[]>(
        `/search?q=${encodeURIComponent(keyword)}`
    );
}

export type SearchSuggestion = {
    scheme_name: string;
};

export async function getSearchSuggestions(
    keyword: string
): Promise<SearchSuggestion[]> {
    return apiClient<SearchSuggestion[]>(
        `/search/suggestions?q=${encodeURIComponent(keyword)}`
    );
}