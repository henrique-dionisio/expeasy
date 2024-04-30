
// ----- INPUT DA DATA -----

// Obtenha a data atual
var dataAtual = new Date();

// Subtraia dois dias da data atual
var doisDiasAntes = new Date(dataAtual);
doisDiasAntes.setDate(dataAtual.getDate() - 2);

// Converta a data para o formato YYYY-MM-DD
var dataFormatada = doisDiasAntes.toISOString().split('T')[0];

// Selecione o elemento input de data
var inputData = document.getElementById('data');

// Defina o atributo min para permitir datas a partir de dois dias atrás
inputData.setAttribute('min', dataFormatada);

// Converta a data atual para o formato YYYY-MM-DD
var dataAtualFormatada = dataAtual.toISOString().split('T')[0];

// Defina o atributo max para a data atual para impedir datas futuras
inputData.setAttribute('max', dataAtualFormatada);

// Defina o valor do campo de data para a data atual
inputData.value = dataAtualFormatada;

//---------------------------------------------------


    

// ------ INPUTS DE SE HOUVE VENDA OU NÃO -----

    const houveVendasSelect = document.getElementById('houve-vendas');
    const camposVendas = document.getElementById('campos-vendas');
    const motivoNaoVenda = document.getElementById('motivo-nao-venda');

    houveVendasSelect.addEventListener('change', function () {
        if (houveVendasSelect.value === 'sim') {
            camposVendas.style.display = 'block';
            motivoNaoVenda.style.display = 'none';
        } else {
            camposVendas.style.display = 'none';
            motivoNaoVenda.style.display = 'block';
        }
    });
    // ------------------------------------------



// ----- PRÉ DEFINIÇÃO DO R$ NO INPUT -----

document.addEventListener('DOMContentLoaded', function() {
    // Manipulador de eventos para os inputs existentes
    var inputs = document.querySelectorAll('#valor, #valor-depesa'); // Adicione todos os IDs que você deseja formatar
    
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            // Remove todos os caracteres exceto números e vírgulas
            var valorFormatado = this.value.replace(/[^\d,]/g, '');
            this.value = 'R$ ' + valorFormatado;
        });
    });
    
    // Manipulador de eventos para os novos inputs
    var container = document.getElementById('container');
    
    container.addEventListener('input', function(event) {
        var target = event.target;
        if (target.matches('.custom-input-valor-despesa, .custom-input-preco')) { // Adicione a classe do novo input aqui
            // Remove todos os caracteres exceto números e vírgulas
            var valorFormatado = target.value.replace(/[^\d,]/g, '');
            target.value = 'R$ ' + valorFormatado;
        }
    });
});

// -----------------------------------------------


// ----- PRÉ DEFINIÇÃO DO FORMATO DE NUMERO CELULAR NO INPUT -----

var telefoneInput = document.querySelector('.custom-input-telefone');


telefoneInput.addEventListener('input', function() {
    // Obtendo apenas os dígitos do número de telefone
    var numeroTelefone = this.value.replace(/\D/g, '');
    // Formatando o número de telefone conforme o padrão brasileiro
    var telefoneFormatado;
    if (numeroTelefone.length === 11) {
        telefoneFormatado = '(' + numeroTelefone.substring(0, 2) + ') ' + numeroTelefone.substring(2, 7) + '-' + numeroTelefone.substring(7);
    } else if (numeroTelefone.length > 11) {
        // Caso o número tenha mais de 11 dígitos, remove os dígitos extras
        telefoneFormatado = '(' + numeroTelefone.substring(0, 2) + ') ' + numeroTelefone.substring(2, 7) + '-' + numeroTelefone.substring(7, 11);
    } else {
        // Mantém o formato original se o número não atender aos padrões esperados
        telefoneFormatado = this.value;
    }
    // Atualizando o valor do input
    this.value = telefoneFormatado;
});
// ---------------------------------------------------


// ----- ADICIONA MAIS RELATÓRIOS DE VISITAS E VENDAS ------

function adicionarRelatorio() {
    // Clonar o último relatório de visitas
    var ultimoRelatorio = document.querySelector('.relatorio:last-of-type');
    var novoRelatorio = ultimoRelatorio.cloneNode(true);

    // Limpar os valores dos campos copiados
    novoRelatorio.querySelectorAll('input, textarea').forEach(function(elemento) {
        elemento.value = '';
    });

    // Resetar o valor do campo de seleção "Houve vendas?"
    var selectHouveVendas = novoRelatorio.querySelector('#houve-vendas');
    selectHouveVendas.value = 'Escolha uma opção';

    // Reiniciar o estado dos campos condicionais
    var selectHouveVendas = novoRelatorio.querySelector('#houve-vendas');
    var camposVendas = novoRelatorio.querySelector('#campos-vendas');
    var motivoNaoVenda = novoRelatorio.querySelector('#motivo-nao-venda');

    // Definir o evento de mudança para o novo select
    selectHouveVendas.addEventListener('change', function() {
        if (selectHouveVendas.value === 'nao') {
            camposVendas.style.display = 'none';
            motivoNaoVenda.style.display = 'block';
        } else if (selectHouveVendas.value === 'sim') {
            camposVendas.style.display = 'block';
            motivoNaoVenda.style.display = 'none';
        }
    });

    // Adicionar o novo relatório abaixo do último
    document.getElementById('clientes').appendChild(novoRelatorio);
}
// ---------------------------------------------------


