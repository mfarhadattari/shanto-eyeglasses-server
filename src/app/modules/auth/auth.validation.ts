import z from 'zod';

export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name must be provide',
    }),
    email: z
      .string({
        invalid_type_error: 'Email must be string',
        required_error: 'Email must be provide',
      })
      .email('Email is not valid'),
    password: z.string({
      invalid_type_error: 'Password must be string',
      required_error: 'Password must be provide',
    }),
  }),
});

export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Email must be string',
        required_error: 'Email must be provide',
      })
      .email('Email is not valid'),
    password: z.string({
      invalid_type_error: 'Password must be string',
      required_error: 'Password must be provide',
    }),
  }),
});
