import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import Context from '@/presentation/context/form/form-contex'
import { IValidation } from '@/presentation/protocols/validation'
import React, { memo, useEffect, useState } from 'react'
import Styles from './login.styles.scss'

type PropsLogin ={
  validation: IValidation
}

const Login: React.FC<PropsLogin> = ({ validation }: PropsLogin) => {
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
  },[state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <Context.Provider value ={{ state,setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email"
            name="email"
            placeholder="Digite seu e-mail"></Input>

          <Input type="password"
            name="password"
            placeholder="Digite sua senha"></Input>]
          <button className={Styles.submit} disabled data-testid="submit" type="submit">
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
