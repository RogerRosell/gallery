import { z } from "zod";
import { inferSchema } from './utils';

export const ImageModel = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  keywords: z.array(z.string()).optional(),
  date: z.object({
    fullDate: z.string().optional(),
    month: z.string().optional(),
    year: z.string().optional()
  }).optional(),
  place: z.string().optional(),
})

export const ImageFormSchema = inferSchema(ImageModel);

export type TImage = z.infer<typeof ImageModel>;