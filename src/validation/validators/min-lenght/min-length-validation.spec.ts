import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(),3)
describe('MinLengthValidation', () => {
  test('Should return error if value is invalid ', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(2))
    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toBeFalsy()
  })
})
