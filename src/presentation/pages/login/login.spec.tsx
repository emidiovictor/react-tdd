import React from 'react'
import { render, RenderResult,fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { IValidation } from '@/presentation/protocols/validation'

type SutTypes ={
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)

  return {
    sut,
    validationSpy
  }
}

class ValidationSpy implements IValidation {
  errorMessage: string
  input: object
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submittButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submittButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should  call validation with correct value email', () => {
    const { sut,validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({ email: 'any_email' })
  })
})
