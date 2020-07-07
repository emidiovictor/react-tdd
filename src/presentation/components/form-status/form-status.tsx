import React, { useContext } from 'react'
import Styles from './form-status.styles.scss'
import Spinner from '../spinner/spinner'
import Context from '@/presentation/context/form/form-contex'
const FormStatus: React.FC = () => {
  const { isLoading,errorMessage } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {errorMessage && <span className={Styles.error}>Error</span>}
      {isLoading && <Spinner className={Styles.spinner} />}
    </div>
  )
}

export default FormStatus
