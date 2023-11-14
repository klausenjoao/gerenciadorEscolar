const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_professor")) ?? [];
const setLocalStorage = (dbProfessor) =>
  localStorage.setItem("db_professor", JSON.stringify(dbProfessor));

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};
//READ
const readProfessor = () => getLocalStorage();

const isValidFields = () => {
  return document.getElementById('form').reportValidity()
}

//DELETE
const deleteProfessor = (index) => {
  const dbProfessor = readProfessor()
  dbProfessor.splice(index, 1)
  setLocalStorage(dbProfessor)
}

//Cria linha na Tabela
const createRow = (professor, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${professor.firstName}</td>
    <td>${professor.lastName}</td>
    <td>${professor.email}</td>
    <td>${professor.number}</td>
    <td>
    <button type="button" class="button green" id='edit-${index}'>Editar</button>
    </td>
    <td>
    <button type="button" class="button red" id='delete-${index}'>Excluir</button>
    </td>
`;
  document.querySelector("#tableProfessor>tbody").appendChild(newRow);
};

//CRUD- CREATE
const createProfessor = (professor) => {
  const dbProfessor = getLocalStorage();
  dbProfessor.push(professor);
  setLocalStorage(dbProfessor);
};

//Verifica o preenchimento
const isValidfields = () => {
  return document.getElementById('form').reportValidity()
}

//UPDATE
const updateProfessor = (index, professor) => {
  const dbProfessor = readProfessor()
  dbProfessor[index] = professor
  setLocalStorage(dbProfessor)
}

//INTERAÇÃO COM LAYOUT
const cadastroProfessor = () => {
  if (isValidfields()) {
    const professor = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      number: document.getElementById("number").value,
      password: document.getElementById("password").value,
    };
    const index = document.getElementById("firstName").dataset.index;
    if ((index == "new")) {
      createProfessor(professor);
      clearFields();
    } else {
      updateProfessor(index, professor)
      updateTable()
      closeModal()
    }
  }
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableProfessor>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

//atualiza os dados na tabela
const updateTable = () => {
  const dbProfessor = readProfessor();
  clearTable();
  dbProfessor.forEach(createRow);
};

const fillFields = (professor) => {
  document.getElementById("firstName").value = professor.firstName;
  document.getElementById("lastName").value = professor.lastName;
  document.getElementById("email").value = professor.email;
  document.getElementById("number").value = professor.number;
  document.getElementById("password").value = professor.password;
  document.getElementById("firstName").dataset.index = professor.index
};

const editProfessor = (index) => {
  const professor = readProfessor()[index];
  professor.index = index
  fillFields(professor);
  openModal();
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editProfessor(index);
    } else {
      const professor = readProfessor()[index]
      const response = confirm(`Deseja realmente excluir o professor ${professor.firstName}?`)
      if (response) {
        deleteProfessor(index)
        updateTable()
      }
    }
  }
};

updateTable();

//Eventos
document
  .querySelector("#tableProfessor>tbody")
  .addEventListener("click", editDelete);

document.getElementById("cancelar").addEventListener("click", closeModal);

document.getElementById('btnSalvar')
  .addEventListener('click', cadastroProfessor)
