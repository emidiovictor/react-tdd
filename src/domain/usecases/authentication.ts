import { AccountModel } from 'domain/models/account-model'

interface AuthenticationParams {
  email: string
  passoword: string
}
export interface Authentication {

  auth(params: AuthenticationParams): Promise<AccountModel>
}
