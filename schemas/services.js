import z from "zod";


const serviceSchema = z.object({
  description: z.string({
    invalid_type_error: "La descripción tiene que ser una cadena de texto.",
    required_error: 'La descripción es requerida.'
  }),
  hourValue: z.number(
    {
      invalid_type_error: "El precio tiene que ser un número.",
      required_error: 'El precio es requerido.'
    }
  ).positive()
}
);

export function validateService(service) {
  return serviceSchema.safeParse(service);
}

export function validatePartialService(service) {
  return serviceSchema.partial().safeParse(service);
}