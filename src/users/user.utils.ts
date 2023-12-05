import * as bcrypt from 'bcrypt';

export async function hashString(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
}