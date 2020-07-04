import { RemoteAuthentication } from './remote-autentication'
import { HttpPostClientSpy } from '../../tests/mock-http-client'
import faker from 'faker'
type SutTypes = {
  sut: RemoteAuthentication
  httpPostSpyClient: HttpPostClientSpy
}

const makeSut = (fakeUrl: string = faker.internet.url()): SutTypes => {
  const httpPostSpyClient = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(fakeUrl, httpPostSpyClient)// SYSTEM UNDER TEST
  return { sut, httpPostSpyClient }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostSpyClient } = makeSut(url)
    await sut.auth()
    expect(httpPostSpyClient.url).toBe(url)
  })
})
