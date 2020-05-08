import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://sitekoName.com"
  : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const APP_DEVELOPMENT = publicRuntimeConfig.APP_DEVELOPMENT;
export const TOKEN = publicRuntimeConfig.TOKEN;
export const COOKIE = publicRuntimeConfig.USER;
export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;
export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;
