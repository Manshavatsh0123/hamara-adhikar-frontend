import { getSchemes } from "@/lib/api/schemes";

export default async function ApiTestPage() {
    try {
        const schemes = await getSchemes();

        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold text-green-600">
                    API Connection Working
                </h1>

                <pre className="mt-6 overflow-auto rounded-lg bg-gray-100 p-4">
                    {JSON.stringify(schemes, null, 2)}
                </pre>
            </div>
        );
    } catch (error) {
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold text-red-600">
                    API Connection Failed
                </h1>

                <pre className="mt-6">
                    {error instanceof Error
                        ? error.message
                        : "Unknown error"}
                </pre>
            </div>
        );
    }
}