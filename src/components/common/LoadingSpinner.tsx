
import { MainLayout } from '@/components/layout/MainLayout';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
  fullPageLayout?: boolean;
}

export function LoadingSpinner({ text = "Carregando...", fullPageLayout = false }: LoadingSpinnerProps) {
  const spinnerContent = (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {text && <span className="ml-2">{text}</span>}
    </div>
  );

  if (fullPageLayout) {
    return <MainLayout>{spinnerContent}</MainLayout>;
  }

  return spinnerContent;
}
