import { pgTable, serial, text, varchar, integer, timestamp, bigint, primaryKey } from "drizzle-orm/pg-core";

export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  file_name: varchar("file_name", { length: 255 }).notNull(),
  url: text("url").notNull().unique(),
  content_type: varchar("content_type", { length: 50 }),
  // 'bigint' with 'mode: number' is perfect for file sizes in bytes
  size_bytes: bigint("size_bytes", { mode: "number" }),
  // Add 'withTimezone: true' to match your 'TIMESTAMP WITH TIME ZONE' SQL
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
}));