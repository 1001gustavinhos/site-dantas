
import { z } from 'zod';
import { checkoutPageTexts } from '@/lib/constants/checkoutPageTexts';
import { checkoutUserDetailsPageTexts } from '@/lib/constants/checkoutUserDetailsPageTexts';

export const PhoneStepSchema = z.object({
  phone: z.string()
    .refine(value => {
      const digits = value.replace(/\D/g, '');
      return digits.length >= 10 && digits.length <= 11;
    }, {
      message: checkoutPageTexts.phoneDigitsError,
    })
    .refine(value => {
      return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value);
    }, {
      message: checkoutPageTexts.phoneRegexError,
    }),
  saveInfo: z.boolean().default(false),
});

export type PhoneStepFormValues = z.infer<typeof PhoneStepSchema>;

export const UserDetailsSchema = z.object({
  name: z.string().min(2, checkoutUserDetailsPageTexts.nameMinError),
  address: z.string().min(5, checkoutUserDetailsPageTexts.addressMinError),
  complement: z.string().optional(),
});

export type UserDetailsFormValues = z.infer<typeof UserDetailsSchema>;
