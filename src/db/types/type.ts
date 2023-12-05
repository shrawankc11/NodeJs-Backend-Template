import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Roles } from "./enum";

export type User = {
    id: Generated<number>;
    name: string;
    email: string;
    passwordHash: string;
    role: Roles;
};
export type DB = {
    User: User;
};
