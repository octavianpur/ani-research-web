export interface User {
    id: number;
    role: string;
    roleId: number;
    displayName: string;
    email: string;
    provider: String;
    created: Date;
    updated: Date;
    lastLogin: Date;
}