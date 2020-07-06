import React from 'react'
import Styles from './login.styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Logo from '@/presentation/components/logo/logo'
const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo/>
        <h1>4Devs = Enquetes para devs</h1>
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          ></input>
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          ></input>
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <span className={Styles.error}>Error</span>
          <Spinner className={Styles.spinner} />
        </div>
      </form>
      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login
