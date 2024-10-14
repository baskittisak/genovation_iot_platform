import { ParamsDictionary } from "express-serve-static-core";

export interface IDevice {
  name: string;
  description: string;
  feature: string[];
}

export interface IDeviceId extends ParamsDictionary {
  id: string;
}
