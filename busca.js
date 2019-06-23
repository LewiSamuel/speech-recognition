var grupoDominiosCenario = ["previsto", "planejado", "planejamento", "realizado", "realização", "projetado", "projeção", "prevista", "planejada", "realizada", "projetada"];


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
        else if (isNumeric(element))
            saida[ano] = toString(element);
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
        else if (isNumeric(element))
            saida[ano] = toString(element);
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
        else if (isNumeric(element))
            saida[ano] = toString(element);
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
        else if (isNumeric(element))
            saida[ano] = toString(element);
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
                speakBtn.style.backgroundColor = "green";
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
            speakBtn.style.backgroundColor = "white";
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
            //TODO : Palavras com ~ e ´

            var arrayWords = resultSpeak.split(" ");

            var grupoIntencoes = ["capex", "obrigacao", "gog", "marcos_criticos"];
            var intencao
            var json
            arrayWords.forEach(element =>{
                if(element in grupoIntencoes){
                    intencao  = element
                    break;
                }
            })

            switch (intencao) {
                case "capex":
                    json = solve_capex(arrayWords);
                    break;
                case "obrigacao":
                    json = solve_obrigacao(arrayWords);
                    break;
                case "gog":
                    json = solve_gog(arrayWords);
                    break;
                case "marcos_criticos":
                    json = solve_macos_criticos(arrayWords);
                    break;
                default:
                    break;
            }
            
            jsonContainer.innerHTML = JSON.stringify(json);

            // Realizar alguma operação de acordo com a fala
            switch (resultSpeak.toLowerCase()) {
                case 'azul':
                    document.body.style.backgroundColor = '#0000FF';    
                    break;
                case 'rosa':
                    document.body.style.backgroundColor = '#FF1493';    
                    break;
                case 'laranja':
                    document.body.style.backgroundColor = '#FF4500';    
                    break;
                case 'vermelho':
                    document.body.style.backgroundColor = '#FF0000';    
                    break;
                case 'verde':
                    document.body.style.backgroundColor = 'GREEN';    
                    break;
            }

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