var altura = 0
var largura = 0
var vidas = 1
var tempo = 10
var criaMosquitoVelocidade = 1500

var nivel = window.location.search
nivel = nivel.replace('?','')

if (nivel == 'normal'){
	criaMosquitoVelocidade = 1500
}else if (nivel =='dificil'){
	criaMosquitoVelocidade = 1000
}else if (nivel == 'chucknorris'){
	criaMosquitoVelocidade = 750
}


function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura,altura)
}

ajustaTamanhoPalcoJogo()

//Usamos o setInterval para criar um cronômetro.
var cronometro = setInterval(function() {
	/*Aqui, selecionamos o id 'cronometro' e usamos o innerHTML.
	O innerHTML irá adicionar um elemento à tag do id que você
	selecionou. Nesse caso adicionamos a variável tempo.*/

	if (tempo < 0){
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'pagina_vitoria.html'
	}else{
	document.getElementById('cronometro').innerHTML = tempo
	tempo -= 1
}}, 1000)


/*A criação do mosquito em posição randômica tem que ser colocada
dentro de uma função pelo seguinte motivo: 
O programa segue uma ordem de cima pra baixo no DOM. Os códigos do javascript vem antes
do body na página html, então eles não podem criar nada dentro do body, porque pra ele 
o body ainda não foi criado.

Pra resolver esse problema, você cria uma função com os comandos que você quer executar
e a chama dentro do body. */

function posicaoRandomica() {

	/*Usamos o if, que vai tentar selecionar o elemento entre parenteses.
	Se conseuguir selecionar, vai retornar o valor true. Se o valor true
	for selecionado irá executar o comando entre chaves.

	O comando entre chaves seleciona o elemento no documento pelo id, e depois
	executa a função que o remove.*/
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		if (vidas > 3){
			window.location.href = 'fim_de_jogo.html'
		}else{
		document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
		vidas ++}

	}


	/*A função 'Math.random' só gera numeros entre 0 e 1.
	Por isso não tem perigo de gerar um número maior que o
	tamanho da tela.*/
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) -90 //-90 pra que a imagem não ultrapasse os limites da página.

	/*Esse código previne para o caso de a posição randomica definir um 
	número muito pequeno que, quando subtraido o 90, dê um número negativo,
	fazendo com que a imagem apareça fora da tela.

	Para fazer isso, ele estabelece uma condição que faz com que sempre que
	o resultado seja negativo, a posição seja definida como 0, o que vai
	fazer o número aparecer no canto extremo mas não fora da página.*/
	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX,posicaoY)

	//CRIAR O ELEMENTO HTML

	/*A função 'createElement' vai criar o elemento html que você
	definir dentro dos parenteses. Nesse caso, irá criar um elemento
	com a tag 'img'.*/

	var mosquito = document.createElement('img')

	/*Usando o nome da variável acima mais o '.src', nós definimos qual a 
	imagem que criaremos dentro da tag que criamos acima.*/
	mosquito.src = 'imagens/mosquito.png'

	/*Você usa a função className para aplicar as características das classes
	que você criou à imagem do mosquito. Sem isso a imagem estava aparecendo
	muito grande.

	A classe será definida randomicamente graças a função 'tamanhoRandomico
	que criei abaixo.*/
	mosquito.className = tamanhoRandomico() + ' ' + ladoRandomico()

	/*Usando mosquito.style.left/top vai definir a posição do mosquito a partir
	da esquerda e do topo, respectivamente.

	Você define a posição deles usando as variaveis que criamos, posicaoX e posicaoY,
	que criam um número randomico, e adiciona a string 'px', para que o browser leia
	esse número como pixels. Com isso, a posição se tornará randômica.*/
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	
	/*O position 'absolute' vai definir a posição da imagem a partir do limite do 
	tamanho da página.*/
	mosquito.style.position = 'absolute'
	
	/*Definimos um id para a variável mosquito com o nome de 'mosquito'
	para podermos manipulá-lo*/
	mosquito.id = 'mosquito'

	
	/*Aqui eu crio o comando que me permitirá remover a imagem do mosquito
	com um clique.
	A palavra this nos permite fazer referência ao elemento que está executando
	a função. Nesse caso é o elemento com o nome de mosquito. O this está substituindo
	o nome mosquito.*/
	mosquito.onclick = function() {
		this.remove()
	}

	/*o 'document' acessa o documento, o '.body' acessa o body da página,
	o 'appendChild' é o comando para adicionar o elemento definido dentro do
	parenteses.*/
	document.body.appendChild(mosquito)

	
}

/*A função tamanhoRandomico, como o próprio nome diz, nos permitirá definir
o tamanho do mosquito randomicamente.*/

function tamanhoRandomico() {

	//Criamos uma variável que irá gerar um número entre 0 e 1 randomicamente.
	//Múltiplicamos o número por 3, para que o resultado possa alcançar valores entre 0 e 2.
	//O Math.floor arredonda o número para baixo, para que seja gerado um número inteiro e não com vírgula.
	
	var classe = Math.floor(Math.random() * 3)

	/*Criamos um switch que irá retornar um nome diferente para a classe e consequentemente,
	tamanhos diferentes, dependendo do resultado.*/	
	switch(classe) {
		case 0: 
			return 'mosquito1'

		case 1: 
			return 'mosquito2'

		case 2: 
			return 'mosquito3'
	}
}


/*Função para definir para qual lado a imagem do mosquito vai ficar virada.*/
function ladoRandomico() {

	//Gera um número randômico entre 0 e 1
	//Multiplica por 2 pro resultado ir de 0 a algo próximo de 2
	//Usando o floor, o número será arredondado para baixo, gerando ou 0 ou 1 como resposta.
	var classe = Math.floor(Math.random() * 2)

	
	switch(classe) {
		case 0: 
			return 'ladoA'

		case 1: 
			return 'ladoB'
		
	}
}