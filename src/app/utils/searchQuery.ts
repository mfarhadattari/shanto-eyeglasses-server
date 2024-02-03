import { TOtherRelevantAttributes } from '../modules/eyeglass/eyeglass.interface';

/* --------------> Format Other Relevant Attribute <--------------- */
export const formatOtherRelevantAttributes = (inputValue: string) => {
  const otherRelevantAttributes: TOtherRelevantAttributes = {};
  inputValue
    .split(',')
    .map((eachAttribute: string) => eachAttribute.split(':'))
    .forEach(([key, value]) => {
      const formattedKey = key.trim();
      let formattedValue: any = value.trim();

      if (!isNaN(formattedValue)) {
        formattedValue = Number(formattedValue);
      } else if (formattedValue === 'true' || formattedValue === 'false') {
        formattedValue = formattedValue === 'true' ? true : false;
      }

      otherRelevantAttributes[formattedKey] = formattedValue;
    });
  return otherRelevantAttributes;
};
