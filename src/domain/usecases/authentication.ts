import { AccountModel } from '../models'

export type AuthenticationParams = {
  email: string
  passoword: string
}
export interface Authentication {

  auth(params: AuthenticationParams): Promise<AccountModel>
}
