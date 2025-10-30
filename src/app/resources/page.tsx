import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-headline">Educational Resources</h1>
          <Button asChild variant="ghost">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-lg">Understanding Your Rights</AccordionTrigger>
            <AccordionContent className="prose max-w-none text-muted-foreground">
              <p>You have the right to be safe. This includes legal protections like restraining orders (also known as protection orders). A restraining order is a court order that can protect you from someone who has been physically or sexually abusive, has threatened you, or has stalked you.</p>
              <p>Learn more about your specific rights in your state by contacting a local legal aid organization.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold text-lg">Legal Options</AccordionTrigger>
            <AccordionContent className="prose max-w-none text-muted-foreground">
                <p>There are several legal options available to survivors of domestic violence. These can include:</p>
                <ul>
                    <li><strong>Protection Orders:</strong> As mentioned, these orders can legally require an abuser to stay away from you, your home, your work, and your children.</li>
                    <li><strong>Divorce or Separation:</strong> If you are married to the abuser, you can file for divorce or legal separation.</li>
                    <li><strong>Child Custody:</strong> You can seek sole or primary custody of your children to ensure their safety.</li>
                </ul>
                <p>Navigating the legal system can be complex. It is highly recommended to seek assistance from a qualified attorney, often available for free through legal aid societies.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold text-lg">The Healing Process</AccordionTrigger>
            <AccordionContent className="prose max-w-none text-muted-foreground">
                <p>Healing from trauma is a personal journey and it looks different for everyone. There is no right or wrong way to heal. Be patient and kind to yourself.</p>
                <p>Some things that may help include:</p>
                <ul>
                    <li><strong>Therapy or Counseling:</strong> Speaking with a trauma-informed therapist can provide you with tools and support.</li>
                    <li><strong>Support Groups:</strong> Connecting with other survivors can help you feel less alone.</li>
                    <li><strong>Self-Care:</strong> Prioritizing your physical and emotional well-being through activities like exercise, mindfulness, and creative expression.</li>
                    <li><strong>Setting Boundaries:</strong> Learning to set and maintain healthy boundaries in all of your relationships is a crucial part of healing.</li>
                </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
