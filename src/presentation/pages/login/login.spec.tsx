import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import React from 'react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import faker from 'faker'
import 'jest-localstorage-mock'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy

}

type SutParams = {
  validationError: string

}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>

      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>
  )

  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populatEmailField(sut, email)
  populatePasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populatEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}
const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusFormField = (sut: RenderResult,fieldName: string,validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(!validationError ? '✅' : '🔴')
}
const testErrorWrapChildCount = (sut: RenderResult,count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExits = (sut: RenderResult,fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}
const testButtonIsDisable = (sut: RenderResult, fieldName: string, isDisable: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisable)
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(localStorage.clear)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })

    testErrorWrapChildCount(sut,0)

    testButtonIsDisable(sut,'submit', true)

    testStatusFormField(sut,'email', validationError)
    testStatusFormField(sut,'password', validationError)
  })

  test('Should  show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })
    populatEmailField(sut)
    testStatusFormField(sut,'email', validationError)
  })

  test('Should  show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError: validationError })
    populatePasswordField(sut)
    testStatusFormField(sut,'password', validationError)
  })

  test('Should show valid password state if validation succed', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    testStatusFormField(sut,'password')
  })

  test('Should show valid email state if validation succed', () => {
    const { sut } = makeSut()
    populatEmailField(sut)
    testStatusFormField(sut,'email')
  })

  test('Should enable submit button if forms is valid', () => {
    const { sut } = makeSut()
    populatEmailField(sut)
    populatePasswordField(sut)

    testButtonIsDisable(sut,'submit', false)
  })

  test('Should show error on submit event', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExits(sut, 'spinner')
  })

  test('Should call auhtentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const password = faker.internet.password()
    const email = faker.internet.email()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call auhtentication only once', async () => {
    const { sut,authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call auhtentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut,authenticationSpy } = makeSut({ validationError })
    populatEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should not call auhtentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut,authenticationSpy } = makeSut({ validationError })
    populatEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should add acces token to localstorage on success and redirect to homePage', async () => {
    const { sut,authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('acessToken', authenticationSpy.account.acessToken)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
