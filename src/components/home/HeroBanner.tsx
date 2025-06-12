"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants/productConstants";

interface HeroBannerProps {
  onScrollToCategory: (categoryId: string) => void;
}

export function HeroBanner({ onScrollToCategory }: HeroBannerProps) {
  return (
    <section className="bg-[#EDE26A] rounded-xl shadow-lg overflow-hidden">
      <div className="container mx-auto pt-8">
        {/* Top Section: Centered H1 */}
        <div className="flex justify-between lg:max-w-7xl lg:mx-8 mx-4 items-center mb-3 md:mb-12 md:px-8">
          <Image
            src="/sunImage.png"
            alt="Argentina Flag"
            width={212}
            height={212}
            className="rounded-sm mr-3 lg:block hidden"
            data-ai-hint="argentina flag"
          />
          <h1 className="lg:text-6xl md:text-5xl text-3xl font-bold font-sans text-black max-w-2xl leading-tight">
            O melhor do{" "}
            <span className="bg-green-600 px-2 py-1 inline-block">Brasil</span>{" "}
            e{" "}
            <span className="bg-cyan-500 px-2 py-1 inline-block">
              Argentina
            </span>{" "}
            em sua casa
          </h1>
        </div>

        {/* Bottom Section: Image and Text/Buttons */}
        {/* On mobile: Image stacks above Text/Buttons. On desktop: 2-column grid. */}
        <div className="flex flex-col lg:grid lg:grid-cols-2">
          {/* Image Side: Appears FIRST on mobile in this flex-col, FIRST (left) on desktop grid */}
          <div className="relative w-full lg:w-auto flex justify-center order-2 lg:order-1 lg:justify-start">
            <Image
              src="/bannerImage.png"
              alt="Illustration of Dantas & Dantas delivery scene"
              width={783}
              height={509}
              className="rounded-lg object-cover"
              data-ai-hint="delivery car empanadas tango dancers"
            />
          </div>

          {/* Text and CTA Side: Appears SECOND on mobile in this flex-col, SECOND (right) on desktop grid */}
          <div className="w-full flex flex-col justify-around max-h-lg order-1 lg:order-2 items-center">
            <div className="mt-6 space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <p className="text-xl sm:text-4xl text-center items-center font-semibold text-foreground">
                Faça seu pedido!
              </p>

              {/* Buttons container */}
              <Button
                onClick={() => onScrollToCategory(CATEGORIES.EMPANADAS.id)}
                variant="default"
                size="lg"
                className="w-full bg-background rounded-2xl overflow-hidden transition-colors duration-200 shadow-md flex items-center justify-start md:py-10 py-8"
              >
                <Image
                  src="/empaArg.svg"
                  alt="Empanada Argentina"
                  width={193}
                  height={108}
                  className="rounded-md md:w-40 w-32 md:-translate-x-[40px] -translate-x-[42px] object-cover"
                  data-ai-hint="empanada food"
                />
                {/* <Image
                  src="/escarola.jpeg"
                  alt="Empanada Argentina"
                  width={193}
                  height={108}
                  className="rounded-md mr-4 object-cover"
                  data-ai-hint="empanada food"
                /> */}
                <span className="font-semibold md:-translate-x-9 -translate-x-11  text-start text-foreground md:text-2xl text-lg">
                  Empanada Argentina
                </span>
              </Button>
              <Button
                onClick={() => onScrollToCategory(CATEGORIES.CASTANHAS.id)}
                variant="default"
                size="lg"
                className="w-full bg-background rounded-2xl overflow-hidden transition-colors duration-200 shadow-md flex items-center justify-start md:py-10 py-8"
              >
                <Image
                  src="/brazilNuts.svg"
                  alt="Castanha de Caju"
                  width={197}
                  height={109}
                  className="rounded-md md:w-40 w-32 md:-translate-x-[38px] -translate-x-[40px] object-cover"
                  data-ai-hint="cashew nuts"
                />
                {/* <Image
                  src="/castanhadecaju.jpeg"
                  alt="Castanha de Caju"
                  width={197}
                  height={109}
                  className="rounded-md mr-4 w-1/2 -translate-x-9 object-cover"
                  data-ai-hint="cashew nuts"
                /> */}
                <span className="font-semibold md:-translate-x-9 -translate-x-11  text-start text-foreground md:text-2xl text-lg">
                  Castanha de Caju
                </span>
              </Button>
            </div>

            {/* Delivery note */}
            <div className="mt-6 flex items-center md:text-xl text-foreground">
              <Package className="mr-2 md:h-10 md:w-10 text-primary" />
              <span>Entregas para Barueri e região</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
