(() => {

    class Time {
    nome = null
    pontos = 0
    vitorias = 0
    empates = 0
    derrotas = 0

    constructor(nome) {
        this.nome = nome
        }
    }

    class Partida {
        casa = null
        vitoria = false
        empate = false
        derrotaDaCasa = false
        visitante = null

        constructor(casa, visitante) {
            this.casa = casa
            this.visitante = visitante
        }

        calcularSaldos() {

            if (this.vitoria === true) {
                this.casa.pontos += 3
                this.casa.vitorias += 1
                this.visitante.derrotas += 1

            } else if (this.derrotaDaCasa === true) {
                this.visitante.pontos += 3
                this.visitante.vitorias += 1
                this.casa.derrotas += 1

            } else if (this.empate === true) {
                this.casa.pontos += 1
                this.visitante.pontos += 1
                this.casa.empates += 1
                this.visitante.empates += 1
            }
        }
    }

    class Campeonato {
        nome = null
        times = []
        partidas = []

        constructor(nome) {
            this.nome = nome
        }

        inscreverTime(time) {
            if (this.times.length > 4) {
                console.log('ja temos times de mais')
                return
            }
            this.times.push(time)
        }

        sortearPartidas() {
            this.partidas = [
                new Partida(this.times[0], this.times[1]),
                new Partida(this.times[2], this.times[3]),

                new Partida(this.times[0], this.times[2]),
                new Partida(this.times[1], this.times[3]),

                new Partida(this.times[0], this.times[3]),
                new Partida(this.times[1], this.times[2]),

            ]
        }

        iniciarPartidas() {
            for (let partida of this.partidas) {
                partida.calcularSaldos()
            }
        }

        classificar() {
            this.times.sort((a, b) => {
                if(a.pontos !== b.pontos){
                    return b.pontos - a.pontos
                }
                if(a.vitorias !== b.vitorias){
                    return b.vitorias - a.vitorias
                }
                if(a.empates !== b.empates){
                    return b.golsSaldo() - a.golsSaldo()
                }
                return a.derrotas - b.derrotas
            })
        }
    }

    function obterTimes() {
    return [
        new Time('Flamengo'),
        new Time('Fluminense'),
        new Time('Vasco'),
        new Time('Botafogo'),
    ]
     }

    function limparTimes(Times){
        for (let time of Times) {
            this.pontos = 0
            this.vitorias = 0
            this.derrotas = 0
            this.empates = 0
        }
    }

    function limparTela($el) {
        while ($el.firstChild) {
            $el.firstChild.remove()
        }
    }

    function criarTabelaClassificacao($corpoClassificacao, times) {
        limparTela($corpoClassificacao)
        for (let time of times) {

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
    }

    function criarTabelaPartidas($corpoPartidas, partidas) {
        limparTela($corpoPartidas)
        for (let partida of partidas) {

            let $linhaPartidas = $corpoPartidas.insertRow()

            let $timeCasa = $linhaPartidas.insertCell(-1)
            $timeCasa.innerText = partida.casa.nome

            let $vitoria = $linhaPartidas.insertCell(-1)
            $vitoria.innerText = ''

            let $empate = $linhaPartidas.insertCell(-1)
            $empate.innerText = ''

            let $derrotaDaCasa = $linhaPartidas.insertCell()
            $derrotaDaCasa.innerText = ''

            let $timeVisitante = $linhaPartidas.insertCell(-1)
            $timeVisitante.innerText = partida.visitante.nome

            // analisando/atualizando as marcações e cores da tabela de partidas
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

            // monitorando os eventos das partidas
            // Verificando vitória
            $vitoria.onclick = (e) => {
                limparTimes(campeonato.times)
                partida.vitoria = !partida.vitoria
                partida.empate = false
                partida.derrotaDaCasa = false
                campeonato.iniciarPartidas(partidas)
                campeonato.classificar()
                criarTabelaClassificacao($corpoClassificacao, times)
                criarTabelaPartidas($corpoPartidas, partidas)

            }

            // Verificando empate
            $empate.onclick = (e) => {
                limparTimes(campeonato.times)
                partida.empate = !partida.empate
                partida.vitoria = false
                partida.derrotaDaCasa = false
                campeonato.iniciarPartidas(partidas)
                campeonato.classificar()
                criarTabelaClassificacao($corpoClassificacao, times)
                criarTabelaPartidas($corpoPartidas, partidas)
            }

            // Verificando derrotaDacasa
            $derrotaDaCasa.onclick = (e) => {
                limparTimes(campeonato.times)
                partida.derrotaDaCasa = !partida.derrotaDaCasa
                partida.vitoria = false
                partida.empate = false
                campeonato.iniciarPartidas(partidas)
                campeonato.classificar()
                criarTabelaClassificacao($corpoClassificacao, times)
                criarTabelaPartidas($corpoPartidas, partidas)
            }

        }

        // verificando dados no console
        console.log('DEGUB TIMES')
        console.table(times)
        console.log('DEGUB CAMPEONATO.TIMES')
        console.table(campeonato.times)
        console.log('DEGUB PARTIDAS')
        console.table(partidas)
    }

    //instancia o campeonato e adiciona os times e as partidas
    let campeonato = new Campeonato('Campeonatin')
    let times = obterTimes()
    for (let time of times) {
        campeonato.inscreverTime(time)
    }
    campeonato.sortearPartidas()
    let partidas = campeonato.partidas

    //instanciando os elementos da página

    //cria o elemento de titulo da página "Campeonatin"
    let $tituloAT = document.createElement('h1');
    $tituloAT.innerText = 'Campeonatin'
    $tituloAT.className = 'text-center mb-5'
    document.getElementById('app').appendChild($tituloAT)

    //cria o elemento de titulo da tabela de Classificação
    let $tituloClassificacao = document.createElement('h2');
    $tituloClassificacao.innerText = 'Classificação'
    $tituloClassificacao.className = 'border text-center'
    document.getElementById('app').appendChild($tituloClassificacao)

    //cria a tabela Classificação
    let $tabelaClassificacao = document.createElement('table')
    $tabelaClassificacao.className = 'table table-bordered table-responsive text-center'

    let $tituloTabelaClassificacao = $tabelaClassificacao.createTHead().insertRow()
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'time'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'pontos'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'vitorias'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'empates'
    $tituloTabelaClassificacao.insertCell(-1).innerText = 'derrotas'

    let $corpoClassificacao = $tabelaClassificacao.createTBody()
    criarTabelaClassificacao($corpoClassificacao, times)
    document.getElementById('app').appendChild($tabelaClassificacao)

    //cria o elemento de titulo da tabela de Partidas
    let $tituloPartidas = document.createElement('h2');
    $tituloPartidas.innerText = 'Partidas'
    $tituloPartidas.className = 'border text-center'
    document.getElementById('app').appendChild($tituloPartidas)

    //criando a tabela Partidas
    let $tabelaPartidas = document.createElement('table')
    $tabelaPartidas.className = 'table table-bordered table-responsive text-center'

    let $tituloTabelaPartidas = $tabelaPartidas.createTHead().insertRow()
    $tituloTabelaPartidas.insertCell(-1).innerText = 'time casa'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'vitoria da casa'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'empate'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'derrota da casa'
    $tituloTabelaPartidas.insertCell(-1).innerText = 'time visitante'

    let $corpoPartidas = $tabelaPartidas.createTBody()
    criarTabelaPartidas($corpoPartidas, partidas)
    document.getElementById('app').appendChild($tabelaPartidas)

})()