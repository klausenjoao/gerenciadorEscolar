
function logar() {
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;


    if (login == "admin" && senha == "admin") {
        alert('Sucesso')
        location.href = "home.html";
    }
    else {
        alert('Usuário ou senha incorretos');
    }
}

function back() {
    var confirmacao = confirm("Deseja realmente sair?");

    if (confirmacao) {
        // Aqui você pode adicionar a lógica para sair ou redirecionar para outra página
        // Por exemplo:
        window.location.href = "./index.html";
    }
}