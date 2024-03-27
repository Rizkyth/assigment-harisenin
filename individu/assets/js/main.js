const valueEmail = document.querySelector("#email");
const valuePassowrd = document.querySelector("#password");
const btnSubmit = document.querySelector("#btn-submit");
const form = document.querySelector("#signup");
const popOut = document.querySelector("#popout");
const btnPopOut = document.querySelector("#btn-popout");

// VALIDASI
// validasi jika input yang dimasukkan kosong maka akan mereturn falsy
const isRequired = (value) => value.trim() !== "";

// tampilan error
const showError = (input, massage) => {
  // ambil element
  const formField = input.parentElement;
  const error = formField.querySelector("p");

  //   add class
  formField.classList.remove("success");
  formField.classList.add("error");
  // add error massage
  error.innerText = massage;
};

// Tampilan successs
const showSuccess = (input, massage) => {
  const formField = input.parentElement;
  const error = formField.querySelector("p");

  // add class
  formField.classList.remove("error");
  formField.classList.add("success");
  //   hide error massage
  error.innerText = massage;
};

// validasi isi email apakah isi dari email tersebut mengandung dari variabel regex
const isEmailValid = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

// validasi email
const checkEmail = () => {
  let valid = false;
  const email = valueEmail.value.trim();
  if (!isRequired(email)) {
    showError(valueEmail, "email harus diisi");
  } else if (!isEmailValid(email)) {
    showError(valueEmail, "email tidak valid");
  } else {
    showSuccess(valueEmail, "email valid");
    valid = true;
  }
  return valid;
};

// valiadasi password
const isPasswordSecure = (password) => {
  const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
  return regex.test(password);
};
// validasi password
const checkPassword = () => {
  let valid = false;
  const password = valuePassowrd.value.trim();
  if (!isRequired(password)) {
    showError(valuePassowrd, "password harus diisi");
  } else if (!isPasswordSecure(password)) {
    showError(valuePassowrd, "password harus lebih dari 8 karakter, kombinasi huruf besar dan number");
  } else {
    showSuccess(valuePassowrd, "password aman");
    valid = true;
  }
  return valid;
};

// delay function di jalankan
const debonce = (fn, delay = 500) => {
  let timoutId;
  return (...args) => {
    if (timoutId) {
      clearTimeout(timoutId);
    }
    timoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// validasi input

form.addEventListener(
  "input",
  debonce((e) => {
    // mentargetkan attribute id.pada element
    switch (e.target.id) {
      case "email": // id='email'
        checkEmail();
        break;
      case "password": // id ='password'
        checkPassword();
        break;
    }
  })
);

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const pesan = popOut.querySelector("p");
  const icon = popOut.querySelector("ion-icon");
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isFormValid = isEmailValid && isPasswordValid;
  if (isFormValid) {
    popOut.classList.add("active");
    pesan.innerText = "Login Berhasil";
    icon.classList.add("success");
  } else {
    popOut.classList.add("active");
    pesan.innerText = "Login gagal";
    icon.attributes.item(0).nodeValue = "close";
    icon.classList.add("error");
  }
});

btnPopOut.addEventListener("click", () => {
  popOut.classList.remove("active");
});
