import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation } from '..'
import { EmailValidation } from '../email/email-valition'
import { MinLengthValidation } from '../min-lenght/min-length-validation'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation ', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
  test('Should return EmailValidation ', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
  test('Should return Minlenght ', () => {
    const validations = sut.field('any_field').min(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field',5)])
  })
})
