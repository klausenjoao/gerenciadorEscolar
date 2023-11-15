const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Aluno')) ?? []
const setLocalStorage = (dbAluno) => localStorage.setItem("db_Aluno", JSON.stringify(dbAluno))

//UPDATE
const updateAluno = (index, Aluno) => {
    const dbAluno = readAluno()
    dbAluno[index] = Aluno
    setLocalStorage(dbAluno)
}

//READ
const readAluno = () => getLocalStorage()

//DELETE
const deleteAluno = (index) => {
    const dbAluno = readAluno()
    dbAluno.splice(index, 1)
    setLocalStorage(dbAluno)
}

//CRUD- CREATE
const createAluno = (Aluno) => {
    const dbAluno = getLocalStorage()
    dbAluno.push(Aluno)
    setLocalStorage(dbAluno)
}

//Verifica o preenchimento
const isValidfields = () => {
    return document.getElementById('form-aluno').reportValidity()
}

//Limpa os campos após o cadastro
const clearFields = () => {
    const fields = document.querySelectorAll('.input-box-aluno')
    fields.forEach(field => field.value = "")
}

//INTERAÇÃO COM LAYOUT
const cadastroAluno = () => {
    if (isValidfields()) {
        const Aluno = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            number: document.getElementById('number').value,
        }
        createAluno(Aluno)
        clearFields()
    }
}

//EVENTOS
document.getElementById('cadastrarAluno')
    .addEventListener('click', cadastroAluno)
    console.log()