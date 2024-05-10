import { TypeOrmModule } from "@nestjs/typeorm";
export const CONFIG_DATABASE = () =>
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'user',
        password: 'password',
        database: 'dbname'
    })