export const env = {
  MONGODB_URL: process.env.MONGODB_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  APP_BASE_URL: process.env.APP_BASE_URL || "http://localhost:3000",
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || "",
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
};

export function requireEnv(name) {
  const value = env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
