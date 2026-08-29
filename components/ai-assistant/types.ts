export type Scheme = {
    id: string;
    name: string;
    department: string;
    description: string;
    benefits: string[];
    whoCanApply: string[];
    categories: string[];
};

export type AssistantResponseType =
    | "schemes"
    | "clarification"
    | "out-of-scope";

export type AssistantResponse = {
    type: AssistantResponseType;
    title: string;
    subtitle: string;
    schemes?: Scheme[];
    suggestions?: string[];
};

export type Message = {
    id: number;
    role: "user" | "assistant";
    text?: string;
    time: string;
    response?: AssistantResponse;
};
