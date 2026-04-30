import { getUserInfo } from "@/services/user";
import { UserProfile } from "@/components/user/user-profile";


export default async function ProductPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const { data, error } = await getUserInfo(name);
  if (error) {
    return <div>{error}</div>;
  }
  return <UserProfile user={data} />;
}
