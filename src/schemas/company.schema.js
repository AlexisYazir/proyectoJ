import { z } from 'zod';

export const CompanySchema = z.object({
    mision: z.string({
        required_error: 'Llena el campo de misión'
    }),
    vision: z.string({
        required_error: 'Llena el campo de visión'
    }),
    date: z.date().optional() // Si es un Date real
    // date: z.string().optional() // Si se almacena como string
});
