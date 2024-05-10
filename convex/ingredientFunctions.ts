import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addIngredientToInventory = mutation({
    args: { 
        name: v.string(),
        quantity: v.number(),
        unit: v.string(),
        supplierId: v.optional(v.string()),
        costPerUnit: v.number(),

    },
    handler: async (ctx, args) => {
        const newIngredient = {
            name: args.name,
            quantity: args.quantity,
            unit: args.unit,
            supplierId: args.supplierId,
            costPerUnit: args.costPerUnit
        };
        const newIngredientId = await ctx.db.insert("ingredients", newIngredient);
        return newIngredientId;
    }
})