import { dbClient } from "../db/db-client";
import { iCreateUser } from "../types";
import * as userUtil from './user.utils';

export async function createUser(data: iCreateUser) {

    const passwordHash = await userUtil.hashString(data.password);

    return await dbClient
        .insertInto('User')
        .values({ email: data.email, passwordHash, name: data.name, role: data.role })
        .returning('User.id')
        .executeTakeFirst();
}

export async function getAllUsers() {
    return await dbClient
        .selectFrom('User')
        .select(['User.email', 'User.id', 'User.name'])
        .execute()
}

export async function getUserByEmail(email: string) {
    return await dbClient
        .selectFrom('User')
        .selectAll()
        .where("User.email", '=', email)
        .executeTakeFirst()
}

export function comparePassword(password: string, passwordHash: string) {
    return userUtil.comparePassword(password, passwordHash);
}