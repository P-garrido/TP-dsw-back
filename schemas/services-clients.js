import z from "zod";

const serviceClientSchema = z.object({
  idCli: z.number({
    invalid_type_error: "El id del cliente tiene que ser un entero.",
    required_error: 'El id del cliente es requerido.'
  }
  ).positive(),
  idServ: z.number({
    invalid_type_error: "El id del servicio tiene que ser un entero.",
    required_error: 'El id del servicio es requerido.'
  }).positive(),
  date: z.coerce.date({
    invalid_type_error: "La fecha del servicio tiene que ser una fecha y hora.",
    required_error: 'La fecha del servicio es requerida.'
  }),
  hourAmmount: z.number().positive().optional().nullable()
});


export function validateServiceClient(serviceClient) {
  return serviceClientSchema.safeParse(serviceClient);
}

export function validatePartialServiceClient(serviceClient) {
  return serviceClientSchema.partial().safeParse(serviceClient);
}