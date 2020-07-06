import React,{ memo } from 'react'
import Styles from './login.styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email"
          name="email"
          placeholder="Digite seu e-mail"></Input>

        <Input type="password"
          name="password"
          placeholder="Digite sua senha"></Input>
        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus></FormStatus>
      </form>
      <Footer></Footer>
    </div>
  )
}

export default memo(Login)
