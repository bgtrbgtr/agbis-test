import { makeAutoObservable } from "mobx";

class UIStore {
  isModalOpen = false;
  errorMessage = "";
  filterSelection = "";

  constructor() {
    makeAutoObservable(this);
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  setFilterSelection(value: string) {
    this.filterSelection = value;
  }

  clearErrorMessage() {
    this.errorMessage = "";
  }
}

const uiStore = new UIStore();

export default uiStore;
