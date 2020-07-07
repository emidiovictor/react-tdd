import React, { useContext } from 'react'
import Styles from './form-status.styles.scss'
import Spinner from '../spinner/spinner'
import Context from '@/presentation/context/form/form-contex'
const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {errorState.main && <span className={Styles.error}>Error</span>}
      {state.isLoading && <Spinner className={Styles.spinner} />}
    </div>
  )
}

export default FormStatus
