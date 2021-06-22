function limpar($el) {
    while ($el.firstChild) {
        $el.firstChild.remove()
    }
}

(() => {

    let $tituloAT = document.createElement('h1');
    $tituloAT.innerText = 'Campeonatin'
    $tituloAT.className = 'text-center mb-5'
    document.getElementById('app').appendChild($tituloAT)

    let times = [
        {nome: 'Flamengo', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
        {nome: 'Fluminense', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
        {nome: 'Vasco', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
        {nome: 'Botafogo', pontos: 0, vitorias: 0, empates: 0, derrotas: 0},
    ]

    let $tituloClassificacao = document.createElement('h2');
    $tituloClassificacao.innerText = 'Classificação'
    $tituloClassificacao.className = 'border text-center'
    document.getElementById('app').appendChild($tituloClassificacao)

    // Criando o Layout da tabela Classificação
    let $tabelaClassificacao = document.createElement('table')
    $tabelaClassificacao.className = 'table table-bordered table-responsive text-center'

    let $tituloTabelaClassificacao = $tabelaClassificacao.createTHead().insertRow()
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'time'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'pontos'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'vitorias'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'empates'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'derrotas'

    let $corpoClassificacao = $tabelaClassificacao.createTBody()

    function criarTabelaClassificacao($corpoClassificacao, times) {
        limpar($corpoClassificacao)
        for (let time of times) {
            // region RENDER
            let $linha = $corpoClassificacao.insertRow()

            let $nome = $linha.insertCell(-1)
            $nome.innerText = time.nome

            let $time = $linha.insertCell(-1)
            $time.innerText = time.pontos

            let $vitorias = $linha.insertCell()
            $vitorias.innerText = time.vitorias

            let $empates = $linha.insertCell(-1)
            $empates.innerText = time.empates

            let $derrotas = $linha.insertCell()
            $derrotas.innerText = time.derrotas

        }
        console.table(times)
    }

    criarTabelaClassificacao($corpoClassificacao, times)
    document.getElementById('app').appendChild($tabelaClassificacao)

    // Criando Layout da tabela de Partidas

    let $tituloPartidas = document.createElement('h2');
    $tituloPartidas.innerText = 'Partidas'
    $tituloPartidas.className = 'border text-center'
    document.getElementById('app').appendChild($tituloPartidas)

    let partidas = [
        {casa: times[0].nome, vitoria: false, empate: false, derrotaDaCasa: false, visitante: times[1].nome},
        {casa: times[2].nome, vitoria: false, empate: false, derrotaDaCasa: false, visitante: times[3].nome},
        {casa: times[0].nome, vitoria: false, empate: false, derrotaDaCasa: false, visitante: times[2].nome},
        {casa: times[1].nome, vitoria: false, empate: false, derrotaDaCasa: false, visitante: times[3].nome},
        {casa: times[0].nome, vitoria: false, empate: false, derrotaDaCasa: false, visitante: times[3].nome},
        {casa: times[1].nome, vitoria: false, empate: false, derrotaDaCasa: false, visitante: times[2].nome},
    ]

    // Criando o Layout da tabela Classificação
    let $tabelaPartidas = document.createElement('table')
    $tabelaPartidas.className = 'table table-bordered table-responsive text-center'

    let $tituloTabelaPartidas = $tabelaPartidas.createTHead().insertRow()
    $tituloTabelaPartidas.insertCell(-1).innerText = 'time casa'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'vitoria da casa'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'empate da casa'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'derrota da casa'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'time visitante'

    let $corpoPartidas = $tabelaPartidas.createTBody()

    function criarTabelaPartidas($corpoPartidas, partidas) {
        limpar($corpoPartidas)
        for (let partida of partidas) {
            // region RENDER
            let $linhaPartidas = $corpoPartidas.insertRow()

            let $timeCasa = $linhaPartidas.insertCell(-1)
            $timeCasa.innerText = partida.casa

            let $vitoria = $linhaPartidas.insertCell(-1)
            $vitoria.innerText = ''

            let $empate = $linhaPartidas.insertCell(-1)
            $empate.innerText = ''

            let $derrotaDaCasa = $linhaPartidas.insertCell()
            $derrotaDaCasa.innerText = ''

            let $timeVisitante = $linhaPartidas.insertCell(-1)
            $timeVisitante.innerText = partida.visitante


            // Verificando vitória
            if (partida.vitoria === true) {
                $vitoria.className = 'table-success'
                $empate.className = 'table-light'
                $derrotaDaCasa.className = 'table-light'
            } else if (partida.vitoria === false) {
                $vitoria.className = 'table-light'
            }

            // Verificando empate
            if (partida.empate === true) {
                $empate.className = 'table-warning'
                $vitoria.className = 'table-light'
                $derrotaDaCasa.className = 'table-light'
            } else if (partida.empate === false) {
                $empate.className = 'table-light'
            }

            // Verificando derrotaDacasa
            if (partida.derrotaDaCasa === true) {
                $derrotaDaCasa.className = 'table-danger'
                $vitoria.className = 'table-light'
                $empate.className = 'table-light'
            } else if (partida.derrotaDaCasa === false) {
                $derrotaDaCasa.className = 'table-light'
            }

            // endrender

            $vitoria.onclick = (e) => {
                partida.vitoria = !partida.vitoria
                criarTabelaPartidas($corpoPartidas, partidas)

            }

            $empate.onclick = (e) => {
                partida.empate = !partida.empate
                criarTabelaPartidas($corpoPartidas, partidas)
            }

            $derrotaDaCasa.onclick = (e) => {
                partida.derrotaDaCasa = !partida.derrotaDaCasa
                criarTabelaPartidas($corpoPartidas, partidas)
            }

        }
        console.table(partidas)
    }

    criarTabelaPartidas($corpoPartidas, partidas)
    document.getElementById('app').appendChild($tabelaPartidas)

})()