import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { quotes } from './schema/quotes';
import { underwritingDetails } from './schema/underwritingDetails';
import { databaseConfig } from './databaseConfig';

const pool = new Pool(databaseConfig);

export const schema = {
    quotes,
    underwritingDetails
};

export const dbClient = drizzle(pool, {
    schema,
});
