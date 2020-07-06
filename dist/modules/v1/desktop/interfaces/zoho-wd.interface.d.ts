export interface IAXIOSHEADERS {
    Authorization: string;
}
export interface IFETCHOPTIONS {
    id: string;
    url: string;
}
export interface IAXIOSBODY {
    data: {
        attributes: {
            name: string;
            parent_id: string;
            is_public_within_team?: boolean;
            description?: string;
        };
        type: string;
    };
}
