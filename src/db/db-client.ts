import { Pool } from 'pg';
import { PostgresDialect, Kysely } from 'kysely';
import { DB } from './types/type';


const db = new PostgresDialect({
    pool: new Pool({
        connectionString: process.env.DB_URL,
        max: 10
    })
})

export const dbClient = new Kysely<DB>({ dialect: db });