import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}
const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut,fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[0].error = new Error('first_erro_message')
    fieldValidationsSpy[1].error = new Error('seccond_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_erro_message')
  })
})
