import { makeAutoObservable } from "mobx";

class UIStore {
  isModalOpen = false;
  errorMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = "";
    }, 4000);
  }
}

const uiStore = new UIStore();

export default uiStore;
