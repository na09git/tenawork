import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(20, "Description is too short"),
  location: z.string().min(2, "Location is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  salaryMin: z.number().min(0, "Minimum salary is required"),
  salaryMax: z.number().min(0, "Maximum salary is required"),
});
