export class UnexpectedError extends Error {
  constructor () {
    super('Algo inesperado aconteceu. Tente novamente em breve')
    this.name = 'UnexpectedError'
  }
}
