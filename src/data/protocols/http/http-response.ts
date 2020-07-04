export enum HttpStatusCode{
  ok = 200,
  unaoutorized = 401,
  noContent = 204,
  badRequest = 404,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: any
}
