import mongoose from "mongoose";

const padSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    contentMarkdown: { type: String, default: "" },
    contentHtmlCache: { type: String, default: "" },
    passwordHash: { type: String, default: null },
    lastAccessedAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true },
);

padSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
padSchema.index({ slug: 1 }, { unique: true });

export const Pad = mongoose.models.Pad || mongoose.model("Pad", padSchema);
