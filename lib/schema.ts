import { pgTable, serial, text, varchar, timestamp, bigint } from "drizzle-orm/pg-core";

export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  file_name: varchar("file_name", { length: 255 }).notNull(),
  url: text("url").notNull().unique(),
  content_type: varchar("content_type", { length: 50 }),
  size_bytes: bigint("size_bytes", { mode: "number" }),
  created_at: timestamp("created_at").defaultNow(),
});