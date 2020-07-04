export enum HttpStatusCode{
  okk = 200,
  unathorizerd = 401,
  noContent = 204,
  badRequest = 404,
  notFound = 404,
  serverError = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
