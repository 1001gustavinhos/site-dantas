
'use server';

/**
 * @fileOverview Utility to generate a WhatsApp message string and URL with pre-filled order details and user information.
 * This function does not use AI or Genkit flows.
 *
 * - generateWhatsappMessage - A function that generates the WhatsApp message and URL.
 * - GenerateWhatsappMessageInput - The input type for the generateWhatsappMessage function.
 * - GenerateWhatsappMessageOutput - The return type for the generateWhatsappMessage function.
 */

import {z} from 'zod';

const GenerateWhatsappMessageInputSchema = z.object({
  userName: z.string().describe('O nome do usuário.'),
  userPhone: z.string().describe('O número de telefone da loja para onde a mensagem será enviada.'), // Alterado para telefone da loja
  userAddress: z.string().describe('O endereço do usuário, incluindo complemento se houver.'), // Endereço completo
  orderItems: z.array(z.string()).describe('A lista de itens do pedido.'),
  orderTotal: z.number().describe('O valor total do pedido.'),
});
export type GenerateWhatsappMessageInput = z.infer<
  typeof GenerateWhatsappMessageInputSchema
>;

const GenerateWhatsappMessageOutputSchema = z.object({
  whatsappMessage: z.string().describe('A mensagem do WhatsApp gerada.'),
  whatsappUrl: z.string().describe('A URL do WhatsApp gerada no formato https://whatsa.me/PHONE_NUMBER/?t=ENCODED_MESSAGE.'),
});
export type GenerateWhatsappMessageOutput = z.infer<
  typeof GenerateWhatsappMessageOutputSchema
>;

export async function generateWhatsappMessage(
  input: GenerateWhatsappMessageInput
): Promise<GenerateWhatsappMessageOutput> {
  const parsedInput = GenerateWhatsappMessageInputSchema.parse(input);

  let message = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
  message += `Cliente: ${parsedInput.userName}\n`;
  // O telefone do cliente não é mais enviado na mensagem, pois a mensagem é para o telefone da loja.
  // Se precisar do telefone do cliente, ele deve estar no objeto UserInfo e ser tratado separadamente.
  message += `Endereço para entrega: ${parsedInput.userAddress}\n\n`;
  message += `Itens do Pedido:\n`;
  parsedInput.orderItems.forEach(item => {
    message += `- ${item}\n`;
  });
  message += `\nTotal do Pedido: R$${parsedInput.orderTotal.toFixed(2)}\n\n`;
  message += `Aguardo a confirmação. Obrigado!`;

  // A URL do WhatsApp usa o userPhone que agora é o telefone da loja.
  const encodedMessage = encodeURIComponent(message); // Usar encodeURIComponent para melhor compatibilidade
  const whatsappUrl = `https://wa.me/${parsedInput.userPhone}?text=${encodedMessage}`; // Usar wa.me e text=

  const output = {
    whatsappMessage: message,
    whatsappUrl: whatsappUrl,
  };
  
  return GenerateWhatsappMessageOutputSchema.parse(output);
}
