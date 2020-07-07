import React,{ memo, useState, useEffect } from 'react'
import Styles from './login.styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import Context from '@/presentation/context/form/form-contex'
import { IValidation } from '@/presentation/protocols/validation'

type PropsLogin ={
  validation: IValidation
}

const Login: React.FC<PropsLogin> = ({ validation }: PropsLogin) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    email: '',
    password: ''

  })

  useEffect(() => {
    validation.validate({ email: state.email })
  },[state.email])
  useEffect(() => {
    validation.validate({ password: state.password })
  },[state.password])

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
