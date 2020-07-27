import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'
import faker from 'faker'
type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}
const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const error1 = faker.random.word()
    fieldValidationsSpy[0].error = new Error(error1)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(error1)
  })
  test('Should returns falsy if all fields has no error', () => {
    const fieldName = faker.database.column()

    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
