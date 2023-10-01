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
  hourAmmount: z.number({
    invalid_type_error: "La cantidad de horas tiene que ser un entero.",
    required_error: 'La cantidad de horas es requerida.'
  }).positive()
})

export function validateServiceClient(serviceClient) {
  return serviceClientSchema.safeParse(serviceClient);
}

export function validatePartialServiceClient(serviceClient) {
  return serviceClientSchema.partial().safeParse(serviceClient);
}