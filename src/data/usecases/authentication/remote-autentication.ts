import { AuthenticationParams, Authentication } from '@/domain/usecases/authentication'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredencialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/account-model'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostclient: HttpPostClient<AuthenticationParams, AccountModel>) { }

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpReponse = await this.httpPostclient.post({ url: this.url, body: params })
    switch (httpReponse.statusCode) {
      case HttpStatusCode.okk: return httpReponse.body
      case HttpStatusCode.unathorizerd: throw new InvalidCredencialsError()
      default: throw new UnexpectedError()
    }
  }
}
