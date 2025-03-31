function validarCadastro() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;

    if (nome === "") {
        alert('Por favor, preencha o campo Nome.');
        document.getElementById("nome").focus();
        return;
    } else if (email === "") {
        alert('Por favor, preencha o campo Email.');
        document.getElementById("email").focus();
        return;
    } else if (telefone === "") {
        alert('Por favor, preencha o campo Telefone.');
        document.getElementById("telefone").focus();
        return;
    } 
    alert('Cadastro realizado com sucesso!');
}

function loadLogradouro(cep) {
    if (cep.trim() === "") {
        erro("CEP não Informado. Digite um CEP");
        return;
    } else if (!/^\d{8}$/.test(cep)) {
        erro("O CEP tem que ter 8 dígitos");
        return;
    } else {
        fetch(`http://viacep.com.br/ws/${cep}/json`)
            .then(data => data.json())
            .then(dados => {
                if (dados.erro) {
                    erro("CEP não encontrado");
                } else {
                    buscarDados(dados);
                }
            })
            .catch(() => {
                erro("Erro ao buscar o CEP. Tente novamente mais tarde.");
            });
    }
}

function buscarDados(dados) {
    document.getElementById("logradouro").value = dados.logradouro;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("cidade").value = dados.localidade;
    document.getElementById("uf").value = dados.uf;
    document.getElementById("ibge").value = dados.ibge;
}

function erro(erro) {
    alert("Erro: " + erro);
    document.getElementById("cep").value = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("ibge").value = "";
}