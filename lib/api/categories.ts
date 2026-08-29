import { apiClient } from "./client";

export type Category = {
    category: string;
};

type CategoriesResponse = {
    success: boolean;
    count: number;
    data: Category[];
};

export async function getCategories(): Promise<Category[]> {
    const response = await apiClient<CategoriesResponse>("/categories");

    return response.data;
}