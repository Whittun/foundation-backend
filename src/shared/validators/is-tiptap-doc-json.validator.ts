import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidTiptapDocJson } from 'src/shared/utils/validate-tiptap-doc-json';

@ValidatorConstraint({ name: 'isTiptapDocJson', async: false })
export class IsTiptapDocJsonConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return isValidTiptapDocJson(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid Tiptap document JSON`;
  }
}

export const IsTiptapDocJson = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTiptapDocJsonConstraint,
    });
  };
};
