import { SignupForm } from "@/components/auth/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register",
  description: "Create your AudioHub.art account and join us !",
  alternates: {
    canonical: "/register",
  },

  openGraph: {
    title: "Register to AudioHub.art",
    description: "Create your account",
    url: "/register",
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
        <SignupForm />
      </div>
    </div>
  )
}
