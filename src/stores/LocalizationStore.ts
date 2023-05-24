import { makeAutoObservable } from "mobx";

export interface Localization {
  language: string;
  strings: { [key: string]: string };
}

class LocalizationStore {}
