import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "@/components/layout/CartIcon";

export function Header() {
  return (
    <header className="sticky py-3 bg-[#EDE26A] top-0 z-50 w-full">
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
                className="w-35 md:w-45" // Responsive height, w-auto to maintain aspect ratio based on height.
                priority
              />
            </Link>
          </div>
          <div className="flex items-center order-3">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
