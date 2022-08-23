export default class IncorrectDataError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'IncorrectDataError';
  }
}
