import { config } from "dotenv";
config()

function getEnv(envKey: string){
    return process.env[envKey] ?? undefined
}

function getString(envKey: string): string{
    const val = getEnv(envKey) || ''
    return val
}

export const envConfig = {
    DB_URI: getString('DB_URI'),
    JWT_SECRET: getString('JWT_SECRET'),
    MAILPASS: getString('MAILPASS'),
    MAILADDRESS: getString('MAILADDRESS'),
    CLOUDINARY_CLOUD_NAME: getString('CLOUDINARY_CLOUD_NAME'),
    CLOUDINARY_API_KEY: getString('CLOUDINARY_API_KEY'),
    CLOUDINARY_API_SECRET: getString('CLOUDINARY_API_SECRET')
}
