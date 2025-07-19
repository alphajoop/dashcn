import * as z from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: 'Adresse email invalide' }),
  password: z
    .string()
    .min(1, { message: 'Le mot de passe est requis' })
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
