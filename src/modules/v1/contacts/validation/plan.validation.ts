// import * as joi from '@hapi/joi';

// import {
//   EBillEvery,
//   EPricingModel,
//   EFreeTrial,
// } from '../../../../common/enums/plans-data.enum';

// export const validateCreatePlanSchema = joi
//   .object({
//     name: joi
//       .string()
//       .trim()
//       .required()
//       .min(3),
//     planId: joi
//       .string()
//       .trim()
//       .required()
//       .min(3),
//     invoiceName: joi
//       .string()
//       .trim()
//       .min(3),
//     description: joi
//       .string()
//       .trim()
//       .min(3),
//     showDescInvoices: joi.boolean(),
//     showDescQuotes: joi.boolean(),
//     billEveryCount: joi
//       .number()
//       .positive()
//       .required(),
//     billEveryType: joi
//       .string()
//       .trim()
//       .required()
//       .valid(...Object.values(EBillEvery)),
//     pricingModel: joi
//       .string()
//       .trim()
//       .required()
//       .valid(...Object.values(EPricingModel)),
//     pricingCharacteristic: joi.any().required(),
//     freeTrialCount: joi
//       .number()
//       .positive()
//       .required(),
//     freeTrialType: joi
//       .string()
//       .trim()
//       .required()
//       .valid(...Object.values(EFreeTrial)),
//     displayInCustomerPortal: joi.boolean(),
//     checkoutUsDropinScript: joi.boolean(),
//   })
//   .required();

// export const validateUpdatePlanSchema = joi
//   .object({
//     id: joi
//       .number()
//       .positive()
//       .required(),
//     name: joi
//       .string()
//       .trim()
//       .min(3),
//     planId: joi
//       .string()
//       .trim()
//       .min(3),
//     invoiceName: joi
//       .string()
//       .trim()
//       .min(3),
//     description: joi
//       .string()
//       .trim()
//       .min(3),
//     showDescInvoices: joi.boolean(),
//     showDescQuotes: joi.boolean(),
//     billEveryCount: joi.number().positive(),
//     billEveryType: joi
//       .string()
//       .trim()
//       .valid(...Object.values(EBillEvery)),
//     pricingModel: joi
//       .string()
//       .trim()
//       .valid(...Object.values(EPricingModel)),
//     pricingCharacteristic: joi.any(),
//     freeTrialCount: joi.number().positive(),
//     freeTrialType: joi
//       .string()
//       .trim()
//       .valid(...Object.values(EFreeTrial)),
//     displayInCustomerPortal: joi.boolean(),
//     checkoutUsDropinScript: joi.boolean(),
//   })
//   .required();

// export const validateFindOneDeletePlanSchema = joi.object({
//   id: joi
//     .number()
//     .positive()
//     .required(),
// });
