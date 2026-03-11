import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData, defaultSession } from "./session";

export async function getSession(): Promise<SessionData> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  
  if (!session.isLoggedIn) {
    return defaultSession;
  }
  
  return session;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session.isLoggedIn === true;
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return session.isLoggedIn === true && 
    (session.role === "ADMIN" || session.role === "SUPER_ADMIN");
}
