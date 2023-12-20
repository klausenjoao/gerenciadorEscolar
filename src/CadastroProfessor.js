const getLocalStorage = () => JSON.parse(localStorage.getItem('db_professor')) ?? []
const setLocalStorage = (dbProfessor) => localStorage.setItem("db_professor", JSON.stringify(dbProfessor))

//READ
const readProfessor = () => getLocalStorage()

//CRUD- CREATE
const createProfessor = (professor) => {
    const dbProfessor = getLocalStorage()
    dbProfessor.push(professor)
    setLocalStorage(dbProfessor)
}

//Limpa os campos após o cadastro
const clearFields = () => {
    const fields = document.querySelectorAll('.input-box')
    fields.forEach(field => field.value = "")
}

//Verifica o preenchimento
const isValidfields = () => {
    return document.getElementById('form').reportValidity()
  }


//INTERAÇÃO COM LAYOUT
const cadastroProfessor = () => {
    if (isValidfields()) {
        const professor = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            number: document.getElementById('number').value,
        }
        createProfessor(professor)
        clearFields()
    }
}

//EVENTOS
document.getElementById('cadastrarProfessor')
    .addEventListener('click', cadastroProfessor)
    console.log()