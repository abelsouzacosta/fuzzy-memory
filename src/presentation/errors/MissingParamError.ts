export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Param Error`);
    this.message = paramName;
  }
}
