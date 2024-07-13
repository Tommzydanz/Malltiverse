import { API_URL, CURRENT_ENV } from "@env";
import Constants from "expo-constants";
import * as Updates from "expo-updates";

// console.log(process.env, API_URL, CURRENT_ENV);

const stillTestingArray = ["development", "testing"];

export const currentEnvironment = CURRENT_ENV ?? "development";

export const releaseChannel = Updates?.channel ?? currentEnvironment;

export const productionOnly =
  process.env.NODE_ENV === "production" &&
  !stillTestingArray.includes(releaseChannel);

export const isDevelopmentRelease = Boolean(releaseChannel === "development");

export const isInExpoGo = Boolean(Constants.appOwnership === "expo");

export const isInDevelopment = __DEV__;

export const app_storage = "@mainapp.local.storage";

export const app_theme_color_storage = "@mainapp.theme.local.storage";

// live url as default
export const baseUrl =
  process.env.API_URL ?? API_URL ?? "https://api-dev.shakohub.com/v1";

export const appId = process.env.APP_ID ?? "appId";

export const apiKey = process.env.API_KEY ?? "Apikey";

export const organizationId = process.env.ORG_ID ?? "organization_id";

export const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// console.log(releaseChannel)
