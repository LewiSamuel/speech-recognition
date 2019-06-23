var grupoDominiosCenario = ["previsto", "planejado", "planejamento", "realizado", "realização", "projetado", "projeção", "atrasado", "atraso", "prevista", "planejada", "realizada", "projetada", "atrasada", "previstos", "planejados", "planejamentos", "realizados", "projetados", "atrasados", "atrasos", "previstas", "planejadas", "realizadas", "projetadas", "atrasadas"];
var grupoDominiosEstrutura = ["cenpes", "pddp", "pdep", "pdrgn", "pdiso"];
var grupoDominiosValor = ["valor"];
var grupoDominiosMes = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
var grupoDominiosAno = [];
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
    
    // Elementos do HTML
    var speakBtn             = document.querySelector("#speakbt");
    var resultSpeaker        = document.querySelector("#resultSpeak");
    var jsonContainer        = document.querySelector("#jsonContainer");

    /***********************************/
    /*                                 */
    //      TABELAS DE REFERENCIA      //
    /*                                 */ 
    /***********************************/

    // Intencoes






    // Check support at SpeechRecognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {

        // Config window talk
        var windowSpeak = new SpeechSynthesisUtterance();
        windowSpeak.lang = 'pt-BR';
        windowSpeak.rate = 1.5;

        // config Speech Recognition
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var myRecognition = new SpeechRecognition();
            myRecognition.lang = 'pt-BR';


        // click button speak
        speakBtn.addEventListener('click', function (){
            try{
                // Start Speech Recognition
                myRecognition.start();
                // speakBtn.style.backgroundColor = "green";
                $(".btnSpeak").css("background-position","right");
                $(".btnSpeak").html("Gravando...");
                resultSpeaker.innerHTML = "Olá, Estou te ouvindo!";
                
                // Window Speak
                windowSpeak.text = "Olá, Estou te ouvindo!";
                speechSynthesis.speak(windowSpeak);

            }catch(erro){
                alert('erro: ' + erro.message);
            }
        }, false);


        // End Speach Recognition voice
        myRecognition.addEventListener('result', function (evt) {

            var resultSpeak = evt.results[0][0].transcript;
            // speakBtn.style.backgroundColor = "white";
            $(".btnSpeak").css("background-position","left");
            $(".btnSpeak").html("Gravar");
            resultSpeaker.innerHTML = resultSpeak;

            // Window Speak
            windowSpeak.text = resultSpeak;
            speechSynthesis.speak(windowSpeak);

            console.log(resultSpeak);



            /***************************** */
            //                             //
            //      Json generate          //
            //                             //
            /***************************** */

            //TODO : Identificar marcos criticos
            //TODO : Aproximação da palavra 

            var arrayWords = resultSpeak.split(" ");

            var grupoIntencoes = {"capex":1, "obrigação":1, "gog":1, "marcos_criticos":1};
            var intencao
            var json = {}
            json['Aplicação'] = {}
            arrayWords.forEach(element =>{
                if(element in grupoIntencoes){
                    intencao  = element
                }
            })

            console.log('in = ' + intencao)
            switch (intencao) {
                case "capex":
                    json['Aplicação'][intencao] = solve_capex(arrayWords);
                    break;
                case "obrigação":
                    json['Aplicação'][intencao] = solve_obrigacao(arrayWords);
                    break;
                case "gog":
                    json['Aplicação'][intencao] = solve_gog(arrayWords);
                    break;
                case "marcos_criticos":
                    json['Aplicação'][intencao] = solve_macos_criticos(arrayWords);
                    break;
                default:
                    break;
            }
            console.log(json)
            jsonContainer.innerHTML = JSON.stringify(json);


            if (resultSpeak.match(/color/)) {
                var resultado = resultSpeak.split('color');
                document.body.style.backgroundColor = resultado[1];    
            }

            if (resultSpeak.match(/buscar por/)) {

                resultSpeaker.innerHTML = 'Redirecionando...';
                
                setTimeout(function(){
                    
                    var resultado = resultSpeak.split('buscar por');
                    window.location.href = 'https://www.google.com.br/search?q=' + resultado[1];
                    
                },2000);
            }

        }, false);












        // erro
        myRecognition.addEventListener('error', function (evt) {
            resultSpeaker.innerHTML = 'Se você disse alguma coisa, não ouvi muito bem!';
        }, false);

    }else{
        resultSpeaker.innerHTML = 'Seu navegador não suporta tanta tecnoligia!';
    }

})();
