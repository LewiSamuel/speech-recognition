var grupoDominiosCenario = ["previsto", "planejado", "planejamento", "realizado", "realização", "projetado", "projeção", "atrasado", "atraso", "prevista", "planejada", "realizada", "projetada", "atrasada", "previstos", "planejados", "planejamentos", "realizados", "projetados", "atrasados", "atrasos", "previstas", "planejadas", "realizadas", "projetadas", "atrasadas"];
var grupoDominiosEstrutura = ["cenpes", "pddp", "pdep", "pdrgn", "pdiso"];
var grupoDominiosValor = ["valor"];
var grupoDominiosMes = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
var grupoDominiosAcumulado = ["acumulado", "acumulada", "acumulados", "acumuladas"];
var grupoDominiosAgencia = ["aneel", "anp"];
var grupoDominiosTipo_obrig = ["interno", "externo", "internamente", "externamente", "total", "interna", "externa", "internos", "externos", "internas", "externas"];
var grupoDominiosQuantidade = ["quantidade", "quantidades"];

function solve_capex(words){
    
    var hashTable = {}
    var saida = {}

    grupoDominiosCenario.forEach(element => {
        hashTable[element] = 'cenario'
    });

    grupoDominiosEstrutura.forEach(element => {
        hashTable[element] = 'estrutura'
    });

    grupoDominiosValor.forEach(element => {
        hashTable[element] = 'valor'
    });

    grupoDominiosMes.forEach(element => {
        hashTable[element] = 'mes'
    });

    grupoDominiosAcumulado.forEach(element => {
        hashTable[element] = 'acumulado'
    });

    words.forEach(element => {
        if(element in hashTable)
            saida[hashTable[element]] = element;
        else if (isNaN(element) === false)
            saida['ano'] = element;
    });

    return saida;
}

function solve_obrigacao(words){

    var hashTable = {}
    var saida = {}

    grupoDominiosCenario.forEach(element => {
        hashTable[element] = 'cenario'
    });

    grupoDominiosValor.forEach(element => {
        hashTable[element] = 'valor'
    });

    grupoDominiosAgencia.forEach(element => {
        hashTable[element] = 'agencia'
    });

    grupoDominiosTipo_obrig.forEach(element => {
        hashTable[element] = 'tipo_obrig'
    });

    grupoDominiosMes.forEach(element => {
        hashTable[element] = 'mes'
    });

    grupoDominiosAcumulado.forEach(element => {
        hashTable[element] = 'acumulado'
    });

    words.forEach(element => {
        if(element in hashTable)
            saida[hashTable[element]] = element;
        else if (isNaN(element) === false)
            saida['ano'] = element;
    });

    return saida;
}

function solve_gog(words){
    
    var hashTable = {}
    var saida = {}

    grupoDominiosCenario.forEach(element => {
        hashTable[element] = 'cenario'
    });

    grupoDominiosEstrutura.forEach(element => {
        hashTable[element] = 'estrutura'
    });

    grupoDominiosValor.forEach(element => {
        hashTable[element] = 'valor'
    });

    grupoDominiosMes.forEach(element => {
        hashTable[element] = 'mes'
    });

    grupoDominiosAcumulado.forEach(element => {
        hashTable[element] = 'acumulado'
    });

    words.forEach(element => {
        if(element in hashTable)
            saida[hashTable[element]] = element;
        else if (isNaN(element) === false)
            saida['ano'] = element;
    });

    return saida;
}

function solve_macos_criticos(words){
    
    var hashTable = {}
    var saida = {}

    grupoDominiosCenario.forEach(element => {
        hashTable[element] = 'cenario'
    });

    grupoDominiosEstrutura.forEach(element => {
        hashTable[element] = 'estrutura'
    });

    grupoDominiosQuantidade.forEach(element => {
        hashTable[element] = 'quantidade'
    });

    grupoDominiosMes.forEach(element => {
        hashTable[element] = 'mes'
    });

    grupoDominiosAcumulado.forEach(element => {
        hashTable[element] = 'acumulado'
    });

    words.forEach(element => {
        if(element in hashTable)
            saida[hashTable[element]] = element;
        else if (isNaN(element) === false)
            saida['ano'] = element;
    });

    return saida;
}

