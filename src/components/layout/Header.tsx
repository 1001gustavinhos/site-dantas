import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "@/components/layout/CartIcon";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky py-3 bg-[#EAE8A7] top-0 z-50 w-full">
      <div className="container mx-auto max-w-screen-2xl px-6">
        <div className="flex justify-between items-center">
          <div className="flex order-2 md:relative items-center">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Dantas & Dantas Início"
            >
              <Image
                src="/logo3twingo.png"
                alt="Dantas & Dantas Logo"
                width={160} // This prop (along with height) defines the INTRINSIC aspect ratio. Ensure it matches your image.
                height={50} // This prop (along with width) defines the INTRINSIC aspect ratio. Ensure it matches your image.
                className="h-16 w-auto md:h-20" // Responsive height, w-auto to maintain aspect ratio based on height.
                priority
              />
            </Link>
          </div>
          {/* Produtos Button */}
          {/* Mobile: col 1, conceptually in the second "row". Desktop: col 1 (left), row 1. */}
          {/* <div className="flex items-center order-1 justify-start">
            <nav className="flex items-center">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-primary text-foreground bg-background hover:bg-primary hover:text-background"
              >
                <Link href="/" className="text-lg">
                  Produtos
                </Link>
              </Button>
            </nav>
          </div> */}
          {/* Cart Icon */}
          {/* Mobile: col 2, conceptually in the second "row". Desktop: col 3 (right), row 1. */}
          <div className="flex items-center order-3 justify-end">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
