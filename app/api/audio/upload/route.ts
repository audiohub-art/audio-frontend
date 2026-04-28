import { auth } from "@/services/auth"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()

  const res = await fetch(`${process.env.BACKEND_URL}/audio/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: formData,
  })
  const data = await res.json()
  return Response.json(data, { status: res.status })
}
