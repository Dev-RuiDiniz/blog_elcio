import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaMock(): PrismaClient {
  const modelDelegate = new Proxy(
    {},
    {
      get: (_, method) => {
        if (typeof method !== "string") return undefined;
        return async () => {
          if (method === "findMany" || method === "groupBy") return [];
          if (method === "count") return 0;
          if (method === "aggregate") return {};
          return null;
        };
      },
    }
  );

  const mock = new Proxy(
    {},
    {
      get: (_, prop) => {
        if (typeof prop !== "string") return undefined;

        if (prop === "$connect" || prop === "$disconnect") return async () => {};
        if (prop === "$transaction") {
          return async (arg: unknown) => {
            if (Array.isArray(arg)) return Promise.all(arg);
            if (typeof arg === "function") return arg(mock);
            return [];
          };
        }

        return modelDelegate;
      },
    }
  );

  return mock as PrismaClient;
}

function createPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  if (!process.env.DATABASE_URL) {
    console.warn("[prisma] DATABASE_URL ausente. Usando fallback sem banco.");
    return createPrismaMock();
  }

  try {
    return new PrismaClient();
  } catch (error) {
    console.warn("[prisma] Prisma Client indisponivel. Usando fallback de desenvolvimento.", error);
    return createPrismaMock();
  }
}

export const prisma = createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
