"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, Pin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const hardcodedAddress = "10680 Main Street, Suite 140, Fairfax, VA 22030";

const predefinedLocations = [
  {
    name: "Domestic Violence Action Center",
    services: "Crisis Intervention, Legal Services, Advocacy",
    distance: "1.3 miles away"
  },
  {
    name: "Legal Services of Northern Virginia (LSNV)",
    services: "Free Legal Assistance, Protection Orders",
    distance: "1.4 miles away"
  },
  {
    name: "Doorways for Women & Families",
    services: "Emergency Shelter, Counseling, Support Groups",
    distance: "10 miles away"
  }
];

export default function FindHelpPage() {
  const router = useRouter();
  const handleQuickExit = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#F0F5FE] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button asChild variant="ghost" className="text-gray-700">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Button variant="destructive" className="rounded-full" onClick={handleQuickExit}>
              <X className="mr-2 h-4 w-4" /> Quick Exit
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Find Help & Resources</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800">Support Near You</h2>
            <p className="text-gray-600 mb-4">Showing resources for the following location:</p>
            <div className="flex items-center gap-2 p-3 bg-gray-100 border border-gray-200 rounded-lg">
                <Pin className="h-5 w-5 text-gray-500" />
                <p className="text-gray-800 font-medium">{hardcodedAddress}</p>
            </div>
        </div>
        
        <>
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="text-xl font-bold text-gray-800">{predefinedLocations.length} Resources Found</h3>
            </div>
            <div className="grid gap-6">
              {predefinedLocations.map((loc) => (
                <Card key={loc.name} className="shadow-md">
                  <CardContent className="p-6 flex items-center justify-between">
                     <div className="flex flex-col items-start gap-2">
                        <h4 className="font-bold text-lg text-[#5A67D8]">{loc.name}</h4>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-600">{loc.services}</Badge>
                        <p className="text-muted-foreground text-sm">{loc.distance}</p>
                     </div>
                     <Button asChild className="bg-[#5A67D8] hover:bg-[#434190] text-white rounded-full px-6">
                        <a href="tel:911">Call</a>
                     </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
      </main>
    </div>
  );
}
