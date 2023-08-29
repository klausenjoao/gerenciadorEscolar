function back() {
    var confirmacao = confirm("Deseja realmente sair?");

    if (confirmacao) {
        window.location.href = "./index.html";
    }
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Aluno')) ?? []
const setLocalStorage = (dbAluno) => localStorage.setItem("db_Aluno", JSON.stringify(dbAluno))
const modal = document.querySelector('.modal-container')

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
}


function editItem(index) {
    const aluno = readAluno()[index]
    openModal(true, index)
    fillFields(aluno)

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }
}

//DELETE
const deleteAluno = (index) => {
    const dbAluno = readAluno()
    dbAluno.splice(index, 1)
    setLocalStorage(dbAluno)
}
//READ
const readAluno = () => getLocalStorage()

//Cria linha na Tabela
const createRowAluno = (aluno, index) => {
    const newRowAluno = document.createElement('tr')
    newRowAluno.innerHTML = `
    <td>${aluno.firstName}</td>
    <td>${aluno.lastName}</td>
    <td>${aluno.email}</td>
    <td>${aluno.number}</td>
    <td class="acao">
      <button id="button i" onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button id="button i" onclick="deleteAlunoItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
`
    document.querySelector('#tableAluno>tbody').appendChild(newRowAluno)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableAluno>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

//atualiza os dados na tabela
const updateTableAluno = () => {
    const dbAluno = readAluno()
    clearTable()
    dbAluno.forEach(createRowAluno)
}

const fillFields = (aluno) => {
    document.getElementById('firstName').value = aluno.firstName
    document.getElementById('lastName').value = aluno.lastName
    document.getElementById('email').value = aluno.email
    document.getElementById('number').value = aluno.number
}

function deleteAlunoItem(index) {
    const aluno = readAluno()[index]
    const response = confirm(`Deseja realmente excluir o aluno ${aluno.firstName}`)
    if (response) {
        deleteAluno(index)
        updateTableAluno()
    }
}

updateTableAluno()