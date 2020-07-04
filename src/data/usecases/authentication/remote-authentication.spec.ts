interface HttpPostClient{
  post(url: string): Promise<void>
}

class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostclient: HttpPostClient) { }

  async auth (): Promise<void> {
    return await this.httpPostclient.post(this.url)
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const url = 'any_url'
    const httpPostSpyClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostSpyClient)// SYSTEM UNDER TEST
    await sut.auth()
    expect(httpPostSpyClient.url).toBe(url)
  })
})
