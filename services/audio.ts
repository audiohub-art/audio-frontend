"use server"
import { createPrivateApi, createPublicApi } from "@/lib/api"
import { ServiceResponse } from "@/types/response";
import type { Post } from "@/types/post";

export async function uploadAudio(formData: FormData): Promise<ServiceResponse<Post>> {
  try {
    const api = await createPrivateApi();
    const audio = formData.get('file') as File
    if (!audio) return { data: null, error: "No file provided" };
    const data = await api.post("/audio/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { data: data.data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to upload audio",
    }
  }
}

export async function getUrl(key: string): Promise<ServiceResponse<string>> {
  try {
    const api = await createPublicApi();
    const data = await api.get(`/audio/url?key=${encodeURIComponent(key)}`);

    return { data: data.data.url, error: null }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to get url",
    }
  }
}
