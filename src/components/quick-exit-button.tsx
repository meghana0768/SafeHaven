"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export function QuickExitButton() {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This prevents a hydration mismatch by ensuring the button is only rendered on the client
    setShowButton(true);
  }, []);

  const handleQuickExit = () => {
    router.push('/login');
  };

  if (!showButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="destructive"
        size="lg"
        className="rounded-full shadow-lg"
        onClick={handleQuickExit}
        aria-label="Quick Exit"
      >
        <LogOut className="mr-2 h-5 w-5" />
        Quick Exit
      </Button>
    </div>
  );
}
