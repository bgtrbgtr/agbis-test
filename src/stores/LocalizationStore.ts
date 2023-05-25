import { makeAutoObservable } from "mobx";
import { EN, RU } from "../constants/translations";

export interface Localization {
  language: string;
}

class LocalizationStore {
  language = "EN";

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage(language: string) {
    this.language = language;
  }

  setTranslation(key: string) {
    const [type, name] = key.split(".");

    if (this.language === "EN") {
      return EN[type][name];
    } else {
      return RU[type][name];
    }
  }
}

const loclzStore = new LocalizationStore();

export default loclzStore;
