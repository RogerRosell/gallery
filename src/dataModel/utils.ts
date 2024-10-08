import { z } from "zod";

export function inferSchema<T extends z.ZodTypeAny>(schema: T) {
  return schema;
}