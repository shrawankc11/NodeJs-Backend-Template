import { Roles } from "./db/types/enum";
import { User } from "./db/types/type";

export interface iCreateUser extends Omit<User, 'id' | 'passwordHash'> {
    password: string
    name: string
}

export interface iCreateBusReport {

}

export type TokenPayload = {
    id: number,
    email: string,
    role: Roles
}