(function () {
    

    navigator
    .mediaDevices
    .getUserMedia({audio: true})
    .then( stream => {
        console.log(stream)
    }, err =>{
        console.log(err)
    });

    // Elementos do HTML
    var speakBtn             = document.querySelector("#speakbt");
    var resultSpeaker        = document.querySelector("#resultSpeak");
    var jsonContainer        = document.querySelector("#jsonContainer");

    // Verifica se o navegador tem suporte para a aplicação
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {

        // Configurando janela de conversa
        var windowSpeak = new SpeechSynthesisUtterance();
        windowSpeak.lang = 'pt-BR';
        windowSpeak.rate = 1.5;

        // Configurando o reconhecimento de voz
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var myRecognition = new SpeechRecognition();
            myRecognition.lang = 'pt-BR';


        // Botão para falar
        speakBtn.addEventListener('click', function (){
            try{
                // Começa a escutar
                myRecognition.start();
                $(".btnSpeak").css("background-position","right");
                $(".btnSpeak").html("Gravando...");
                resultSpeaker.innerHTML = "Olá, Estou te ouvindo!";
                
                //Janela de escuta
                windowSpeak.text = "Olá, Estou te ouvindo!";
                speechSynthesis.speak(windowSpeak);

            }catch(erro){
                alert('erro: ' + erro.message);
            }
        }, false);


        // Termina o reconhecimento de voz
        myRecognition.addEventListener('result', function (evt) {

            var resultSpeak = evt.results[0][0].transcript;

            $(".btnSpeak").css("background-position","left");
            $(".btnSpeak").html("Gravar");
           
            // Escreve o que foi dito
            // if(element == "capas" 
            //     || element == "capacetes"){
            //         intencao = "capex";
            //         break;
            //     }
            //     if(element == "google"
            //     || element == "george"){
            //         intencao = "gog";
            //         break;
            //     }
            resultSpeak = resultSpeak.toLowerCase();
            resultSpeaker.innerHTML = resultSpeak.replace(' apex',' capex').replace('capas','capex').replace('capacetes','capex').replace('george','gog').replace('google','gog').replace('blog','gog');

            // Janela de conversa
            windowSpeak.text = resultSpeak;
            speechSynthesis.speak(windowSpeak);
            // Padroniza tudo para lower case
            

            // Quebra em um array de palavras ditas
            var arrayWords = resultSpeak.split(" ");

            var grupoIntencoes = {"capex":1, "obrigação":1, "gog":1, "marcos críticos":1};
            var intencao
            var json = {}
            json['web_application'] = {}
            for(var i = 0; i < arrayWords.length; i++){
                var element = arrayWords[i];
                var element2 = arrayWords[i] + ' ' + arrayWords[i+1];
                console.log(element2)
                if(element in grupoIntencoes){
                    intencao  = element
                    break;
                }
                if(element2 in grupoIntencoes){
                    intencao  = element2
                    break;
                }
                if(element == "capas" || element2 == "capas"
                || element == "capacetes" || element2 == "capacetes"
                || element == "apex" || element2 == "apex"){
                    intencao = "capex";
                    break;
                }
                if(element == "google" || element2 == "google"
                || element == "george" || element2 == "george"
                || element == "blog" || element2 == "blog"){
                    intencao = "gog";
                    break;
                }
            }

            switch (intencao) {
                case "capex":
                    json['web_application'][intencao] = solve_capex(arrayWords);
                    break;
                case "obrigação":
                    json['web_application'][intencao] = solve_obrigacao(arrayWords);
                    break;
                case "gog":
                    json['web_application'][intencao] = solve_gog(arrayWords);
                    break;
                case "marcos críticos":
                    json['web_application'][intencao] = solve_macos_criticos(arrayWords);
                    break;
                default:
                    break;
            }
            
            jsonContainer.innerHTML = JSON.stringify(json);

        }, false);

        // erro
        myRecognition.addEventListener('error', function (evt) {
            resultSpeaker.innerHTML = 'Se você disse alguma coisa, não ouvi muito bem!';
            $(".btnSpeak").css("background-position","left");
            $(".btnSpeak").html("Tentar de novo");
        }, false);

    }else{
        resultSpeaker.innerHTML = 'Seu navegador não suporta tanta tecnoligia!';
    }

})();
