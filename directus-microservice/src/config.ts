
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

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
  dbHost: process.env.DB_HOST || '172.26.0.2', 
  dbPort: parseInt(process.env.DB_PORT || '5432', 10), 
  dbUsername: process.env.DB_USERNAME || 'directus',
  dbPassword: process.env.DB_PASSWORD || 'directus', 
  dbName: process.env.DB_NAME || 'directus', 
  typeormSynchronize: process.env.TYPEORM_SYNCHRONIZE === "true" || true, 
  appPort: parseInt(process.env.APP_PORT || '3000', 10), 
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret', 
  jwtExpirationTime: parseInt(process.env.JWT_EXPIRATION_TIME || '3600', 10),
};

export default config;



