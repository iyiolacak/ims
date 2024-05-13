import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    userId: v.id("users"),
  }).index("byUserId", ["userId"]),
  ingredients: defineTable({
    name: v.string(),
    quantity: v.number(),
    supplierId: v.optional(v.string()),
    unit: v.string(),
    costPerUnit: v.optional(v.number()),

  }),
  users: defineTable({
    name: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
  }).index("byExternalId", ["externalId"]),
});