// ----- FUNÇÃO PARA CRIAR UM CAMPO DE PREVIEW DA IMAGEM -----

function handleFileSelect(input, previewContainerId) {
    const files = input.files;
    const previewContainer = document.getElementById(previewContainerId);

    // Limpa qualquer imagem anterior
    previewContainer.innerHTML = '';

    // Exibe a imagem de pré-visualização para cada arquivo selecionado
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%'; // Ajuste o tamanho da imagem conforme necessário
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
}

// Adicione um listener de evento para cada campo de upload de imagem
document.getElementById('foto-inicio').addEventListener('change', function() {
    handleFileSelect(this, 'container-imagen-inicial');
});

document.getElementById('foto-final').addEventListener('change', function() {
    handleFileSelect(this, 'container-imagen-final');
});
// -----------------------------------------------------------






document.getElementById('foto-despesa').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.classList.add('img-fluid'); // Adiciona classe Bootstrap para imagens responsivas
        imgElement.style.maxWidth = '100%'; // Define o tamanho máximo da imagem
        imgElement.style.height = 'auto'; // Mantém a proporção da imagem
        
        // Limpa o conteúdo existente e adiciona a imagem ao preview
        document.getElementById('preview-imagem-despesa').innerHTML = '';
        document.getElementById('preview-imagem-despesa').appendChild(imgElement);
    }
    
    reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
});


// ----- FUNÇÃO DO BOTÃO DE REMOVER CLIENTE -----

document.addEventListener("click", function(event) {
    // Verifica se o clique foi em um botão de exclusão de cliente
    if (event.target.classList.contains("btn-deletar-cliente")) {
        // Remove o relatório do cliente correspondente
        event.target.closest(".relatorio").remove();
    }
});
// ----------------------------------------------------


// ----- FUNÇÃO DO BOTÃO DE ADICIONAR DESPESA -----

document.addEventListener("DOMContentLoaded", function() {
    // Adicionar evento de clique ao botão de adicionar despesa
    var btnAdicionarDespesa = document.querySelector(".btn-adicionar-despesa");
    btnAdicionarDespesa.addEventListener("click", adicionarDespesa);

    // Adicionar evento de clique aos botões de remover despesa existentes
    var btnsRemoverDespesa = document.querySelectorAll(".btn-remover-despesa");
    btnsRemoverDespesa.forEach(function(btn) {
        btn.addEventListener("click", function() {
            removerDespesa(btn);
        });
    });
});


// Função para adicionar mais despesas
document.querySelector('.btn-adicionar-despesa').addEventListener('click', function() {
    // Clonar o último bloco de despesa
    var despesa = document.querySelector('#despesas form').cloneNode(true);

    // Limpar o valor do campo de categoria da nova despesa
    despesa.querySelector('.custom-input-categoria-despesa').selectedIndex = 0;

    // Limpar o valor do campo de valor da nova despesa
    despesa.querySelector('.custom-input-valor-despesa').value = '';

    // Limpar o valor do campo de foto da nova despesa
    var inputFotoDespesa = despesa.querySelector('#foto-despesa');
    inputFotoDespesa.value = '';

    // Limpar o preview da imagem da nova despesa
    var previewDespesa = despesa.querySelector('#preview-imagem-despesa');
    previewDespesa.innerHTML = '';

    //Limpar o campo de descrição da nova despesa
    despesa.querySelector('.custom-input-descricao').value = '';
    

    // Adicionar a nova despesa ao final do formulário de despesas
    document.querySelector('#despesas').appendChild(despesa);

    // Adicionar o evento de change para o input de arquivo da nova despesa
    inputFotoDespesa.addEventListener('change', function() {
        exibirPreviewImagemDespesa(this, previewDespesa);
    });
});
// ----------------------------------------------------


// ---- FUNÇÃO DO BOTÃO DE REMOVER DESPESAS ---- 

// Função para remover a despesa
function removerDespesa(button) {
    // Encontrar o formulário pai do botão
    var formularioDespesa = button.closest('form');

    // Remover o formulário da despesa
    formularioDespesa.remove();
}
// -----------------------------------------------


