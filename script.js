let ElementSecond = document.querySelector('.p_s');
let ElementMinute = document.querySelector('.p_m');
let ElementHour = document.querySelector('.p_h');
let ElementTimeDigital = document.querySelector('.digital');

//Função responsável por fazer toda a mudança de horário
function updateTime() {
    let dateNow = new Date(); //Pegamos a hora atual
    //Destrinchamos a informação data e hora que a função acima nos trouxe, pegando apenas as informações quenos interessa, que é horas, minutos e segundos.
    let hour = dateNow.getHours();
    let minute = dateNow.getMinutes();
    let second = dateNow.getSeconds();

    ElementTimeDigital.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`; // Editamos o HTML do relógio digital na tela para o usuário, com as informações reais do minuto e segundo atual

    //Variáveis responsáveispor guardar os graus para mudarmos as rotações no relógio
    let AngSecond = ((360 / 60) * second) - 90; //360 graus dividido por 60 segundos que tem 1 minuto, dará 6 graus que o ponteiro do segundo deverá andar para mudar referente a 1 segundo no relógio.  |||||||    Com este resultado obtido, multiplicaremos ele pela quantidade de segundos que a variável 'second' tem guardando dentro dela, uma vez que ela é atualizada constantemnte, então os segundos serão diferentes sempre a cada vez que a função de updateTime for rodada.   ||||||    Com o resultado obtido, iremos subtrais 90, para que ele comece a contar 0 graus no relógio a partir do ponteiro que seria o 12, pois 0 Graus no CSS se dá pela posição deitada, então, teoricamente quando subtraímos 90 do valor obtido, nós conseguimos obter o valor a rotação exata do ponteiro na tela referente ao minuto em que está no momento.
    let AngMinute = ((360 / 60) * minute) - 90; //Basicamente a conta é a mesma da de cima, só que com a diferença que ao multiplicamos pelo valor do minuto, uma vez que estamos querendo achar o valor do ângulo dos minutos.
    let AngHour = ((360 / 12) * hour) - 90; //Mesma conta novamente, com a diferença que dividimos por 12 e, não, por 24, porque o relógio só tem até 12 horas marcadas neles e depois se repete novamente. E passamos para ele multiplicar pela informação da variável hour, e continuamos subtraindo -90 para compensarmos o valor correto forçando via javascript

    ElementSecond.style.transform = `rotate(${AngSecond}deg)`; //Trocamos a rotação do ponteiro de segundos a cada vez que a função de atualização da hora for rodada, passando dentro do template string o valor exato do ângulo do segundo.
    ElementMinute.style.transform = `rotate(${AngMinute}deg)`; //Trocamos a rotação do ponteiro dos minutos baseado na variável AngMinute
    ElementHour.style.transform = `rotate(${AngHour}deg)`; //Trocamos a rotação do ponteiro das horas
}

//Função válida para ser usada tanto nas horas, quanto nos minutos, quanto nos segundos
//Se a hora que eu passei para a função fixZero for menor que 10, coloque um 0 antes do número. Assim ele exibirá por exemplo: 00, 01, 02, 03, 04 até chegar no 09
//Caso o time passado for igual ou maior a 10, aí já não precisa colocar mais o '0' antes do número. Então retorna só o número mesmo.
function fixZero(time) { return time < 10 ? `0${time}` : time; }

setInterval(updateTime, 1000); //Função que funcionará como um Timer, ou seja, basicamente ela rodará a função de atualizar a hora a cada 1 segundo para poder atualizar os elementos na tela.
updateTime(); //Este comando serve para chamar a função de atualizar o horário logo que o código for iniciado, assim, não terá um pequeno delay ao carregar a página. Caso tirássemos esta função, ele daria um delay na tela depois é que mostraria o horário correto