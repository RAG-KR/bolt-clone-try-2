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
    const result = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      picture: args.picture,
      uid: args.uid,
    });
    
    return await ctx.db.get(result);
  },
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