// Função para exibir o preview da imagem da despesa
function exibirPreviewImagemDespesa(input, preview) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            preview.innerHTML = '<img src="' + e.target.result + '" class="img-thumbnail" alt="Preview da Imagem">';
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = '';
    }
}

// Adicionar o evento de change para o input de arquivo da primeira despesa
document.querySelector('#foto-despesa').addEventListener('change', function() {
    exibirPreviewImagemDespesa(this, document.querySelector('#preview-imagem-despesa'));
});



// Função para adicionar a funcionalidade de preview de imagem
function adicionarPreview(input, container) {
    input.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            var reader = new FileReader();

            reader.onload = function(e) {
                var img = new Image();
                img.src = e.target.result;

                img.onload = function() {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var maxWidth = 200;
                    var maxHeight = 200;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    container.innerHTML = '';
                    container.appendChild(canvas);
                };
            };

            reader.readAsDataURL(file);

            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}

// Adiciona a funcionalidade de preview para a foto do km inicial
adicionarPreview(document.getElementById('foto-inicio'), document.getElementById('container-imagen-inicial'));

// Adiciona a funcionalidade de preview para a foto do km final
adicionarPreview(document.getElementById('foto-final'), document.getElementById('container-imagen-final'));



// Função para adicionar a funcionalidade de preview de imagem
function adicionarPreview(input, container) {
    input.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            var reader = new FileReader();

            reader.onload = function(e) {
                var img = new Image();
                img.src = e.target.result;

                img.onload = function() {
                    var imgRedimensionada = redimensionarImagem(img, 200, 200);

                    container.innerHTML = '';
                    var imgPreview = document.createElement('img');
                    imgPreview.src = imgRedimensionada;
                    container.appendChild(imgPreview);
                };
            };

            reader.readAsDataURL(file);

            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}

// Adiciona a funcionalidade de preview para a foto da despesa
var inputsFotoDespesa = document.querySelectorAll('input[name="foto-despesa"]');
inputsFotoDespesa.forEach(function(input) {
    var container = input.nextElementSibling; // Container para o preview da imagem
    adicionarPreview(input, container);
});


// ----- FUNÇÃO PARA CALCULAR A QUANTIDADE DE VISITAS REALIZADAS -----




// ----------------------------------------------------------



// ----- FUNÇÃO PARA CALCULAR A QUANTIDADE DE QUILOMETROS PERCORRIDOS -----

// Ouvinte de evento para calcular a quantidade de quilômetros percorridos
document.querySelectorAll('.custom-input-km-final, .custom-input-km-inicio').forEach(function(input) {
    input.addEventListener('input', function() {
        // Obtém os valores dos inputs de quilometragem inicial e final
        var kmInicio = parseFloat(document.getElementById('km-inicio').value.replace(',', '.'));
        var kmFinal = parseFloat(document.getElementById('km-final').value.replace(',', '.'));

        // Calcula a quantidade de quilômetros percorridos
        var quilometrosPercorridos = kmFinal - kmInicio;

        // Atualiza o valor do input de quilometragem total
        document.querySelectorAll('.custom-input-quilometragem-total').forEach(function(input) {
            input.value = quilometrosPercorridos.toFixed(2) + ' km'; // Define 2 casas decimais
        });
    });
});

// ----------------------------------------------------------


// ----- FUNÇÃO PARA CALCULAR A QUANTIDADE DE DESPESAS -----

document.addEventListener('DOMContentLoaded', function() {
    // Função para calcular o total das despesas
    function calcularTotalDespesas() {
        // Seleciona todos os inputs de valor das despesas
        var inputsDespesas = document.querySelectorAll('.custom-input-valor-despesa');

        // Inicializa o total de despesas como zero
        var totalDespesas = 0;

        // Itera sobre todos os inputs de valor das despesas
        inputsDespesas.forEach(function(input) {
            // Remove o "R$" e converte o valor para número
            var valor = parseFloat(input.value.replace('R$ ', '').replace(',', '.'));

            // Verifica se o valor é um número válido e adiciona ao total
            if (!isNaN(valor)) {
                totalDespesas += valor;
            }
        });

        // Atualiza o valor do input de resumo com o total das despesas
        var inputResumoDespesas = document.getElementById('resumo-valor-despesas');
        inputResumoDespesas.value = 'R$ ' + totalDespesas.toFixed(2); // Formata o valor com duas casas decimais
    }

    // Seleciona o container de despesas
    var containerDespesas = document.getElementById('despesas');

    // Adiciona os eventos input e blur ao container de despesas para capturar inputs gerados dinamicamente
    containerDespesas.addEventListener('input', calcularTotalDespesas);
    containerDespesas.addEventListener('blur', calcularTotalDespesas);

    // Define um temporizador para recalcular o total das despesas a cada segundo
    setInterval(calcularTotalDespesas, 1000);
});

