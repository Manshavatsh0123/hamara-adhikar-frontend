import { apiClient } from "./client";

export type AIChatRequest = {
    message: string;
};

export type AISchemeResult = {
    id: number;
    scheme_name: string;
    department: string | null;
    state: string | null;
    description: string | null;
    rank?: number;
};

export type AIChatResponse = {
    schemes?: AISchemeResult[];
    message?: string;
    [key: string]: unknown;
};

export async function sendAIMessage(
    data: AIChatRequest
): Promise<AIChatResponse> {
    return apiClient<AIChatResponse>("/ai/chat", {
        method: "POST",
        body: JSON.stringify(data),
    });
}