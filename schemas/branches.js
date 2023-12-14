import z from "zod";


export const branchSchema = z.object({
  nombre: z.string(),
  direccion: z.string()
});