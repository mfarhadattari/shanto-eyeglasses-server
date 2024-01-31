import { z } from 'zod';
import {
  FRAMEMATERIALS,
  FRAMESHAPES,
  GENDERS,
  LENSTYPES,
} from './eyeglass.const';

export const createEyeglassValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name must be provide',
    }),
    price: z
      .number({
        invalid_type_error: 'Price must be number',
        required_error: 'Price must be provide',
      })
      .positive('Price must be positive number'),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be number',
        required_error: 'Quantity must be provide',
      })
      .nonnegative('Quantity cannot negative number'),
    frameMaterial: z.enum(FRAMEMATERIALS as [string, ...string[]], {
      invalid_type_error: 'Frame malarial is invalid',
      required_error: 'Frame malarial must be provide',
    }),
    frameShape: z.enum(FRAMESHAPES as [string, ...string[]], {
      invalid_type_error: 'Frame shape is invalid',
      required_error: 'Frame shape must be provide',
    }),
    lensType: z.enum(LENSTYPES as [string, ...string[]], {
      invalid_type_error: 'Lens type is invalid',
      required_error: 'Lens type must be provide',
    }),
    brand: z.string({
      invalid_type_error: 'Brand name must be string',
      required_error: 'Brand name must be provide',
    }),
    gender: z.enum(GENDERS as [string, ...string[]], {
      invalid_type_error: 'Gender is invalid',
      required_error: 'Gender must be provide',
    }),
    color: z.string({
      invalid_type_error: 'Color must be string',
      required_error: 'Color must be provide',
    }),
    otherRelevantAttributes: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
      .optional()
      .default({}),
  }),
});

export const updateEyeglassValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be number',
      })
      .positive('Price must be positive number')
      .optional(),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be number',
      })
      .nonnegative('Quantity cannot negative number')
      .optional(),
    frameMaterial: z
      .enum(FRAMEMATERIALS as [string, ...string[]], {
        invalid_type_error: 'Frame malarial is invalid',
      })
      .optional(),
    frameShape: z
      .enum(FRAMESHAPES as [string, ...string[]], {
        invalid_type_error: 'Frame shape is invalid',
      })
      .optional(),
    lensType: z
      .enum(LENSTYPES as [string, ...string[]], {
        invalid_type_error: 'Lens type is invalid',
      })
      .optional(),
    brand: z
      .string({
        invalid_type_error: 'Brand name must be string',
      })
      .optional(),
    gender: z
      .enum(GENDERS as [string, ...string[]], {
        invalid_type_error: 'Gender is invalid',
      })
      .optional(),
    color: z
      .string({
        invalid_type_error: 'Color must be string',
      })
      .optional(),
    otherRelevantAttributes: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
      .optional()
      .default({}),
  }),
});

export const bulkDeleteEyeglassesValidationSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});
