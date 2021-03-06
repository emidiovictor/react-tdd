import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export class AuthenticationSpy implements Authentication {
  callsCount = 0
  account = mockAccountModel()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
