import { z } from "zod";

export const slugSchema = z
  .string()
  .trim()
  .min(6)
  .max(64)
  .regex(/^[a-zA-Z0-9-_]+$/, "Only letters, numbers, - and _ are allowed.")
  .transform((value) => value.toLowerCase());

export const createPadSchema = z.object({
  slug: slugSchema,
  password: z.string().min(6).max(128).optional().or(z.literal("")),
});

export const unlockPadSchema = z.object({
  password: z.string().min(1).max(128),
});

export const updatePadSchema = z.object({
  markdown: z.string().max(200000).optional(),
  encryptedPayload: z
    .object({
      version: z.literal(1),
      kdf: z.object({
        hash: z.literal("SHA-256"),
        iterations: z.number().int().min(100000).max(2000000),
      }),
      salt: z.string().min(1),
      iv: z.string().min(1),
      ciphertext: z.string().min(1),
    })
    .optional(),
  revision: z.number().int().nonnegative().default(0),
});
