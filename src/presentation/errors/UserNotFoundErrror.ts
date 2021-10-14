export class UserNotFoundError extends Error {
  constructor(message: string) {
    super('Server Error');
    this.message = message;
  }
}
