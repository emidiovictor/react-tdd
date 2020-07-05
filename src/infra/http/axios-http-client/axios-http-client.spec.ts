import { AxiosHttpClientAdapter } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const makeSut = (): AxiosHttpClientAdapter => {
  const sut = new AxiosHttpClientAdapter()
  return sut
}

const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement()
  }
}

const mockedAxiosReponse = {
  data: faker.random.objectElement(), status: faker.random.number()
}

mockedAxios.post.mockResolvedValue(mockedAxiosReponse)

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('Should return the correct status code and body', async () => {
    const sut = makeSut()
    const httpReponse = await sut.post(mockPostRequest())
    expect(httpReponse).toEqual({ body: mockedAxiosReponse.data, statusCode: mockedAxiosReponse.status })
  })
})
