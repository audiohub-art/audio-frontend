import { Sidebar } from "@/components/side-bar";
import { SoundProvider } from "@/providers/sound";
import { getUser } from "@/services/user";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <SoundProvider>
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 w-full">{children}</main>
      </div>
    </SoundProvider>
  );
}
