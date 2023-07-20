const options = document.querySelectorAll(".option input");
const lengthNumber = document.querySelector(".pass-length input");
const lengthValue = document.querySelector(".pass-length span");
const passwordInput = document.querySelector(".input-box input");
const generateBtn = document.querySelector(".generate-btn");
const errorMessage = document.querySelector(".error-message");

const passwordType = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  symbol: '!@#$%^&*()_+-={}[]|:;"<>,.?/~`',
  number: '0123456789'
}

const getRandomChar = (characters) => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

const updateNumberRange = () => lengthValue.textContent = lengthNumber.value;
addEventListener("input", updateNumberRange);

const generatePassword = () => {
  let chars = '';
  let password = '';
  let passLength = lengthNumber.value;

  options.forEach(option => {
    if (option.checked) {
      chars += passwordType[option.id];
    } 
  })

  if (chars === '') {
    errorMessage.textContent = 'Selecione pelo menos um tipo de caractere.';
    passwordInput.value = '';
    return;
  }

  errorMessage.textContent = '';

  for (let i = 0; i < passLength; i++) {
    password += getRandomChar(chars);
  }

  passwordInput.value = password;
}

const copyToClipboard = async () => {
  const passwordText = document.querySelector('.password').value;
  const btnCopy = document.querySelector('.btn-copy');
  const originalIcon = btnCopy.innerHTML;
  try {
    await navigator.clipboard.writeText(passwordText);
    btnCopy.innerHTML = '<i class="fa-solid fa-check"></i>'; // display the check icon

    setTimeout(() => {
      btnCopy.innerHTML = originalIcon;
    }, 2000); // Restores the original icon

  } catch (error) {
    alert('Erro ao copiar para a área de transferência:'+ error);
  }
};

generateBtn.addEventListener("click", generatePassword);
document.querySelector('.btn-copy').addEventListener('click', copyToClipboard);