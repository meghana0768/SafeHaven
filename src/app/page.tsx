import { AlertTriangle, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 bg-secondary">
        <h1 className="text-2xl font-bold text-secondary-foreground">SafeHaven</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-secondary-foreground/80 hover:text-secondary-foreground">Log In</Link>
          <Link href="/signup" className="text-secondary-foreground/80 hover:text-secondary-foreground">Sign Up</Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
        <div className="rounded-full p-4 inline-block mb-4" style={{ backgroundColor: '#059669' }}>
          <Shield className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          SafeHaven
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Discreet support for survivors of domestic violence
        </p>

        <div className="mt-8 w-full max-w-sm mx-auto">
          <div className="border border-blue-300 rounded-lg p-4 bg-card text-left space-y-2 mb-6">
              <h3 className="font-semibold text-card-foreground">You are not alone</h3>
              <p className="text-muted-foreground text-sm">
                SafeHaven appears as a calculator to protect your privacy while providing
                access to safety resources, emergency contacts, and support tools.
              </p>
          </div>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full text-base text-white hover:bg-[#059669]/90" style={{ backgroundColor: '#059669' }}>
              <Link href="/login">
                <Shield className="mr-2 h-5 w-5 text-white" /> I Already Have Access
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full text-base">
              <Link href="/signup">Set Up My Safe Access</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
            role="alert"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3 text-sm">
                <p>
                  <span className="font-semibold">If You're in Immediate Danger</span><br />
                   Call 911 or the National DV Hotline: <span className="text-red-600 font-semibold">1-800-799-7233</span>. Use
                  the quick exit button if you need to leave immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
