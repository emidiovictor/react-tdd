import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams, Authentication } from '@/domain/usecases/authentication'
import { InvalidCredencialsError } from '@/domain/models/errors/invalid-credencials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/models/errors/unexpeted-error'
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
