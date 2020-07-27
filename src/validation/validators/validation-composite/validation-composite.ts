import { FieldValidation } from '@/validation/protocols/field-validation'
import { IValidation } from '@/presentation/protocols/validation'

export class ValidationComposite implements IValidation {
  constructor (private readonly validators: FieldValidation[]) {
  }

  validate (fieldName: string, fieldValue: string): string {
    const validatorsFiltered = this.validators.filter(x => x.field === fieldName)
    for (const validators of validatorsFiltered) {
      const error = validators.validate(fieldValue)
      if (error) return error.message
    }
    return null
  }
}
