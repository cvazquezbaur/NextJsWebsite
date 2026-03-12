import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { hash } from "bcryptjs";
import * as schema from "../lib/schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin";

  if (!email || !password) {
    console.error("Usage: npx tsx scripts/seed-user.ts <email> <password> [name]");
    process.exit(1);
  }

  const password_hash = await hash(password, 12);

  await db.insert(schema.users).values({
    name,
    email,
    password_hash,
    role: "admin",
  });

  console.log(`User created: ${email}`);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
