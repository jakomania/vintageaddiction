const localStorage = require("localStorage");
//var storage = require( "./storage.js");
//import { v4 as uuidv4 } from "uuid";


class Register {

  fields = {};
  errors = {};
  //storage = new LocalStorage();

  constructor(formFields) {
    this.username = formFields.username;
    this.email = formFields.email;
    this.password = formFields.pass;
    this.room = formFields.room;
    this.avatar = formFields.avatar;
    }  

    getUsername() { return this.username; }    


    

  }


module.exports = { Register }
  // onSelectAvatar(e) {
  //   const avatarId = e.target.id;
  //   const avatarDiv = document.getElementById(avatarId);
  //   this.selectAvatar(avatarDiv);
  // }

  // selectAvatar(selected) {
  //   const avatars = this.avatarWrapper.querySelectorAll(".a-avatar");
  //   avatars.forEach((avatar) => {
  //     avatar.classList.remove("active");
  //   });

  //   selected.classList.add("active");
  // }

  // assignListeners() {
  //   const avatars = this.avatarWrapper.querySelectorAll(".a-avatar");
  //   avatars.forEach((avatar) => {
  //     avatar.addEventListener("click", this.onSelectAvatar.bind(this));
  //   });

  //   this.form.addEventListener("submit", this.send.bind(this));
  // }

  // resetForm() {
  //   for (let field in this.fields) {
  //     const fieldEl = this.fields[field];
  //     fieldEl.value = "";
  //     if (fieldEl.name === "favouriteRoom") {
  //       fieldEl.element.value = "0";
  //     } else {
  //       fieldEl.element.value = "";
  //     }
  //   }

  //   const defaultAvatar = document.getElementById("avatar1");
  //   this.selectAvatar(defaultAvatar);
  // }

  // validateName(name, element, value) {
  //   const isValid = value !== "";
  //   const message = isValid ? "" : "El nombre no puede estar vacío";

  //   if (isValid) {
  //     delete this.errors[name];
  //     element.classList.remove("is-invalid");
  //     document.getElementById(`${element.id}_error`).innerHTML = "";
  //     this.fields[name].value = value;
  //     return;
  //   } else {
  //     this.fields[name].value = "";
  //   }

  //   this.errors[name] = {
  //     element: element,
  //     message,
  //   };
  // }

  // validateEmail(name, element, value) {
  //   let message, isValid;

  //   if (value === "") {
  //     message = "El email no puede estar vacío";
  //     isValid = false;
  //   }

  //   if (value !== "") {
  //     const regex =
  //       /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //     isValid = regex.test(value);
  //     message = isValid ? "" : "El email no es válido";
  //   }

  //   if (isValid) {
  //     delete this.errors[name];
  //     element.classList.remove("is-invalid");
  //     document.getElementById(`${element.id}_error`).innerHTML = "";
  //     this.fields[name].value = value;
  //     return;
  //   } else {
  //     this.fields[name].value = "";
  //   }

  //   this.errors[name] = {
  //     element: element,
  //     message,
  //   };
  // }

  // validatePassword(name, element, value) {
  //   const isValid = value !== "";
  //   const message = isValid ? "" : "El password no puede estar vacío";

  //   if (isValid) {
  //     delete this.errors[name];
  //     element.classList.remove("is-invalid");
  //     document.getElementById(`${element.id}_error`).innerHTML = "";
  //     this.fields[name].value = value;
  //     return;
  //   } else {
  //     this.fields[name].value = "";
  //   }

  //   this.errors[name] = {
  //     element: element,
  //     message,
  //   };
  // }

  // validateFavouriteRoom(name, element, value) {
  //   const isValid = value !== "0";
  //   const message = isValid ? "" : "Debes seleccionar una sala";

  //   if (isValid) {
  //     delete this.errors[name];
  //     element.classList.remove("is-invalid");
  //     document.getElementById(`${element.id}_error`).innerHTML = "";
  //     this.fields[name].value = value;
  //     return;
  //   } else {
  //     this.fields[name].value = "";
  //   }

  //   this.errors[name] = {
  //     element: element,
  //     message,
  //   };
  // }

  // registerFields() {
  //   const requiredFields = [
  //     {
  //       name: "nameInput",
  //       element: this.nameInput,
  //       validate: this.validateName.bind(this),
  //     },
  //     {
  //       name: "emailInput",
  //       element: this.emailInput,
  //       validate: this.validateEmail.bind(this),
  //     },
  //     {
  //       name: "passwordInput",
  //       element: this.passwordInput,
  //       validate: this.validatePassword.bind(this),
  //     },
  //     {
  //       name: "favouriteRoom",
  //       element: this.favouriteRoom,
  //       validate: this.validateFavouriteRoom.bind(this),
  //     },
  //   ];
  //   requiredFields.forEach((field) => {
  //     this.fields[field.name] = {
  //       name: field.name,
  //       validate: field.validate,
  //       element: field.element,
  //       value: "",
  //     };
  //   });
  // }

  // init() {
  //   this.redirectToRooms();
  //   this.assignListeners();
  //   this.registerFields();
  // }

  // saveUser(data) {
  //   const allUSers = this.local.getLocalStorage("users");
  //   const newUser = data;

  //   if (!allUSers || allUSers.length === 0) {
  //     this.local.setLocalStorage("users", [newUser]);
  //     this.resetForm();
  //     this.showSuccesMessage();
  //     return;
  //   }

  //   const existUSer = allUSers.find((user) => user.email === newUser.email);
  //   if (existUSer) {
  //     this.showErrorMessage("Ya existe un usuario con este email");
  //     return;
  //   }

  //   allUSers.push(newUser);
  //   this.local.setLocalStorage("users", allUSers);
  //   this.resetForm();
  //   this.showSuccesMessage();
  // }

  // showErrorMessage(message) {
  //   const messageElement = document.getElementById("errorMessage");
  //   messageElement.innerHTML = message;
  //   messageElement.classList.remove("d-none");
  // }

  // showSuccesMessage() {
  //   const message = "Tu usuario se ha registrado correctamente.";
  //   const messageElement = document.getElementById("successMessage");
  //   const loginButton = document.getElementById("successButton");
  //   const submitButton = document.getElementById("submitButton");
  //   messageElement.innerHTML = message;
  //   messageElement.classList.remove("d-none");
  //   loginButton.classList.remove("d-none");
  //   submitButton.classList.add("d-none");

  //   setTimeout(() => {
  //     messageElement.classList.add("d-none");
  //     submitButton.classList.remove("d-none");
  //   }, 2000);
  // }

  // send(e) {
  //   e.preventDefault();
  //   const fields = this.fields;

  //   const errorMessageElement = document.getElementById("errorMessage");
  //   errorMessageElement.classList.add("d-none");

  //   Object.keys(fields).forEach((field) => {
  //     this.fields[field].validate(
  //       fields[field].name,
  //       fields[field].element,
  //       fields[field].element.value
  //     );
  //   });

  //   const existErrors = Object.keys(this.errors).length !== 0;

  //   if (existErrors) {
  //     Object.keys(this.errors).forEach((error) => {
  //       const inputElement = this.errors[error].element;
  //       const msgErrorElement = `${inputElement.id}_error`;
  //       inputElement.classList.add("is-invalid");
  //       document.getElementById(msgErrorElement).innerHTML =
  //         this.errors[error].message;
  //     });
  //     return;
  //   }

  //   const data = {
  //     id: uuidv4(),
  //     name: this.fields.nameInput.value,
  //     email: this.fields.emailInput.value,
  //     password: this.fields.passwordInput.value,
  //     avatar: `mod${this.avatarWrapper.querySelector(".active").dataset.mod}`,
  //     favouriteRoom: this.fields.favouriteRoom.value,
  //     color: `mod${this.avatarWrapper.querySelector(".active").dataset.mod}`,
  //   };

  //   // Evento para enviar la información al localStorage, al apartado de usuaros registrados
  //   this.saveUser(data);
  // }

  // redirectToRooms(){
  //   let user = this.local.getLocalStorage("me", "session");
  //   if(user){
  //     window.location.href = "/rooms";
  //   }
  // }




//export default Register;
