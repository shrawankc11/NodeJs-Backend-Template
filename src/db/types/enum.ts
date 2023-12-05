export const Roles = {
    admin: "admin",
    staff: "staff"
} as const;
export type Roles = (typeof Roles)[keyof typeof Roles];
