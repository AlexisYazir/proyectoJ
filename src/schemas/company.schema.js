import {z} from 'zod'

export const createMissionVisionSchema = z.object({
    mision: z.string({
        required_error: 'Llena el campo de misió'
    }),
    vision: z.string({
        required_error: 'Llena el campo de visión'
    }),
    date: z.string().date().optional()
});
