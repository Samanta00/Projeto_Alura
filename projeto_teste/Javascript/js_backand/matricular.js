
export function valida(input){
    const tipoInput=input.dataset.tipo; 

    if(validadores[tipoInput]){
        validadores[tipoInput](input)
       
    }


    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML=''
    }
    else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML=mostraMensagemErros(tipoInput,input);
    }

}




//Preciso por todos os tipos de erros em um array, dessa forma faço um laço de repetição e descubro qual erro o input apresenta
const TiposErros=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"];

const validadores={
    dataNascimento : input => OrdenarData(input),
    cpf: input =>checaCPF(input),
    cep: input =>recuperarCep(input)
}




const mensagensErros={
    nome:{
        valueMissing:'O campo Nome Não pode ser enviado Vázio'

    },
    email:{
        valueMissing:'O campo Email Não pode ser enviado Vázio',
        typeMismatch:'O email digitado não é válido'

    },
    senha:{
        valueMissing:'O campo Senha Não pode ser enviado Vázio',
        patternMismatch:"A senha deve conter de 8 a 16 caracteres, uma letra maiuscula e uma minuscula, um numero e não deve ter os valores como espaço vazio ou simbolos do tipo , ´ ` ^ "

    },
    dataNascimento:{
        valueMissing:'O campo de Data de Nascimento não pode ser enviado vázio',
        customError:'Somente pessoas +18 podem fazer o cadastro, Se você é menor de idade faça o cadastro com os dados e ao lado de um responsável'

        //customError não existe em uma validação no html, ele é um valor do campo input onde posso alterar a mensagem e customizar 
    },
    cpf:{
        valueMissing:'O campo de CPF não pode ser enviado vázio, preencha!',
        customError:'O cadastro Aceita somente CPF válidos!'
    },
    cep:{
        valueMissing:'O campo de CEP não pode ser enviado vázio, preencha!', // valueMissing retorna quando o campo está vázio
        patternMismatch:'O CEP digitado não é válido, digite um CEP válido', // o patterMismatch retorna quando o valor passado não bate com o valor que a regex espera
        customError:'Não foi possivel encontrar o Cep'
    },
    logradouro:{
        valueMissing:'O campo de Logradouro não pode ser enviado vázio, preencha!'
    },
    estado:{
        valueMissing:'O campo de Estado não pode ser enviado vázio, preencha!'
    },
    cidade:{
        valueMissing:'O campo de Cidade não pode ser enviado vázio, preencha!'
    }
    


}

function mostraMensagemErros(tipoInput, input){
    let mensagem='';

   TiposErros.forEach(erro=>{
// a função em sí vai lá no html, pegar o elemento input no html. vai dar $0.validity e procurar os erros que estão true se tiver algum vai pegar uma let vazia chamada
//mensagem e vai passar os tipos de erros como valor, dentro do tipoErros ele entra dentro do array de Objetos tipoErros vai procurar a chave do TipoInput e vai pegar o valor do erro
        if(input.validity[erro]){
            mensagem=mensagensErros[tipoInput][erro]
           
        }
    })

    return mensagem

}






function OrdenarData(input){
   const dataRecebida=new Date(input.value);

   let mensagem=''

   if(!Maior18(dataRecebida) ){
       mensagem='Você precisa ser maior de idade para poder se cadastrar';}
       input.setCustomValidity(mensagem)
       
  }
function Maior18(data){
    const dataAtual=new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())
    return dataMais18 <= dataAtual;

}
  





function checaCPF(input){
// formatoCPF guarda o valor de input e repassa uma expressão regular que substitui tudo que não for números em vázio
    const formatoCpf=input.value.replace(/\D/g, '')
    let mensagem=''

        if(!checaRepetidos(formatoCpf) || !validaCpf(formatoCpf)){

            mensagem = 'O cpf não é válido, digite um cpf válido'
       
        }

  input.setCustomValidity(mensagem); // o setCustomValidity vai cair dentro do $0.validity do input
}

