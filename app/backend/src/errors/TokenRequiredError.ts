export default class TokenRequiredError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'TokenRequiredError';
  }
}
