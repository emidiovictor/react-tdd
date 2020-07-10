import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'
type SutTypes ={
  sut: RenderResult

}

type SutParams ={
  validationError: string

}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationStub()
  validationSpy.errorMessage = params?.validationError
  const sut = render(<Login validation={validationSpy}/>)

  return {
    sut
  }
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

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should  show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })

    const emailInput = sut.getByTestId('password')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })
  test('Should  show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const emailStatus = sut.getByTestId('password-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })
  test('Should show valid password state if validation succed', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const emailStatus = sut.getByTestId('password-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('✅')
  })
  test('Should show valid email state if validation succed', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.password() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('✅')
  })
  test('Should enable submit button if forms is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submittButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submittButton.disabled).toBe(false)
  })
  test('Should show error on submit event', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submittButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submittButton)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})