function checaRepetidos(cpf){

       const cpfInvalidos=[
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido=true;

cpfInvalidos.forEach(valor_repetido=>{
    if(cpf==valor_repetido){
        cpfValido=false
        console.log('estou aqui3323')
    }
})

    return cpfValido
}

//faço uma função que retorna outra função com o calculo matemático para saber se cpf é válido ou não
function validaCpf(cpf){
    let multiplicador=10;
    //como cpf tem 11 numeros coloco que o multiplicador dele é 10, pois vai ser contado da seguinte forma, 0,1,2,3,4,5,6,7,8,9,10
   return validandoCPf(cpf,multiplicador);
    

}

//nessa função matemática ele vai somar os ultimos 2 digitos do cpf para validar
function validandoCPf(cpf,multiplicador){


    // quando o valor de multiplicado passar de 12 significa que ele somou já os 11 indices de cpf e validou todos
  if(multiplicador>=12){
      return true
  }  

  //preciso por o em uma váriavel o valor de multiplicador para o valor dele não ser contado por cima dele própio quando entrar no laço de repetição
    var multiplicadorValidado=multiplicador
    var soma=0;

    // cpf sem digito vai ser o valor do cpf passado em um substr a substr vai por a parte que eu estou passando em um array, eu declaro que quero o valor de 0 até
    // o valor de multiplicador-1 que no caso é 9, então estou passando 9 valores como cpf, depois passo ele em um split que no caso vai tornar todos esses valores
    // como chave do índice

    var cpfSemDigitos=cpf.substr(0,multiplicador-1).split('');

    // charAt vai pegar o valor especifico que estou chamando no caso vai pegar o cpf no indice 9
    const digitoVerificado=cpf.charAt(multiplicador-1)

for(let contador=0; multiplicadorValidado>1; multiplicadorValidado--){
    soma+=cpfSemDigitos[contador]*multiplicadorValidado;
    contador++
}
// o for vai ter um contador que começa com 0 e o multiplicador precisa ser maior do que 1 então ele nao começa a contar no indice 0 e sim no indice 1
//logo após o multiplicador vai ser contado em ordem decrescente ou seja vai conta de 10,9,8,7,6,5,4,3,2,1,0
//o contador vai ser o indice que vai ser percorrido dentro de multiplicador

if(confirmaDigito(soma)==digitoVerificado){
    return validaCpf(cpf,multiplicador+1)
}
   return false

}

function confirmaDigito(ValorDasoma){
    return 11-(ValorDasoma%11)
}

function recuperarCep(input){
    let valoresCep=input.value.replace(/\D/g,' ');
    const url = `https://viacep.com.br/ws/${valoresCep}/json/`
    const options={
        method: 'GET', //Essas são informações básicas para fazer uma requisição. Vale pensar da seguinte maneira: como queremos (method) e o que queremos (headers).
                        //A opção mode é opcional, mas ela é necessária quando vamos fazer chamadas entre aplicações diferentes.
        mode: 'cors',
        headers:{ //vai guardar todos os valores que foi passado na url dentro do objeto headers
            'content-type': 'application/json;charset=utf-8' //tudo que o url for passar dentro do headers vai estar no padrão utf8
        }

    }
    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {// quando enviado um cep Inválido ele retorna true, preciso fazer uma condição, pois esse objeto retorna true quando está errado
  
                if(data.erro){ //o if(data.erro) é a mesma coisa de fazer if(data.erro==true) , o data é a chave do objeto
                   return input.setCustomValidity('Não foi possivel encontrar o Cep');
                    
                }
                input.setCustomValidity('');
                console.log(data)
                preencheCampo(data); // o data é todos os valores que a api está recebendo e passando pros data-tipo
                return
            }
        )

    }


}

function preencheCampo(data){
  const logradouro = document.querySelector('[data-tipo="logradouro"]'); //quando eu passo o valor dentro do query selector ele vai pegar o parametro que estou chamando na função
  const cidade=document.querySelector('[data-tipo="cidade"]'); //e seleciono o data-tipo que estou passando, então ele está puxando os data-tipos
  const estado=document.querySelector('[data-tipo="estado"]');

    logradouro.value=data.logradouro; //aqui declaro que o valor do input vai ser o valor que o data-tipo vai passar pra ele
    cidade.value=data.localidade; //OBS: O DATA.localidade ou data.uf ou qualquer data que esteja recebendo um nome nesse trecho do código está puxando essa informação
    estado.value=data.uf;  // da api então se o nome que está dentro do data são esses é pq a informação na api está com esse nome
    // e estou passando que o campo do input vai receber essa informação da api

}

