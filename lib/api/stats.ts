import { apiClient } from "./client";

export type StatsData = {
    totalSchemes: number;
    totalStates: number;
    totalDepartments: number;
};

type StatsResponse = {
    success: boolean;
    data: StatsData;
};

export async function getStats(): Promise<StatsData> {
    const response = await apiClient<StatsResponse>("/stats");

    return response.data;
}