import { z } from "zod";

/**
 * Schema for Korean time tool - no parameters needed
 */
export const GetKoreanTimeSchema = z.object({
  // No parameters required for getting current time
});

export type GetKoreanTimeArgs = z.infer<typeof GetKoreanTimeSchema>;