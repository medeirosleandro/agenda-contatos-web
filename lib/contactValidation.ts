import { z } from "zod";

export const contactSchema = z.object({
  id: z.string().uuid("ID must be a valid UUID"),
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Phone must be 10 or 11 digits")
    .optional()
    .or(z.literal("")),
  img: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;

export const validateContact = (data: unknown) => {
  return contactSchema.safeParse(data);
};
