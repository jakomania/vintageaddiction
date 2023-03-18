

class LocalStorage {
    localStorage = window.localStorage;
    sessionStorage = window.sessionStorage;
  
    setLocalStorage(key, data, type) {
      const dataToLocaltorage = JSON.stringify(data);
      if (type === "session") {
        this.sessionStorage.setItem(key, dataToLocaltorage);
      } else {
        this.localStorage.setItem(key, dataToLocaltorage);
      }
    }
  
    getLocalStorage(key, type) {
      let data;
      if (type === "session") {
        data = this.sessionStorage.getItem(key);
      } else {
        data = this.localStorage.getItem(key);
      }
  
      return JSON.parse(data);
    }
  }


module.exports = { LocalStorage }
