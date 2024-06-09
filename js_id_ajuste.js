function buscarNome() {
    var idDigitado = document.getElementById("inputId").value;

    var nomes = {
        "123": "João Victor",
        "456": "Maria Antonieta",
        "789": "José Roberto"
    };

    if (nomes.hasOwnProperty(idDigitado)) {
        var nomeSolicitante = nomes[idDigitado];
        window.location.href = "form.html?nome=" + encodeURIComponent(nomeSolicitante) + "&id=" + encodeURIComponent(idDigitado);
    } else {
        alert("ID não encontrado. Por favor, insira um ID válido.");
    }
}

