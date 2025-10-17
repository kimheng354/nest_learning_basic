import { Module, Global } from '@nestjs/common';
import { PG_CONNECTION } from './constants';
import { Pool } from 'pg';

@Global()
@Module({
    providers: [
        {
            provide: PG_CONNECTION,
            useFactory: async () => {
                const pool = new Pool({
                    host: process.env.PGHOST || 'localhost',
                    port: parseInt(process.env.PGPORT || '5432', 10),
                    database: process.env.PGDATABASE || 'postgres',
                    user: process.env.PGUSER || 'postgres',
                    password: process.env.PGPASSWORD || '',
                    max: 10,
                    ssl: {
                        rejectUnauthorized: false, // required for Neon
                    },
                });

                return pool;
            },
        },
    ],
    exports: [PG_CONNECTION],
})
export class DatabaseModule { }
