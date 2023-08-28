const getLocalStorage = () => JSON.parse(localStorage.getItem('db_professor')) ?? []
const setLocalStorage = (dbProfessor) => localStorage.setItem("db_professor", JSON.stringify(dbProfessor))

//UPDATE
const updateProfessor = (index, professor) => {
    const dbProfessor = readProfessor()
    dbProfessor[index] = professor
    setLocalStorage(dbProfessor)
}

//READ
const readProfessor = () => getLocalStorage()

//CRUD- CREATE
const createProfessor = (professor) => {
    const dbProfessor = getLocalStorage()
    dbProfessor.push(professor)
    setLocalStorage(dbProfessor)
}

//Verifica o preenchimento
const isValidfields = () => {
    return document.getElementById('form').reportValidity()
}

//Limpa os campos após o cadastro
const clearFields = () => {
    const fields = document.querySelectorAll('.input-box')
    fields.forEach(field => field.value = "")
}

//INTERAÇÃO COM LAYOUT
const cadastroProfessor = () => {
    if (isValidfields()) {
        const professor = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            number: document.getElementById('number').value,
            password: document.getElementById('password').value,
        }
        createProfessor(professor)
        clearFields()
    }
}

//EVENTOS
document.getElementById('cadastrarProfessor')
    .addEventListener('click', cadastroProfessor)
    console.log()