import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const resources = [
  {
    name: "National Domestic Violence Hotline",
    description: "24/7 confidential support for anyone experiencing domestic violence, seeking resources or information, or questioning unhealthy aspects of their relationship.",
    phone: "1-800-799-7233",
    website: "https://www.thehotline.org",
  },
  {
    name: "RAINN (Rape, Abuse & Incest National Network)",
    description: "The nation's largest anti-sexual violence organization. RAINN operates the National Sexual Assault Hotline.",
    phone: "1-800-656-HOPE",
    website: "https://www.rainn.org",
  },
  {
    name: "National Suicide Prevention Lifeline",
    description: "Provides free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week.",
    phone: "988",
    website: "https://suicidepreventionlifeline.org",
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-headline">Find Help</h1>
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <p className="mb-8 text-muted-foreground">
          If you are in immediate danger, please call 911. For confidential support and resources, consider reaching out to the organizations below.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.name}>
              <CardHeader>
                <CardTitle>{resource.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <div className="space-y-2">
                  <p className="font-semibold">Phone: <a href={`tel:${resource.phone}`} className="font-normal text-primary hover:underline">{resource.phone}</a></p>
                  <a href={resource.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">
                    Website <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
