import axios from 'axios'
import faker from 'faker'
export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const mockedAxiosReponse = {
    data: faker.random.objectElement(), status: faker.random.number()
  }
  mockedAxios.post.mockResolvedValue(mockedAxiosReponse)
  return mockedAxios
}
