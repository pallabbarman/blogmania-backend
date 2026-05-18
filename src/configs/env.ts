import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 8000,
    databaseUrl: process.env.DATABASE_URL,
    bcryptSalt: process.env.BCRYPT_SALT,
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpiresIn: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
        refreshExpiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
    },
};
