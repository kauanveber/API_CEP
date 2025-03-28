
function loadLogradouro(cep) {
    fetch(`http://viacep.com.br/ws/${cep}/json`)
        .then(data => data.json())
        .then(dados => buscarDados(dados))
}

function buscarDados(dados) {
    document.getElementById("logradouro").value = dados.logradouro
    document.getElementById("bairro").value = dados.bairro
    document.getElementById("cidade").value = dados.localidade
    document.getElementById("uf").value = dados.uf
    document.getElementById("ibge").value = dados.ibge
}





