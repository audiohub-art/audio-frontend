"use server"
import { createPublicApi, createPrivateApi } from "@/lib/api"
import { signIn, auth } from "./auth";

export async function register(name: string, password: string) {
  try {
    const api = await createPublicApi();
    await api.post("/auth/register", { name, password });
    return true;
  } catch {
    return false
  }
}

export async function login(name: string, password: string) {
  try {
    const api = await createPublicApi();
    const { data } = await api.post("/auth/login", { name, password });
    await signIn("credentials", {
      id: data.user.id,
      name: data.user.name,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      accessTokenExpires: Date.now() + data.expiresIn * 1000,
      redirect: false
    })
    return true
  } catch {
    return false
  }
}

export async function getMe() {
  try {
    const api = await createPrivateApi();
    const data = await api.get("/users/me");

    return { data: data.data, error: null }
  } catch (error) {
    console.log("error : ", error)
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to get User",
    }
  }
}

export async function getUser() {
  const session = await auth();
  if (!session?.user) return undefined;
  const user = session.user;
  return user
}
