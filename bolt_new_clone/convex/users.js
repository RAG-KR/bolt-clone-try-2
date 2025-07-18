import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    //if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    
    if (user.length > 0) {
      return user[0];
    }

    //if not then add new user
    if (user.length === 0) {
    const result = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      picture: args.picture,
      uid: args.uid,
      token: 0  // Start at 0 for cumulative token counting
    });
    
    return await ctx.db.get(result);
  }
}
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return result;
  },
});

// 🛡️ IMPROVED: UpdateToken for cumulative usage tracking
export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    // Basic validation to prevent NaN/invalid values
    if (isNaN(args.token) || !isFinite(args.token)) {
      throw new Error(`Invalid token value: ${args.token}`);
    }
    
    const result = await ctx.db.patch(args.userId, {
      token: args.token,
    });
    return result;
  },
});