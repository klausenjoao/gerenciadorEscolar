const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_Aluno")) ?? [];
const setLocalStorage = (dbAluno) =>
  localStorage.setItem("db_Aluno", JSON.stringify(dbAluno));

const openModal = () =>
  document.getElementById("modal-aluno").classList.add("active");

const closeModal = () => {
  clearFields();
  document.getElementById("modal-aluno").classList.remove("active");
};

//READ
const readAluno = () => getLocalStorage();

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

//Limpa os campos após o cadastro
const clearFields = () => {
  const fields = document.querySelectorAll(".input-box");
  fields.forEach((field) => (field.value = ""));
};

//DELETE
const deleteAluno = (index) => {
  const dbAluno = readAluno();
  dbAluno.splice(index, 1);
  setLocalStorage(dbAluno);
};

//Cria linha na Tabela
const createRowAluno = (aluno, index) => {
  const newRowAluno = document.createElement("tr");
  newRowAluno.innerHTML = `
      <td>${aluno.firstName}</td>
      <td>${aluno.lastName}</td>
      <td>${aluno.email}</td>
      <td>${aluno.number}</td>
      <td>
    <button type="button" id='edit-${index}'>Editar</button>
    </td>
    <td>
    <button type="button" id='delete-${index}'>Excluir</button>
    </td>
`;
  document.querySelector("#tableAluno>tbody").appendChild(newRowAluno);
};

//CRUD- CREATE
const createAluno = (aluno) => {
  const dbAluno = getLocalStorage();
  dbAluno.push(aluno);
  setLocalStorage(dbAluno);
};

//UPDATE
const updateAluno = (index, aluno) => {
  const dbAluno = readAluno();
  dbAluno[index] = aluno;
  setLocalStorage(dbAluno);
};

//INTERAÇÃO COM LAYOUT
const cadastroAluno = () => {
  if (isValidFields()) {
    const aluno = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      number: document.getElementById("number").value,
    };
    const index = document.getElementById("firstName").dataset.index;
    if (index == "new") {
      createAluno(aluno);
      clearFields();
    } else {
      updateAluno(index, aluno);
      updateTable();
      closeModal();
    }
  }
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableAluno>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

//atualiza os dados na tabela
const updateTable = () => {
  const dbAluno = readAluno();
  clearTable();
  dbAluno.forEach(createRowAluno);
};

const fillFields = (aluno) => {
  document.getElementById("firstName").value = aluno.firstName;
  document.getElementById("lastName").value = aluno.lastName;
  document.getElementById("email").value = aluno.email;
  document.getElementById("number").value = aluno.number;
  document.getElementById("firstName").dataset.index = aluno.index;
};

const editAluno = (index) => {
  const Aluno = readAluno()[index];
  Aluno.index = index;
  fillFields(Aluno);
  openModal();
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editAluno(index);
    } else {
      const aluno = readAluno()[index];
      const response = confirm(
        `Deseja realmente excluir o aluno ${aluno.firstName}?`
      );
      if (response) {
        deleteAluno(index);
        updateTable();
      }
    }
  }
};

updateTable();

//Eventos
document
  .querySelector("#tableAluno>tbody")
  .addEventListener("click", editDelete);

document.getElementById("cancelar").addEventListener("click", closeModal);

document.getElementById("btnSalvar").addEventListener("click", cadastroAluno);
