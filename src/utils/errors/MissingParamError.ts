export class MissingParamError extends Error {
  constructor(message: string) {
    super('Param Error');
    this.message = message;
  }
}
