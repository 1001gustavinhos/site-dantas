// WhatsApp SVG Icon Component (reused for consistency)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.002-6.554 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.554-5.338 11.891-11.893 11.891-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const STORE_PHONE_NUMBER = "11995182883";
const STORE_PHONE_NUMBER_DISPLAY = "(11) 99518-2883";
const WHATSAPP_LINK = `https://wa.me/55${STORE_PHONE_NUMBER}`;

const DEV_PHONE_NUMBER = "11981071231";
const WHATSAPP_MESSAGE_DEV =
  "Olá! Gostaria de uma solução tecnológica para o meu negócio. Poderia me ajudar?";
const WHATSAPP_LINK_DEV = `https://wa.me/55${DEV_PHONE_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE_DEV
)}`;

export function Footer() {
  return (
    <footer className="py-8 md:px-8 border-t flex justify-center border-border/40 bg-muted/30">
      <div className="container flex flex-col items-center justify-center gap-6 text-sm text-center">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Entrar em contato via WhatsApp"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          <WhatsAppIcon className="h-5 w-5 text-green-600" />
          <span>{STORE_PHONE_NUMBER_DISPLAY}</span>
        </a>

        <p className="text-base text-muted-foreground font-medium">
          Entregas apenas para Barueri e região.
        </p>

        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground">Desenvolvido por:</span>
          <a
            href={WHATSAPP_LINK_DEV}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label="Fale com o desenvolvedor via WhatsApp"
          >
            <img
              src="/devDantas.png"
              alt="Logo do desenvolvedor"
              className="max-w-sm"
            />
          </a>
        </div>
        <p className="text-balance leading-loose text-muted-foreground">
          &copy; {new Date().getFullYear()} Dantas & Dantas. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
