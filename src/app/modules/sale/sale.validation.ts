import { z } from 'zod';

export const saleValidationSchema = z.object({
  body: z.object({
    product: z.string({
      invalid_type_error: 'Product Id must be string',
      required_error: 'Product Id must be provide',
    }),
    quantity: z
      .number({
        invalid_type_error: 'Product quantity must be number',
        required_error: 'Product quantity must be provide',
      })
      .positive('Product quantity must be positive number'),
    buyerName: z.string({
      invalid_type_error: 'Buyer name must be string',
      required_error: 'Buyer name must be provide',
    }),
  }),
});
