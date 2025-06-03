import Redis from "ioredis"
import dotenv from "dotenv"

dotenv.config()


export const redis = new Redis("rediss://default:AVHkAAIjcDFjYzJlOGFmNjYyNTg0NDBmYTdhMGY2NGMwNjdmZGZiMHAxMA@crack-snapper-20964.upstash.io:6379");
