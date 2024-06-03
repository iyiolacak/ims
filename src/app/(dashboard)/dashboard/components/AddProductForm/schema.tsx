import { z } from 'zod';

export const addCategorySchema = z.object({
  categoryName: z.string().min(1, { message: "Category name is required" }),
  emoji: z.string().optional(),
  userId: z.string().min(1, { message: "User ID cannot be found"})
});

export type CategoryFormValues = z.infer<typeof addCategorySchema>;
