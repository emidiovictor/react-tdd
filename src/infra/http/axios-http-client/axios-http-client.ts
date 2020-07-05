import { HttpPostParams, HttpResponse, HttpPostClient } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClientAdapter implements HttpPostClient<any,any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
