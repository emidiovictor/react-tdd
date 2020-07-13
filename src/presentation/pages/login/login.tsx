import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/context/form/form-contex'
import { IValidation } from '@/presentation/protocols/validation'
import React, { memo, useEffect, useState } from 'react'
import Styles from './login.styles.scss'
import { Authentication } from '@/domain/usecases/authentication'

type PropsLogin ={
  validation: IValidation
  authentication: Authentication
}

const Login: React.FC<PropsLogin> = ({ validation,authentication }: PropsLogin) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    emailError: '',
    passwordError: '',
    email: '',
    password: ''

  })

  useEffect(() => {
    setState({ ...state, emailError: validation.validate('email', state.email),passwordError: validation.validate('password', state.password) })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      setState({ ...state, isLoading: true })
      if (state.isLoading || state.emailError || state.passwordError) return
      await authentication.auth({ email: state.email , password: state.password })
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <Context.Provider value ={{ state,setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email"
            name="email"
            placeholder="Digite seu e-mail"></Input>

          <Input type="password"
            name="password"
            placeholder="Digite sua senha"></Input>]
          <button className={Styles.submit} disabled={!!state.emailError || !!state.passwordError} data-testid="submit" type="submit">
          Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus/>
        </form>
      </Context.Provider>
      <Footer/>
    </div>
  )
}

export default memo(Login)
