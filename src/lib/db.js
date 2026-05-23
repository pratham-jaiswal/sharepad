import mongoose from "mongoose";
import { requireEnv } from "@/lib/env";

const globalForMongoose = globalThis;

export async function connectDb() {
  if (globalForMongoose.__mongooseConn) return globalForMongoose.__mongooseConn;

  const mongoUrl = requireEnv("MONGODB_URL");
  globalForMongoose.__mongooseConn = mongoose.connect(mongoUrl, { dbName: "sharepadDB" });
  return globalForMongoose.__mongooseConn;
}
