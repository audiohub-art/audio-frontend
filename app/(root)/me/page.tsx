"use server"

import { getMe } from "@/services/user";
import { UserProfile } from "@/components/user/user-profile";

export default async function UserPage() {
  const { data, error} = await getMe();
  if (error) {
    return (
      <p>Error</p>
    )
  }
  return (
    <div>
      <UserProfile user={data}/>
    </div>
  )
}
