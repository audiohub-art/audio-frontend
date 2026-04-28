import { LoginForm } from "@/components/auth/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account AudioHub.art",
  alternates: {
    canonical: "/login",
  },

  openGraph: {
    title: "Login to AudioHub.art",
    description: "Access to your account",
    url: "/login",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  }
}

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
