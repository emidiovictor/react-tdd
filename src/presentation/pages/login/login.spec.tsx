import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy

}

type SutParams = {
  validationError: string

}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />)

  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populatEmailField(sut, email)
  populatePasswordField(sut, password)
  const submittButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submittButton)
}

const populatEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}
const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusFormField = (sut: RenderResult,fieldName: string,validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(!validationError ? '✅' : '🔴')
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submittButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submittButton.disabled).toBe(true)

    simulateStatusFormField(sut,'email', validationError)
    simulateStatusFormField(sut,'password', validationError)
  })

  test('Should  show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })
    populatEmailField(sut)
    simulateStatusFormField(sut,'email', validationError)
  })
  test('Should  show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })
    populatePasswordField(sut)
    simulateStatusFormField(sut,'password', validationError)
  })
  test('Should show valid password state if validation succed', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateStatusFormField(sut,'password')
  })
  test('Should show valid email state if validation succed', () => {
    const { sut } = makeSut()
    populatEmailField(sut)
    simulateStatusFormField(sut,'email')
  })
  test('Should enable submit button if forms is valid', () => {
    const { sut } = makeSut()
    populatEmailField(sut)
    populatePasswordField(sut)

    const submittButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submittButton.disabled).toBe(false)
  })
  test('Should show error on submit event', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call auhtentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const password = faker.internet.password()
    const email = faker.internet.email()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
  test('Should call auhtentication only once', () => {
    const { sut,authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })
})
