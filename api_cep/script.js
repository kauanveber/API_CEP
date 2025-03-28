
function loadLogradouro(cep) {
    fetch(`http://viacep.com.br/ws/${cep}/json`)
        .then(data => data.json())
        .then(dados => {
            if (dados.erro) {
                erro("CEP não encontrado");
            } else {
                buscarDados(dados);
            }
        })
        .catch(err => erro(err.message));
}

function buscarDados(dados) {
    
    
    document.getElementById("logradouro").value = dados.logradouro
    document.getElementById("bairro").value = dados.bairro
    document.getElementById("cidade").value = dados.localidade
    document.getElementById("uf").value = dados.uf
    document.getElementById("ibge").value = dados.ibge
    
}
function erro(erro) {
    alert("Erro: " + erro);
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("ibge").value = "";
}





