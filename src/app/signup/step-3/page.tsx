"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { SafeHavenLogo } from '@/components/icons/safe-haven-logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupStep3Page() {
  const router = useRouter();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleFinishSetup = () => {
    const emergencyContacts = [{ name: contactName, phone: contactPhone }];
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" className="text-muted-foreground">
          <Link href="/signup/step-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Step 2
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <SafeHavenLogo className="mx-auto h-12 w-12" />
          <CardTitle className="font-headline text-2xl pt-4">Create Your Account</CardTitle>
          <CardDescription>Step 3 of 3: Emergency Contacts</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className="text-center text-sm text-muted-foreground">Add contacts you can reach out to in an emergency.</p>
          <div className="space-y-2">
            <Label htmlFor="contact1-name">Contact 1 Name</Label>
            <Input 
              id="contact1-name" 
              placeholder="Friend's Name" 
              value={contactName} 
              onChange={(e) => setContactName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact1-phone">Contact 1 Phone</Label>
            <Input 
              id="contact1-phone" 
              type="tel" 
              placeholder="123-456-7890" 
              value={contactPhone} 
              onChange={(e) => setContactPhone(e.target.value)} 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleFinishSetup}>
            Finish Setup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
