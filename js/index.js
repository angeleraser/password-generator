import { createPassword } from "./utils.js";

const form = document.getElementById("form");
const constraintsList = document.getElementById("constraints");
const lengthSelector = document.getElementById("length-selector");
const input = document.getElementById("input");
const copyPasswordBtn = document.getElementById("copy-password-btn");

let generatedPassword = "";
const selectedConstraints = {
  lowercase: false,
  uppercase: false,
  numbers: false,
  symbols: false,
};

Object.keys(selectedConstraints).forEach(function (name) {
  const label = document.createElement("label");
  label.classList.add("checkbox-field");

  const title = document.createElement("h2");
  title.classList.add("checkbox-label");
  title.textContent = `Include ${
    name.includes("case") ? `${name} letter` : name
  }`;

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("data-constraint", name);
  input.setAttribute("name", name);
  input.setAttribute("id", name);

  if (selectedConstraints[name]) input.setAttribute("checked", true);

  input.addEventListener("change", function ({ target: { checked } }) {
    selectedConstraints[name] = checked;
  });

  label.append(title, input);
  constraintsList.append(label);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const constraintNames = Object.keys(selectedConstraints).filter(
    (name) => selectedConstraints[name]
  );

  if (constraintNames.length) {
    generatedPassword = createPassword({
      length: lengthSelector.value,
      constraints: constraintNames,
    });

    input.value = generatedPassword;
  }
});

copyPasswordBtn.addEventListener("click", function () {
  if (generatedPassword) {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  }
});