// ----------------------------------------------------------


// ----- FUNÇÃO PARA CALCULAR O VALOR EM VENDAS -----

document.addEventListener('DOMContentLoaded', function() {
    // Função para calcular o total das vendas
    function calcularTotalVendas() {
        // Seleciona todos os inputs de valor de vendas
        var inputsVendas = document.querySelectorAll('.custom-input-preco');

        // Inicializa o total de vendas como zero
        var totalVendas = 0;

        // Itera sobre todos os inputs de valor de vendas
        inputsVendas.forEach(function(input) {
            // Remove o "R$" e substitui a vírgula por ponto para garantir a conversão correta para número
            var valor = parseFloat(input.value.replace('R$ ', '').replace(',', '.'));

            // Verifica se o valor é um número válido e adiciona ao total
            if (!isNaN(valor)) {
                totalVendas += valor;
            }
        });

        // Atualiza o valor do input de resumo com o total de vendas
        var inputResumoVendas = document.getElementById('resumo-valor-vendas');
        inputResumoVendas.value = 'R$ ' + totalVendas.toFixed(2); // Formata o valor com duas casas decimais
    }

    // Seleciona o container de relatório de vendas
    var containerVendas = document.getElementById('report-visit');

    // Adiciona os eventos input e blur ao container de relatório de vendas para capturar inputs gerados dinamicamente
    containerVendas.addEventListener('input', calcularTotalVendas);
    containerVendas.addEventListener('blur', calcularTotalVendas);

    // Função para recalcular o total das vendas a cada 1 segundo
    setInterval(calcularTotalVendas, 1000);
});

// ----------------------------------------------------------



// ----- GERAR RELATORIO EM PDF -----

function gerarPdf() {
    // Verificar se todos os campos obrigatórios estão preenchidos
    const camposObrigatorios = document.querySelectorAll('[required]');
    let todosPreenchidos = true;

    camposObrigatorios.forEach(campo => {
        if (!campo.value.trim()) {
            todosPreenchidos = false;
            // Você pode adicionar um estilo para destacar campos obrigatórios não preenchidos aqui, se desejar
            campo.style.border = '1px solid red';
        }
    });

    if (todosPreenchidos) {
        // Todos os campos obrigatórios foram preenchidos, chama a função para gerar o PDF
        // Chama a função para gerar o PDF
        // ...

        // Após gerar o PDF, abre a caixa de diálogo de impressão
        window.print();
    } else {
        // Exibir mensagem de erro ou qualquer ação que desejar
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

// ----------------------------------------------------------

// ----- CAIXA DE TEXTO E INPUT DE TEXTO SE ADEQUA AO CONTEÚDO -----

// Seleciona todas as textarea e inputs do tipo texto no documento
const inputs = document.querySelectorAll('textarea, input[type="text"]');

// Itera sobre todos os elementos selecionados
inputs.forEach(input => {
    // Adiciona um manipulador de eventos para o evento input
    input.addEventListener('input', autoResize);
});

// Função para redimensionar os elementos
function autoResize(event) {
    const element = event.target; // O elemento que disparou o evento

    // Adiciona um pequeno atraso antes de redimensionar o input
    setTimeout(() => {
        // Se for uma textarea
        if (element.tagName === 'TEXTAREA') {
            element.style.height = 'auto'; // Redefine a altura para auto
            element.style.height = element.scrollHeight + 'px'; // Define a altura com base no conteúdo
        }
        // Se for um input do tipo texto
        else if (element.tagName === 'INPUT' && element.type === 'text') {
            const tmp = document.createElement('span'); // Cria um elemento temporário
            tmp.textContent = element.value || '.'; // Define o conteúdo do elemento temporário
            tmp.style.visibility = 'hidden'; // Torna o elemento temporário invisível
            tmp.style.position = 'absolute'; // Define a posição como absoluta para não afetar o layout
            tmp.style.whiteSpace = 'pre'; // Garante que o texto será quebrado apenas em espaços
            tmp.style.padding = '18px'; // Define um padding para evitar que as letras sejam cobertas
            document.body.appendChild(tmp); // Adiciona o elemento temporário ao corpo do documento
            const isOverflowing = tmp.offsetWidth > element.offsetWidth; // Verifica se há overflow
            if (isOverflowing) {
                element.style.width = Math.max(tmp.offsetWidth, 100) + 'px'; // Define a largura do input com base no conteúdo, com um mínimo de 100px
            }
            document.body.removeChild(tmp); // Remove o elemento temporário do corpo do documento
        }
    }, 10); // Define um atraso de 10 milissegundos antes de redimensionar o input
}

// ----------------------------------------------------------







