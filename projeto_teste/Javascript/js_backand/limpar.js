function limpar(){
    var inputs=document.querySelectorAll('input').values;

    inputs.forEach(valores_Input,(evento) =>{
        evento.preventDefault();
        valores_Input='';
        
    })
    
}