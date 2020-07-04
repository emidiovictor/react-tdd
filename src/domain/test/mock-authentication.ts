import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'
export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  passoword: faker.internet.password()
})
