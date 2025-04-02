function validarCadastro() {
    const nome = document.getElementById('nome').value.trim()
    const email = document.getElementById('email').value.trim()
    const telefone = document.getElementById('telefone').value.trim()
    const cep = document.getElementById('cep').value.trim()
    const logradouro = document.getElementById('logradouro').value.trim()
    const bairro = document.getElementById('bairro').value.trim()
    const cidade = document.getElementById('cidade').value.trim()
    const uf = document.getElementById('uf').value.trim()
    const ibge = document.getElementById('ibge').value.trim()

    
    if (!nome) {
        alert('Por favor, preencha o campo Nome.')
        document.getElementById("nome").focus()
        return
    }
    if (!email) {
        alert('Por favor, preencha o campo Email.')
        document.getElementById("email").focus()
        return
    }
    if (!telefone) {
        alert('Por favor, preencha o campo Telefone.')
        document.getElementById("telefone").focus()
        return
    }
    if (!cep) {
        alert('Por favor, preencha o campo CEP.')
        document.getElementById("cep").focus()
        return
    }

    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

    
    usuarios.push({ nome, email, telefone, cep, logradouro, bairro, cidade, uf, ibge })

    
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    alert('Cadastro realizado com sucesso!')
}

function loadLogradouro(cep) {
    if (!cep) {
        erro("CEP não informado. Digite um CEP.")
        return
    }
    if (!/^\d{8}$/.test(cep)) {
        erro("O CEP deve conter 8 dígitos.")
        return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(response => response.json())
        .then(dados => {
            if (dados.erro) {
                erro("CEP não encontrado.")
            } else {
                preencherCampos(dados)
            }
        })
        .catch(() => {
            erro("Erro ao buscar o CEP. Tente novamente mais tarde.")
        })
}

function preencherCampos(dados) {
    document.getElementById("logradouro").value = dados.logradouro
    document.getElementById("bairro").value = dados.bairro
    document.getElementById("cidade").value = dados.localidade
    document.getElementById("uf").value = dados.uf
    document.getElementById("ibge").value = dados.ibge
}
document.addEventListener("DOMContentLoaded", function () {
    
    let tabelaBody = document.querySelector("#tabelaUsuarios tbody");
    if (!tabelaBody) {
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
        tabelaBody.innerHTML = `<tr><td colspan="10" style="text-align: center;">Nenhum dado encontrado.</td></tr>`;
    } else {
        usuarios.forEach((usuario, index) => {
            let linha = document.createElement("tr");

            linha.innerHTML = `
                <td contenteditable="true" onblur="editarUsuario(${index}, 'nome', this.innerText)">${usuario.nome}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'email', this.innerText)">${usuario.email}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'telefone', this.innerText)">${usuario.telefone}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'cep', this.innerText)">${usuario.cep}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'logradouro', this.innerText)">${usuario.logradouro}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'bairro', this.innerText)">${usuario.bairro}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'cidade', this.innerText)">${usuario.cidade}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'uf', this.innerText)">${usuario.uf}</td>
                <td contenteditable="true" onblur="editarUsuario(${index}, 'ibge', this.innerText)">${usuario.ibge}</td>
                <td>
                    <button class="btn-editar" onclick="editarUsuario(${index})">✏️</button>
                    <button class="btn-excluir" onclick="excluirUsuario(${index})">🗑️</button>
                </td>
            `;

            tabelaBody.appendChild(linha);
        });
    }
});


function editarUsuario(index, campo, valor) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    usuarios[index][campo] = valor;
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}


function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        usuarios.splice(index, 1)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        location.reload()
    }
}


function limparDados() {
    if (confirm("Tem certeza que deseja apagar todos os usuários cadastrados?")) {
        localStorage.removeItem("usuarios")
        location.reload()
    }
}

