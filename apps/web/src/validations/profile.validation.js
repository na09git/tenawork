import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  bio: z.string().max(500).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});
