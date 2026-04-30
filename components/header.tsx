"use client";
import Link from "next/link";
import {
  CircleUserRound,
  ChevronDown,
  Search,
  Volume2,
  VolumeX,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMute } from "@/providers/sound";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

type User = {
  id: string;
  name: string;
  slug: string;
}

export const Header: React.FC<{ user: User | undefined }> = ({ user }) => {
  const path = usePathname();
  const { isMuted, toggleMute } = useMute()
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-20 px-4 md:px-6 bg-background gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Search" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <div className="flex items-center justify-between gap-2">
        <div onClick={toggleMute} className="p-3 rounded-xl transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent/50">
          {isMuted ? (
            <VolumeX
            className="w-7 h-7"
            />
          ): (
            <Volume2
              className="w-7 h-7"
            />
          )}
        </div>
        <Link href={user ? `/${user.slug}` : "/login"}>
        <CircleUserRound className="w-10 h-10 " />
      </Link>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none rounded-full focus-visible:ring-2 focus-visible:ring-ring">
          <div className="flex items-center justify-center transition-opacity hover:opacity-80">
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent asChild>
          {user ? (
            <DropdownMenuItem onSelect={() => signOut({ redirectTo: "/" })}>
              Sign Out
            </DropdownMenuItem>
            ) : (
            <div>
              <DropdownMenuItem>
                <Link href={"/login"}>Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/register"}>Sign Up</Link>
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
