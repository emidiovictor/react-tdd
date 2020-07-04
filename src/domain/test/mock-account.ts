import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'
import { AccountModel } from '../models/account-model'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  passoword: faker.internet.password()
})
export const mockAccountModel = (): AccountModel => ({
  acessToken: faker.random.uuid()
})
