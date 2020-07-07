import React,{ memo, useState } from 'react'
import Styles from './login.styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import Context from '@/presentation/context/form/form-contex'
type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })
  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <Context.Provider value ={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email"
            name="email"
            placeholder="Digite seu e-mail"></Input>

          <Input type="password"
            name="password"
            placeholder="Digite sua senha"></Input>
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
