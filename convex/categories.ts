import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addCategory = mutation({
  args: { categoryName: v.string(), emoji: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const newCategory = {
      categoryName: args.categoryName,
      emoji: args.emoji || "",
      userId: args.userId,
    };
    const newCategoryId = await ctx.db.insert("categories", newCategory);
    return newCategoryId;
  },
});

export const removeCategory = mutation({
  args: { categoryId: v.id("categories"), userId: v.id("users") },
  handler: async (ctx, args) => {
    // Fetch the category from the database
    const category = await ctx.db.get(args.categoryId);

    // Check if the category exists
    if (!category) throw new Error("Category not found");
    console.log("category not found")

    // Check if the user is the owner of the category
    if (category.userId !== args.userId) {
      throw new Error("You are not authorized to delete this category")
    console.log("not authorized")
    }

    // If the checks pass, delete the category
    await ctx.db.delete(args.categoryId);
    console.log("success")
  },
});


export const getCategoriesByUser = query({
  args: { userId: v.id("users")},
  handler: async (ctx, args) => {
    const categories = await ctx.db
      .query("categories")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .collect();
    return categories;
  },
});


