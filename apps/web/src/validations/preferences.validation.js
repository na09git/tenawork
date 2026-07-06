import { z } from "zod";

export const preferencesSchema = z.object({
  location: z.string().optional(),
  workType: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  skills: z.array(z.string()).optional(),
});
