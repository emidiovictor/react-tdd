import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'
type SutTypes ={
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationStub()
  const errorMessage = faker.random.words()
  validationSpy.errorMessage = errorMessage
  const sut = render(<Login validation={validationSpy}/>)

  return {
    sut,
    validationStub: validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut,validationStub: validationSpy } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submittButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submittButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should  show email error if validation fails', () => {
    const { sut,validationStub: validationSpy } = makeSut()

    const emailInput = sut.getByTestId('password')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
  test('Should  show password error if validation fails', () => {
    const { sut,validationStub: validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
