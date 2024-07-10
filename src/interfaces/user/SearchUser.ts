import { z } from "zod"

export const createSearchUserFormSchema = z.object({
    searchUser: z.string(),
})

export type createSearchUserFormData = z.infer<typeof createSearchUserFormSchema>

