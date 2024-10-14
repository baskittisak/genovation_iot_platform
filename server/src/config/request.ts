export interface TypedBodyRequest<T> extends Express.Request {
  body: T;
}
