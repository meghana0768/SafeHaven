"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { SafeHavenLogo } from '@/components/icons/safe-haven-logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SignupStep2Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleContinue = () => {
    if (pin.length < 4) {
      toast({
        title: "Invalid PIN",
        description: "Your PIN must be at least 4 digits.",
        variant: "destructive",
      });
      return;
    }
    if (pin !== confirmPin) {
      toast({
        title: "PINs don't match",
        description: "Please make sure your PINs match.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem('userPin', pin);
    router.push('/signup/step-3');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" className="text-muted-foreground">
          <Link href="/signup">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Step 1
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <SafeHavenLogo className="mx-auto h-12 w-12" />
          <CardTitle className="font-headline text-2xl pt-4">Create Your Account</CardTitle>
          <CardDescription>Step 2 of 3: Setup PIN</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
            <p className="text-center text-sm text-muted-foreground">This PIN will be used to access the app through the calculator interface. After entering your PIN on the calculator, press the '=' button to log in.</p>
            <div className="space-y-2">
              <Label htmlFor="pin">Enter a 4-digit PIN</Label>
              <Input id="pin" type="password" maxLength={4} placeholder="••••" className='text-center tracking-[1em]' value={pin} onChange={(e) => setPin(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pin">Confirm PIN</Label>
              <Input id="confirm-pin" type="password" maxLength={4} placeholder="••••" className='text-center tracking-[1em]' value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} />
            </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleContinue}>
            Continue to Step 3
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
