(function () {


    var speakBtn = document.querySelector('#speakbt');
    var resultSpeaker = document.querySelector('#resultSpeak');

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        var myRecognition = new SpeechRecognition();

        myRecognition.lang = 'pt-BR';


        speakBtn.addEventListener('click', function () {

            try {

                myRecognition.start();

                resultSpeaker.innerHTML = "Estou te ouvindo!";

            } catch (erro) {
                alert('erro:' + erro.message);
            }

        }, false);

        myRecognition.addEventListener('result', function (evt) {

            var resultSpeak = evt.results[0][0].transcript;

            console.log(resultSpeak);

            resultSpeaker.innerHTML = resultSpeak;


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

        myRecognition.addEventListener('error', function (evt) {

            resultSpeaker.innerHTML = 'Se você disse alguma coisa, não ouvi muito bem!';

        }, false);

    } else {
        resultSpeaker.innerHTML = 'Seu navegador não suporta tanta tecnoligia!';
    }

})();