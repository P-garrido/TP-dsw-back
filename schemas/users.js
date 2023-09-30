import z from 'zod'

const userSchema = z.object({
  nombre_usuario: z.string({
    invalid_type_error: 'Nombre de Usuario must be a string',
    required_error: 'Nombre de Usuario required'
  }),
  clave: z.string({
    invalid_type_error: 'Clave must be a string',
    required_error: 'Clave required'
  }),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email required'
  }),
  telefono: z.string({
    invalid_type_error: 'Telefono must be a string',
    required_error: 'Telefono required'
  }),
  nombre: z.string({
    invalid_type_error: 'Nombre must be a string',
    required_error: 'Nombre required'
  }), 
  apellido: z.string({
    invalid_type_error: 'Apellido must be a string',
    required_error: 'Apellido required'
  }), 
  direccion: z.string({
    invalid_type_error: 'Direccion must be a string',
    required_error: 'Direccion required'
  }),
  tipo_usuario: z.number().int({
    invalid_type_error: 'Tipo Persona must be an integer',
    required_error: 'Tipo Persona required'
  })
})

export function validateUser(input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser(input){
  return userSchema.partial().safeParse(input)
}