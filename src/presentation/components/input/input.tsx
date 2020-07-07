import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/context/form/form-contex'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props > = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name]

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  return (
    <div className={Styles.inputWrap}>
      <input
        readOnly onFocus={enableInput}
        {...props}
      ></input>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
