import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface TypedBodyRequest<T> extends Request {
  body: T;
}

export interface TypedParamsRequest<T extends ParamsDictionary>
  extends Request {
  params: T;
}

export interface TypedRequest<T, U extends ParamsDictionary> extends Request {
  body: T;
  params: U;
}
