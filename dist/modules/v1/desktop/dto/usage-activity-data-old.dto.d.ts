export declare class UsageActivityDataDTO {
    readonly dataId: string;
    readonly systemTimeUtc: string;
    readonly projectId: number;
    readonly taskId: number;
    readonly taskNote: string;
    readonly breakInSeconds: number;
    readonly clicksCount: number;
    readonly fakeActivitiesCount: number;
    readonly keysCount: number;
    readonly movementsCount: number;
    readonly activityPerSecond: {
        buttonClicks: number[];
        fakeActivities: number[];
        keystrokes: number[];
        mouseMovements: number[];
    };
    readonly mode: {
        name: string;
        start: number;
        end: number;
    };
    readonly appUsage: {
        ageOfData: number;
        app: string;
        start: number;
        end: number;
        title: string;
        url: string;
        keystroke: string;
    }[];
}
