import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { InvalidCredencialsError } from '@/domain/models/errors/invalid-credencials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/models/errors/unexpeted-error'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostclient: HttpPostClient) { }

  async auth (params: AuthenticationParams): Promise<void> {
    const httpReponse = await this.httpPostclient.post({ url: this.url, body: params })
    switch (httpReponse.statusCode) {
      case HttpStatusCode.okk: break
      case HttpStatusCode.unathorizerd: throw new InvalidCredencialsError()
      default: throw new UnexpectedError()
    }
  }
}
