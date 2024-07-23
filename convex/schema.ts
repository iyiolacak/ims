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
    userId: v.id("users"), // This creates a relation with the users table
  }).index("byUserId", ["userId"]), // This creates an index on the userId field
  
  users: defineTable({
    externalId: v.string(),
    username: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    primaryEmailAddressId: v.optional(v.string()),
    primaryPhoneNumberId: v.optional(v.string()),
    emailAddresses: v.optional(
      v.array(
        v.object({
          id: v.string(),
          emailAddress: v.string(),
        }),
      ),
    ),
    phoneNumbers: v.optional(
      v.array(
        v.object({
          id: v.string(),
          phoneNumber: v.string(),
        }),
      ),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("byExternalId", ["externalId"]),
});
