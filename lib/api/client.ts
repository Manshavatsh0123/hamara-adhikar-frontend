const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

if (!API_BASE_URL) {
    throw new Error(
        "NEXT_PUBLIC_API_URL is not configured. Please add it to your environment variables."
    );
}

const API_URL = `${API_BASE_URL}/api`;

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let message = `API request failed with status ${response.status}`;

        try {
            const errorData = await response.json();

            if (errorData?.message) {
                message = errorData.message;
            }
        } catch {
            // Keep default error message
        }

        throw new Error(message);
    }

    return response.json();
}

