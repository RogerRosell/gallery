import { z } from "zod";
import { inferSchema } from './utils';

export const FilterModel = z.object({
  id: z.string(),
  value: z.array(z.string())
})

export const FilterFormSchema = inferSchema(FilterModel);

export type TFilter = z.infer<typeof FilterModel>;

export const FilterDataModel = z.array(FilterModel);

export type TFilterData = z.infer<typeof FilterDataModel>;