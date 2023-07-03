
window.onload = function(){
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button";
    window.onhashchange = function(){
        window.location.hash = "no-back-button";
        
    }
}


const url ="http://localhost:8080/personas/traer"




let usuarioForm  = document.getElementById("usuarioFormulario").value

let contraseñaForm  = document.getElementById("claveFormulario").value

function boton(){


fetch(url)

.then(response => response.json())

.then(data=> 
                {for(let i=0; i<=data.length; i++){
    
                    if(data[i].usuario === document.getElementById("usuarioFormulario").value &&
                       data[i].contraseña === document.getElementById("claveFormulario").value &&
                       data[i].tipo === "Juego"){
    
    
                        location.href ="http://127.0.0.1:5500/HTML/index.html"
                    }
                    else{
                        if( document.getElementById("usuarioFormulario").value === "admin" &&
                        document.getElementById("claveFormulario").value === "admin" || data[i].usuario === document.getElementById("usuarioFormulario").value &&
                       data[i].contraseña === document.getElementById("claveFormulario").value &&
                       data[i].tipo === "Admin"){
    
    
                        location.href ="http://127.0.0.1:5500/HTML/indexAdmin.html"
                    }
                    else{
                       
                    }
                    }
    
    
                }
                }
        
)
.catch(error => console.log(error))

            }





const on = (element, event, selector, handler)=>{
    
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}










