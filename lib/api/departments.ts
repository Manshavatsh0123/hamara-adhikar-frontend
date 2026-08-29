import { apiClient } from "./client";

import type { Scheme } from "@/types/scheme";

export type Department = {
    department: string;
};

export async function getDepartments(): Promise<Department[]> {
    return apiClient<Department[]>("/departments");
}

export async function getSchemesByDepartment(
    department: string
): Promise<Scheme[]> {
    return apiClient<Scheme[]>(
        `/departments/${encodeURIComponent(department)}`
    );
}