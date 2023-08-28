function back() {
    var confirmacao = confirm("Deseja realmente sair?");

    if (confirmacao) {
        window.location.href = "./index.html";
    }
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_professor')) ?? []
const setLocalStorage = (dbProfessor) => localStorage.setItem("db_professor", JSON.stringify(dbProfessor))
const modal = document.querySelector('.modal-container')

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
}

//READ
const readProfessor = () => getLocalStorage()

//DELETE
const deleteProfessor = (index) => {
    const dbProfessor = readProfessor()
    dbProfessor.splice(index, 1)
    setLocalStorage(dbProfessor)
}

//Cria linha na Tabela
const createRow = (professor, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${professor.firstName}</td>
    <td>${professor.lastName}</td>
    <td>${professor.email}</td>
    <td>${professor.number}</td>
    <td class="acao">
      <button id="button i" onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button id="button i" onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
`
    document.querySelector('#tableProfessor>tbody').appendChild(newRow)
}

//atualiza os dados na tabela
const updateTable = () => {
    const dbProfessor = readProfessor()
    dbProfessor.forEach(createRow)
}

const fillFields = (professor) => {
    document.getElementById('firstName').value = professor.firstName
    document.getElementById('lastName').value = professor.lastName
    document.getElementById('email').value = professor.email
    document.getElementById('number').value = professor.number
    document.getElementById('password').value = professor.password
}

function editItem(index) {
    const professor = readProfessor()[index]
    openModal(true, index)
    fillFields(professor)

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }
}

updateTable()
