(function () {
    
    // Html elements
    var speakBtn             = document.querySelector("#speakbt");
    var resultSpeaker        = document.querySelector("#resultSpeak");
    var jsonContainer        = document.querySelector("#jsonContainer");

    /***********************************/
    /*                                 */
    //      TABELAS DE REFERENCIA      //
    /*                                 */ 
    /***********************************/

    // Intencoes
    var grupoIntencoes = ["capex", "obrigacao", "gog", "marcos_criticos"];

    // Entidades
    var grupoEntidades = ["cenario", "estrutura", "valor", "mes", "ano", "acumulado"];

    // Dominios
    var grupoDominiosCenario = ["previsto", "planejado", "planejamento", "realizado", "realização", "projetado", "projeção"];
    var grupoDominiosEstrutura = ["cenpes", "pddp", "pdep", "pdrgn", "pdiso"];
    var grupoDominiosValor = ["valor"];
    var grupoDominiosMes = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    var grupoDominiosAno = [];
    var grupoDominiosAcumulado = ["acumulado"];
    var grupoDominiosAgencia = ["aneel", "anp"];
    var grupoDominiosTipo_obrig = ["interna", "externa", "total"];
    var grupoDominiosQuantidade = ["quantidade"];



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

            var arrayWords = resultSpeak.split(" ");







            jsonContainer.innerHTML = JSON.stringify({"audio": arrayWords});







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