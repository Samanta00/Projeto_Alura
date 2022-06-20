

import {valida} from './matricular.js';



   const inputs=document.querySelectorAll('input')

    inputs.forEach( BordaInput =>{
            BordaInput.addEventListener('blur',(evento)=>{
                    valida(evento.target)
                   
            })


    })
    
