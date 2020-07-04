import { HttpPostClient } from '@/data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostclient: HttpPostClient) { }

  async auth (): Promise<void> {
    return await this.httpPostclient.post({ url: this.url })
  }
}
