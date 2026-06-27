import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  message: z.string().min(11).max(5000),
  website: z.string().max(0).optional(),
});
