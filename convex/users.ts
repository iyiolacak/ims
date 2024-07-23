import { internalMutation, query, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
      externalId: data.id,  // Use the sub claim for user ID
      firstName: data.first_name ?? undefined,
      lastName: data.last_name ?? undefined,
      username: data.username ?? undefined,
      imageUrl: data.image_url ?? undefined,
      primaryEmailAddressId: data.primary_email_address_id ?? undefined,
      primaryPhoneNumberId: data.primary_phone_number_id ?? undefined,
      emailAddresses: data.email_addresses.map(email => ({
        id: email.id,
        emailAddress: email.email_address
      })),
      phoneNumbers: data.phone_numbers.map(phone => ({
        id: phone.id,
        phoneNumber: phone.phone_number
      })),
      createdAt: data.created_at ?? Date.now(),
      updatedAt: data.updated_at ?? Date.now(),
    };
    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      console.log(data)
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

// {
//   backup_code_enabled: false,
//   banned: false,
//   create_organization_enabled: true,
//   created_at: 1720971879142,
//   delete_self_enabled: true,
//   email_addresses: [
//     {
//       created_at: 1720971864325,
//       email_address: 'terathefire@hotmail.com',
//       id: 'idn_2jF9GqJBXSmDBwsvGIcSNBoxUgj',
//       linked_to: [],
//       object: 'email_address',
//       reserved: false,
//       updated_at: 1720971879160,
//       verification: {
//         attempts: 1,
//         expire_at: 1720972464895,
//         status: 'verified',
//         strategy: 'email_code'
//       }
//     }
//   ],
//   external_accounts: [],
//   external_id: null,
//   first_name: null,
//   has_image: false,
//   id: 'user_2jF9IezLpMG53gWcDJfDep8KJ1K',
//   image_url: 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZmp3Qk9uME93dWRVSjAyM24zc0ZQdXdyTjEiLCJyaWQiOiJ1c2VyXzJqRjlJZXpMcE1HNTNnV2NESmZEZXA4S0oxSyJ9',
//   last_active_at: 1720971879141,
//   last_name: null,
//   last_sign_in_at: 1720971879147,
//   locked: false,
//   lockout_expires_in_seconds: null,
//   mfa_disabled_at: null,
//   mfa_enabled_at: null,
//   object: 'user',
//   passkeys: [],
//   password_enabled: true,
//   phone_numbers: [],
//   primary_email_address_id: 'idn_2jF9GqJBXSmDBwsvGIcSNBoxUgj',
//   primary_phone_number_id: null,
//   primary_web3_wallet_id: null,
//   private_metadata: {},
//   profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
//   public_metadata: {},
//   saml_accounts: [],
//   totp_enabled: false,
//   two_factor_enabled: false,
//   unsafe_metadata: {},
//   updated_at: 1720972697734,
//   username: null,
//   verification_attempts_remaining: 100,
//   web3_wallets: []
// }



export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
    .unique();
}