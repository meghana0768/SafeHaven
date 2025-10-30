"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Shield, Heart, PhoneCall, BookOpen, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);
  
  const handleQuickExit = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#EAF6FF] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username || 'friend'}</h1>
            <p className="text-green-600 font-semibold">You're in a safe space</p>
          </div>
          <Button variant="destructive" className="rounded-full" onClick={handleQuickExit}>
             <X className="mr-2 h-4 w-4" /> Quick Exit
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <Card className="bg-red-50 border-red-200 shadow-lg">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <PhoneCall className="h-8 w-8 text-red-500" />
              <div>
                <h3 className="font-bold text-lg">Emergency Support</h3>
                <p className="text-gray-600">If you're in immediate danger, call 911</p>
              </div>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full">
              <a href="tel:911">Call Now</a>
            </Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/find-help" passHref>
            <Card className="bg-blue-50 border-blue-200 h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <CardTitle>Find Help Now</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Locate shelters, counseling, and support services nearby.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Shelters</span>
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Legal Aid</span>
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Counseling</span>
                </div>
              </CardContent>
            </Card>
          </Link>
           <Link href="/safety-plan" passHref>
            <Card className="bg-green-50 border-green-200 h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <CardTitle>Safety Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Create and manage your personal safety strategy.</p>
                 <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Emergency Contacts</span>
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Safe Places</span>
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">Important Docs</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
           <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-purple-600" />
              <div>
                <h2 className="text-2xl font-bold">Support & Resources</h2>
                <p className="text-gray-600">Quick access to helpful information and support</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/help" passHref>
                <Card className="bg-white h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">24/7 Hotlines</h3>
                    <p className="text-gray-600 mb-4 text-sm">Anonymous, confidential support available anytime</p>
                    <Button variant="outline" className="rounded-full border-gray-300">View Hotlines</Button>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/resources" passHref>
                <Card className="bg-white h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Educational Resources</h3>
                    <p className="text-gray-600 mb-4 text-sm">Information about rights, legal options, and healing</p>
                    <Button variant="outline" className="rounded-full border-gray-300">Learn More</Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
        </div>
      </main>
    </div>
  );
}
