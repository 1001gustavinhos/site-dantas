
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { orderPlacedPageTexts as texts } from '@/lib/constants/orderPlacedPageTexts';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAppContext } from '@/context/AppContext'; // ADDED

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.002-6.554 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.554-5.338 11.891-11.893 11.891-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export default function OrderPlacedPage() {
  const router = useRouter();
  const { clearCart } = useAppContext(); // ADDED
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [whatsappMessage, setWhatsappMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const url = sessionStorage.getItem('whatsappUrl');
    const message = sessionStorage.getItem('whatsappMessage');
    if (url && message) {
      setWhatsappUrl(url);
      setWhatsappMessage(message);
      clearCart(); // ADDED: Clear cart when page successfully loads
    } else {
      router.push('/');
    }
  }, [router, clearCart]); // ADDED clearCart to dependency array

  const handleCopyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast({
          title: texts.copiedMessage,
          description: texts.copiedDescriptionMessage
        });
      })
      .catch(err => {
        console.error('Falha ao copiar: ', err);
        toast({
          title: texts.copyFailed,
          description: texts.copyFailedMessage,
          variant: "destructive"
        });
      });
  };

  if (!isClient || !whatsappUrl || !whatsappMessage) {
    return <LoadingSpinner text={texts.loadingOrderDetails} fullPageLayout={true} />;
  }

  return (
    <MainLayout>
      <section className="py-8 max-w-lg mx-auto text-center">
        <Card className="shadow-lg">
          <CardHeader>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="font-page-title font-semibold text-2xl">{texts.pageTitle}</CardTitle>
            <CardDescription>
              {texts.pageDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              asChild
              className="w-full bg-green-500 hover:bg-green-600 text-white border border-green-700 text-lg py-3 shadow-md"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-2 h-6 w-6" />
                {texts.sendOrderButton}
              </a>
            </Button>

            <Separator />

            <div>
              <h3 className="text-lg font-page-title font-semibold mb-2 text-left">{texts.whatsappMessageLabel}</h3>
              <Textarea value={whatsappMessage} readOnly rows={8} className="resize-none bg-muted/50 mb-2" />
              <Button
                onClick={() => handleCopyToClipboard(whatsappMessage)}
                variant="outline"
                className="w-full"
              >
                <Copy className="mr-2 h-4 w-4" /> {texts.copyMessageButton}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Button variant="link" asChild className="mt-8 text-primary">
          <Link href="/">{texts.continueShopping}</Link>
        </Button>
      </section>
    </MainLayout>
  );
}
