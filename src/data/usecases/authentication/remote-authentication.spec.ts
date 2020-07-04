import { RemoteAuthentication } from './remote-autentication'
import { HttpPostClientSpy } from '@/data/tests/mock-http-client'
import faker from 'faker'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { InvalidCredencialsError } from '@/domain/models/errors/invalid-credencials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/models/errors/unexpeted-error'
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
    await sut.auth(mockAuthentication())
    expect(httpPostSpyClient.url).toBe(url)
  })
  test('Should call HttpPostClient with correct body ', async () => {
    const { sut, httpPostSpyClient } = makeSut()
    const authParams = mockAuthentication()
    await sut.auth(authParams)
    expect(httpPostSpyClient.body).toEqual(authParams)
  })
  test('Should throw invalid credencial error if httppostclient returns 401', async () => {
    const { sut, httpPostSpyClient } = makeSut()
    httpPostSpyClient.response = {
      statusCode: HttpStatusCode.unathorizerd
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new InvalidCredencialsError())
  })
  test('Should throw UnexpectedError if httppostclient returns 400', async () => {
    const { sut, httpPostSpyClient } = makeSut()
    httpPostSpyClient.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if httppostclient returns 500', async () => {
    const { sut, httpPostSpyClient } = makeSut()
    httpPostSpyClient.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if httppostclient returns 404', async () => {
    const { sut, httpPostSpyClient } = makeSut()
    httpPostSpyClient.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promisse = sut.auth(mockAuthentication())
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
})
