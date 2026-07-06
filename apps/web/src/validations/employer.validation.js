import { z } from "zod";

export const employerSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  location: z.string().min(2, "Location is required"),
});
