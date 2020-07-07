import React, { useContext } from 'react'
import Styles from './form-status.styles.scss'
import Spinner from '../spinner/spinner'
import Context from '@/presentation/context/form/form-contex'
const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { mainError, isLoading } = state
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {mainError && <span className={Styles.error}>{mainError}</span>}
      {isLoading && <Spinner className={Styles.spinner} />}
    </div>
  )
}

export default FormStatus
