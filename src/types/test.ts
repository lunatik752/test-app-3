type Type = "Classic" | "MVT" | "Server-side";

type Status = "Online" | "Paused" | "Draft" | "Stopped";

export type TestType = {
    id: number;
    name: string;
    type: Type;
    status: Status;
    site: string;
    markerColor: string;
}