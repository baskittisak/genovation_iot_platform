export interface TypedBodyRequest<Request> extends Express.Request {
  body: Request;
}
