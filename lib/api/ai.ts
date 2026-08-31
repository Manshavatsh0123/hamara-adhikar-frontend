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

export type AIChatData = {
    reply: string;
    sources: AISchemeResult[];
};

export type AIChatResponse = {
    success: boolean;
    data: AIChatData;
};

export async function sendAIMessage(
    data: AIChatRequest
): Promise<AIChatResponse> {
    return apiClient<AIChatResponse>("/ai/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}