import React from 'react'
import Styles from './form-status.styles.scss'
import Spinner from '../spinner/spinner'

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <span className={Styles.error}>Error</span>
      <Spinner className={Styles.spinner} />
    </div>
  )
}

export default FormStatus
