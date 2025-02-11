export class JwtException extends Error {
  constructor(message: string, public codi: number) {
    super(message);

  }
}
