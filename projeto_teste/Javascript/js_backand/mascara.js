function mascara(){
    let input=document.getElementById('cpf');

    if(input.value.length == 3 || input.value.length == 7){
        input.value+="."
    }
    else if(input.value.length==11){
        input.value+="-"
    }
}