import { pgTable, serial, text, varchar, integer, timestamp, bigint, primaryKey } from "drizzle-orm/pg-core";

export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  file_name: varchar("file_name", { length: 255 }).notNull(),
  url: text("url").notNull().unique(),
  content_type: varchar("content_type", { length: 50 }),
  // 'bigint' with 'mode: number' is perfect for file sizes in bytes
  size_bytes: bigint("size_bytes", { mode: "number" }),
  // Category for which page this media belongs to
  category: varchar("category", { length: 50 }).notNull().default("uncategorized"),
  // Add 'withTimezone: true' to match your 'TIMESTAMP WITH TIME ZONE' SQL
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("admin"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});