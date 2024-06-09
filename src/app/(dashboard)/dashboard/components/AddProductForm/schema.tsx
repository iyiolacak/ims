import { z } from 'zod';
import { Id } from '@/../convex/_generated/dataModel';

export const addCategorySchema = z.object({
  categoryName: z.string().min(1, { message: "Category name is required" }),
  emoji: z.string().min(0).default(""),
  userId: z.string().min(1, { message: "User ID cannot be found"})
});

export type CategoryFormData = z.infer<typeof addCategorySchema> & { userId: Id<"users">};
