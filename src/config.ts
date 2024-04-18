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
    DB_URI: getString('DB_URI')
}
