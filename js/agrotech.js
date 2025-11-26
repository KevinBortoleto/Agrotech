document
  .getElementById("buttonLearnMore")
  .addEventListener("click", function () {
    window.location.href = "about.html";
  });

const form = document.querySelector("form");
const campos = {
  nome: document.getElementById("nome"),
  email: document.getElementById("email"),
  mensagem: document.getElementById("mensagem"),
};

function limparErros() {
  document.querySelectorAll(".erro").forEach((e) => (e.textContent = ""));
  Object.values(campos).forEach((campo) =>
    campo.classList.remove("input-error")
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  limparErros();

  let erros = [];

  const nome = campos.nome.value.trim();
  const email = campos.email.value.trim();
  const msg = campos.mensagem.value.trim();

  const nomeErro = campos.nome.nextElementSibling;
  const emailErro = campos.email.nextElementSibling;
  const msgErro = campos.mensagem.nextElementSibling;

  const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;

  if (nome === "") {
    nomeErro.textContent = "O campo 'Nome' não pode estar vazio.";
    campos.nome.classList.add("input-error");
    erros.push("Nome vazio.");
  } else {
    const partes = nome.split(" ").filter((p) => p.length > 0);

    if (!regexNome.test(nome)) {
      nomeErro.textContent =
        "O nome deve conter apenas letras (sem números ou símbolos).";
      campos.nome.classList.add("input-error");
      erros.push("Nome possui caracteres inválidos.");
    }

    if (partes.length < 2) {
      nomeErro.textContent = "Digite pelo menos nome e sobrenome.";
      campos.nome.classList.add("input-error");
      erros.push("Nome incompleto.");
    }

    if (partes.some((p) => p.length < 2)) {
      nomeErro.textContent = "Cada parte do nome deve ter pelo menos 2 letras.";
      campos.nome.classList.add("input-error");
      erros.push("Nome com palavras muito curtas.");
    }
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailErro.textContent = "O campo 'Email' não pode estar vazio.";
    campos.email.classList.add("input-error");
    erros.push("Email vazio.");
  } else if (!regexEmail.test(email)) {
    emailErro.textContent = "Digite um e-mail válido.";
    campos.email.classList.add("input-error");
    erros.push("Email inválido.");
  }

  if (msg === "") {
    msgErro.textContent = "A mensagem não pode estar vazia.";
    campos.mensagem.classList.add("input-error");
    erros.push("Mensagem vazia.");
  }

  if (msg.length > 500) {
    msgErro.textContent = "A mensagem deve ter no máximo 500 caracteres.";
    campos.mensagem.classList.add("input-error");
    erros.push("Mensagem muito longa.");
  }

  if (erros.length > 0) {
    alert("⚠ Verifique os campos destacados em vermelho.");
    return;
  }

  alert("Mensagem enviada com sucesso! ✔");
  form.reset();
});
