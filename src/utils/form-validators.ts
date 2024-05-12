import { z } from 'astro:content';

export const contactFormValidate = z.object({
    name: z.string({ message: 'Please tell me your name' }),
    email: z
        .string({ message: 'Please provide your email address' })
        .email({ message: 'Please provide a valid email address' }),
    message: z.string({ message: "What's your message?" }),
    name__verify: z.string().max(0),
});

export function getZodErrors(fieldErrors: any) {
    const errors: any = {};

    for (const key in fieldErrors) {
        errors[key] = fieldErrors[key as keyof typeof fieldErrors][0];
    }

    return errors;
}