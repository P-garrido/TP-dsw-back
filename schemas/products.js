import z from 'zod';

const productSchema = z.object({
  nombre_producto: z.string({
    invalid_type_error: 'El nombre tiene que ser una cadena de texto.',
    required_error: 'Elnombre es requerida.',
  }),
  desc_producto: z.string({
    invalid_type_error: 'La descripción tiene que ser una cadena de texto.',
    required_error: 'La descripción es requerida.',
  }),
  stock: z
    .number({
      invalid_type_error: 'El stock tiene que ser un número.',
      required_error: 'El precio es requerido.',
    })
    .positive(),
  precio: z
    .number({
      invalid_type_error: 'El stock tiene que ser un número.',
      required_error: 'El precio es requerido.',
    })
    .positive(),
  imagen: z.string(),
});

export function validateProduct(product) {
  return productSchema.safeParse(product);
}

export function validatePartialProduct(product) {
  return productSchema.partial().safeParse(product);
}
