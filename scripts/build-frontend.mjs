import { spawnSync } from "node:child_process";

const env = { ...process.env };

if (!env.DATABASE_URL) {
  env.DATABASE_URL = "postgresql://frontend:frontend@127.0.0.1:5432/frontend_only";
}

if (!env.SESSION_SECRET) {
  env.SESSION_SECRET = "frontend-only-session-secret-with-32-chars";
}

if (!env.NEXT_PUBLIC_SITE_URL && env.VERCEL_URL) {
  env.NEXT_PUBLIC_SITE_URL = `https://${env.VERCEL_URL}`;
}

const commands = [
  ["pnpm", ["prisma", "generate"]],
  ["pnpm", ["next", "build"]],
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
