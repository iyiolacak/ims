import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    userId: v.id("users"),
  }).index("byUserId", ["userId"]),
  categories: defineTable({
    categoryName: v.string(),
    emoji: v.optional(v.string()),
    userId: v.id('users'), // This creates a relation with the users table
  }).index("byUserId", ["userId"]), // This creates an index on the userId field
  users: defineTable({
    name: v.string(),
    // this the Clerk ID, stored in the subject JWT field
    externalId: v.string(),
  }).index("byExternalId", ["externalId"]),
});