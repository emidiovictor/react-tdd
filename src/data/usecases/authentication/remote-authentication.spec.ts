import { RemoteAuthentication } from './remote-autentication'
import { HttpPostClientSpy } from '../../tests/mock-http-client'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const url = 'any_url'
    const httpPostSpyClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostSpyClient)// SYSTEM UNDER TEST
    await sut.auth()
    expect(httpPostSpyClient.url).toBe(url)
  })
})
