import { apiClient } from "./client";

export type RecommendationRequest = {
    [key: string]: unknown;
};

export type RecommendationResponse = {
    [key: string]: unknown;
};

export async function getRecommendations(
    data: RecommendationRequest
): Promise<RecommendationResponse> {
    return apiClient<RecommendationResponse>("/recommendations", {
        method: "POST",
        body: JSON.stringify(data),
    });
}