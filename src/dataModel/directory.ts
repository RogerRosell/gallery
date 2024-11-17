import { z } from "zod";
import { inferSchema } from './utils';
import { ImageModel } from './image';

export const FolderModel = z.object({
  name: z.string(),
  type: z.string(),
  children: z.array(ImageModel).optional(),
  title: z.string().optional(),
  place: z.string().optional(),
  date: z.object({    
    fullDate: z.string().optional(),
    month: z.string().optional(),
    year: z.string().optional()
  }).optional(),  
})

export const FolderFormSchema = inferSchema(FolderModel);

export type TFolder = z.infer<typeof FolderModel>;