const users = [
    { email: "ofabio63@gmail.com", password: "123", name: "Fábio Oliveira" },
    { email: "pedrogomes@gmail.com", password: "123", name: "Pedro Gomes" },
];

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (email === "" || password === "") {
        errorMessage.textContent = "Por favor, preencha todos os campos.";
        return;
    }

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('userName', user.name);
        window.location.href = 'ajuste_eng.html';
    } else {
        errorMessage.textContent = "Email ou senha incorretos.";
    }
}
