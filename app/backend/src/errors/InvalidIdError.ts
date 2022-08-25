export default class invalidIdError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'invalidIdError';
  }
}
