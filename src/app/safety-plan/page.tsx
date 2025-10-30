"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const checklistItems = [
  "Keep important documents in a safe, easily accessible place",
  "Have a bag packed with essential items (clothes, medicines, keys)",
  "Save emergency numbers in my phone under safe names",
  "Identify safe places I can go in an emergency",
  "Plan safe routes to leave home quickly",
  "Keep some cash hidden in a safe place",
  "Tell trusted friends about my situation",
  "Change passwords on important accounts",
  "Document injuries or incidents safely",
  "Learn about local resources and support services",
];

const tabs = [
  { id: 'checklist', name: 'Safety Checklist' },
  { id: 'contacts', name: 'Emergency Contacts' },
  { id: 'places', name: 'Safe Places' },
  { id: 'notes', name: 'Notes & Documents' },
];

export default function SafetyPlanPage() {
  const [activeTab, setActiveTab] = useState('checklist');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', phone: '' }]);
  const [safePlaces, setSafePlaces] = useState(['']);
  const [notes, setNotes] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      if (parsedContacts.length > 0) {
        setEmergencyContacts(parsedContacts);
      }
    }
  }, []);

  const persistData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  const handleCheckboxChange = (item: string) => {
    setCheckedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const progress = (checkedItems.length / checklistItems.length) * 100;

  const handleAddContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', phone: '' }]);
  };

  const handleAddPlace = () => {
    setSafePlaces([...safePlaces, '']);
  };
  
  const handleContactChange = (index: number, field: 'name' | 'phone', value: string) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index][field] = value;
    setEmergencyContacts(updatedContacts);
    persistData('emergencyContacts', updatedContacts);
  };

  const handlePlaceChange = (index: number, value: string) => {
    const updatedPlaces = [...safePlaces];
    updatedPlaces[index] = value;
    setSafePlaces(updatedPlaces);
  };

  const handleQuickExit = () => {
    router.push('/login');
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'checklist':
        return (
          <Card className="bg-white rounded-xl shadow-sm border-none p-4 sm:p-6">
            <CardContent className="pt-4">
              <h2 className="text-lg font-semibold text-[#059669]">Safety Preparedness Checklist</h2>
              <p className="text-sm text-gray-600 mt-1 mb-4">Complete these steps to improve your safety and preparedness</p>
              
              <div className="flex justify-end items-baseline gap-2 text-sm mb-2">
                <span className="font-semibold">{checkedItems.length}/{checklistItems.length}</span>
                <span className="text-gray-500">Complete</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-200 [&>div]:bg-[#059669]" />

              <div className="mt-6 space-y-4">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox
                      id={`item-${index}`}
                      checked={checkedItems.includes(item)}
                      onCheckedChange={() => handleCheckboxChange(item)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669] focus:ring-[#059669]"
                    />
                    <label htmlFor={`item-${index}`} className="text-sm text-gray-700">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'contacts':
         return (
          <Card className="bg-white rounded-xl shadow-sm border-none p-4 sm:p-6">
            <CardContent className="pt-4">
              <h2 className="text-lg font-semibold text-[#059669]">Emergency Contacts</h2>
              <p className="text-sm text-gray-600 mt-1 mb-6">Store contact information for people you trust.</p>
              <div className="space-y-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                     <div className="space-y-1">
                        <Label htmlFor={`contact-name-${index}`}>Contact Name</Label>
                        <Input id={`contact-name-${index}`} placeholder="e.g., Jane Doe, Neighbor" value={contact.name} onChange={(e) => handleContactChange(index, 'name', e.target.value)} />
                     </div>
                      <div className="space-y-1">
                        <Label htmlFor={`contact-phone-${index}`}>Phone Number</Label>
                        <Input id={`contact-phone-${index}`} type="tel" placeholder="123-456-7890" value={contact.phone} onChange={(e) => handleContactChange(index, 'phone', e.target.value)} />
                     </div>
                  </div>
                ))}
              </div>
               <Button variant="outline" className="mt-6 w-full" onClick={handleAddContact}>Add Another Contact</Button>
            </CardContent>
          </Card>
        );
      case 'places':
        return (
          <Card className="bg-white rounded-xl shadow-sm border-none p-4 sm:p-6">
            <CardContent className="pt-4">
              <h2 className="text-lg font-semibold text-[#059669]">Safe Places</h2>
              <p className="text-sm text-gray-600 mt-1 mb-6">List safe locations you can go to in an emergency.</p>
              <div className="space-y-4">
                 {safePlaces.map((place, index) => (
                  <div key={index} className="space-y-1">
                    <Label htmlFor={`place-${index}`}>Safe Place #{index + 1}</Label>
                    <Input id={`place-${index}`} placeholder="e.g., Friend's house, Library, Police Station" value={place} onChange={(e) => handlePlaceChange(index, e.target.value)} />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full" onClick={handleAddPlace}>Add Another Place</Button>
            </CardContent>
          </Card>
        );
      case 'notes':
        return (
          <Card className="bg-white rounded-xl shadow-sm border-none p-4 sm:p-6">
            <CardContent className="pt-4">
              <h2 className="text-lg font-semibold text-[#059669]">Notes & Documents</h2>
              <p className="text-sm text-gray-600 mt-1 mb-6">Keep a record of important information or incidents. This is for your eyes only.</p>
              <Textarea 
                placeholder="You can document dates, times, details of incidents, or store copies of important documents..." 
                className="min-h-[200px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4]">
      <header className="bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
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
        <div className="container mx-auto mt-6">
          <h1 className="text-3xl font-bold text-[#059669]">My Safety Plan</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-gray-200/80 p-1 rounded-full flex items-center justify-between gap-1 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full py-2 px-1 text-center text-xs sm:text-sm font-medium rounded-full transition-colors focus:outline-none",
                activeTab === tab.id
                  ? 'bg-white text-gray-800 shadow'
                  : 'bg-transparent text-gray-600 hover:bg-white/50'
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
}
