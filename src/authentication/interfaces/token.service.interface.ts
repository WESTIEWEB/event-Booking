export interface ITokenIssuePayload {
  subject: string;
}

export interface ITokenPayload {
  sub: string;
}

export interface ITokenService {
  issueToken(payload: ITokenIssuePayload): string;
  verifyToken(token: string): void;
  parseToken(token: string): ITokenPayload;
}
