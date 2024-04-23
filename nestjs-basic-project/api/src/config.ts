import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.develop.env") });

interface Config {
  dbType: "postgres";
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  typeormSynchronize: boolean;
  appPort: number;
  jwtSecret: string;
  jwtExpirationTime: number;
}

const config: Config = {
  dbType: "postgres",
  dbHost: process.env.DB_HOST || 'db', 
  dbPort: parseInt(process.env.DB_PORT || '5432', 10), 
  dbUsername: process.env.DB_USERNAME || 'user',
  dbPassword: process.env.DB_PASSWORD || 'password', 
  dbName: process.env.DB_NAME || 'dbname', 
  typeormSynchronize: process.env.TYPEORM_SYNCHRONIZE === "true" || true, 
  appPort: parseInt(process.env.APP_PORT || '3000', 10), 
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', 
  jwtExpirationTime: parseInt(process.env.JWT_EXPIRATION_TIME || '3600', 10),
};

export default config;
