import { Header } from "@/components/header";
import { Sidebar } from "@/components/side-bar";
import { SoundProvider } from "@/providers/sound";
import { getUser } from "@/services/user";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  console.log("user", user)
  return (
    <SoundProvider>
      <div className="flex h-full w-full bg-background overflow-hidden">
        <Sidebar user={user} />
        <main className="flex flex-col flex-1 min-w-0 w-full">
          <Header user={user} />
          <div className="flex-1 overflow-y-auto overflow-contain">
            {children}
          </div>
        </main>
      </div>
    </SoundProvider>
  );
}
