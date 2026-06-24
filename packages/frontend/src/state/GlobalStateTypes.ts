import type { Draft } from "immer";
import type { DataModuletypes } from "./modules/DataModule/DataModuleTypes";

export type GlobalStateTypes = DataModuletypes;

export interface SetState<T> {
  (partial: Partial<T> | ((state: Draft<T>) => void), replace?: false): void;
  (partial: T | ((state: Draft<T>) => void), replace: true): void;
}

export type GetState<T> = () => T;

export interface GlobalStateApiType {
  set: SetState<GlobalStateTypes>;
  get: GetState<GlobalStateTypes>;
}
