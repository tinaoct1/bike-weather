import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({path: ".env"});

export const ENVIRONMENT    = process.env.APP_ENV || "dev";
export const IS_PRODUCTION  = ENVIRONMENT === "production";
export const API_TOKEN = process.env.API_TOKEN || "dev-123";
export const OPEN_WEATHER_MAP_APIKEY = process.env.OPEN_WEATHER_MAP_APIKEY
    || "f221911ecaf99e13c117da4eb5794fb6";
export const API_HOST = ENVIRONMENT === "production" ? "https://bike-weather.herokuapp.com/api/v1":
    "http://localhost:3000/api/v1"
export const DB             = {
    USER    : process.env.DB_USER ||  "admin",
    PASSWORD: process.env.DB_USER_PWD || "C5bRGWNMy9yz89Rx",
    HOST    : process.env.DB_HOST || "cluster0.u4wgj.gcp.mongodb.net",
    NAME    : process.env.DB_NAME || "indego",
    PORT    : parseInt(process.env.DB_PORT) || 27017,
}