import type { Product } from "@/lib/types";

// Ensure the imageUrl paths correctly point to images in your /public folder.
// For example, if id is 'empanada-frango', imageUrl: '/empanada-frango.webp'
// means you should have a file named 'empanada-frango.webp' directly in the 'public' folder.
// Names are case-sensitive. You might need to restart your dev server after adding files to /public.

export const mockProducts: Product[] = [
  {
    id: "empanada-carne-ovo",
    name: "Empanada de Carne c/ Ovo (Pacote com 7)",
    price: 70.0,
    imageUrl: "/empanadacarne.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada carne ovo",
  },
  {
    id: "empanada-carne-queijo",
    name: "Empanada de Carne c/ Queijo (Pacote com 7)",
    price: 70.0,
    imageUrl: "/empanadacarnequeijo.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada carne",
  },
  {
    id: "empanada-frango",
    name: "Empanada de Frango (Pacote com 7)",
    price: 70.0,
    imageUrl: "/frango.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada frango",
  },
  {
    id: "empanada-caprese",
    name: "Empanada Caprese (Pacote com 7)",
    price: 70.0,
    imageUrl: "/caprese.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada caprese",
  },
  {
    id: "empanada-pernil",
    name: "Empanada de Pernil (Pacote com 7)",
    price: 70.0,
    imageUrl: "/pernil.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada pernil",
  },
  {
    id: "empanada-escarola-queijo",
    name: "Empanada de Escarola c/ Queijo (Pacote com 7)",
    price: 70.0,
    imageUrl: "/escarola.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada escarola",
  },
  {
    id: "empanada-palmito",
    name: "Empanada de Palmito (Pacote com 7)",
    price: 70.0,
    imageUrl: "/palmito.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada palmito",
  },
  {
    id: "empanada-shimeji",
    name: "Empanada de Shimeji (Pacote com 7)",
    price: 70.0,
    imageUrl: "/shimeji.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada shimeji",
  },
  {
    id: "empanada-cebola-queijo",
    name: "Empanada de Cebola c/ Queijo (Pacote com 7)",
    price: 70.0,
    imageUrl: "/queijocomcebola.jpeg",
    category: "Empanadas",
    dataAiHint: "empanada cebola",
  },
  {
    id: "pacote-misto-empanadas",
    name: "Pacote Misto de Empanadas (7 unidades)",
    price: 70.0,
    imageUrl: "/mista.jpeg",
    category: "Empanadas",
    dataAiHint: "empanadas sortidas",
  },
  {
    id: "castanha-caju-com-sal",
    name: "Castanha de Caju Torrada (com Sal) - 250g",
    price: 25.0,
    imageUrl: "/castanhadecaju.jpeg",
    category: "Castanhas",
    dataAiHint: "cashew nuts",
  },
  {
    id: "castanha-caju-sem-sal",
    name: "Castanha de Caju Torrada (sem Sal) - 250g",
    price: 25.0,
    imageUrl: "/castanhadecaju.jpeg",
    category: "Castanhas",
    dataAiHint: "cashew nuts",
  },
];
