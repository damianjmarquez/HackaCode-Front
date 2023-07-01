
let resultado =""
let juegos =[]
fetch("http://localhost:8080/juegos/traer")
.then(response => response.json())
.then(data=> 
    {
        for (let i=0; i<=data.length; i++){
            resultado +=  `<option>${data[i].nombre}</option>`
            juegos.push(data[i].nombre)
            document.querySelector('.juego').innerHTML = resultado
        }
    })
.catch(error => console.log(error))






let linea=[]
fetch("http://localhost:8080/entrada/traer")
.then(response => response.json())
.then(data=> 
    {
        for (let i=0; i<=data.length; i++){
            linea.push(data[i])
        }
    })
.catch(error => console.log(error))
 


function fecha(){
    let resultado2=""
    for (let i=0; i<=linea.length; i++){
        if (linea[i].fecha === (document.getElementById("fecha").value)){  
        resultado2 +=  `<tr>
                            <td>${linea[i].dni}</td>
                            <td>${linea[i].juego}</td>
                            <td>${linea[i].fecha}</td>
                            <td>${linea[i].precio}</td>
                        </tr>`
    }
    document.querySelector('tbody').innerHTML = resultado2
}
}


 
function fecha1(){
   
    let resultado2=""
    for (let i=0; i<=linea.length; i++){
      
        if (linea[i].fecha === (document.getElementById("fecha1").value) && 
            linea[i].juego === document.getElementById("juego1").value){
            resultado2 +=  `<tr>
                                <td>${linea[i].dni}</td>
                                <td>${linea[i].juego}</td>
                                <td>${linea[i].fecha}</td>
                                <td>${linea[i].precio}</td>
                            </tr>`
        }
        document.querySelector('.tbody').innerHTML = resultado2
    }
    }


function fecha3(){
    let ventas =""
    let suma= 0
    for (let i=0; i<=linea.length; i++){   
        if (linea[i].fecha === (document.getElementById("fecha2").value)){
            ventas +=  `<tr>
                        <td>${linea[i].dni}</td>
                        <td>${linea[i].juego}</td>
                        <td>${linea[i].fecha}</td>
                        <td>${linea[i].precio}</td>                        
                        </tr>`
                        suma +=   linea[i].precio
        }
        document.querySelector('.ventas').innerHTML = ventas
        document.querySelector('.suma').innerHTML = "$ "+ suma
            
    }
}


        
function fecha4(){
    let ventas2 =""
    let suma2= 0
    for (let i=0; i<=linea.length; i++){
        if (linea[i].fecha >= (document.getElementById("monto").value)&&
        linea[i].fecha <= (document.getElementById("monto1").value)){
            ventas2 +=  `<tr>
                        <td>${linea[i].dni}</td>
                        <td>${linea[i].juego}</td>
                        <td>${linea[i].fecha}</td>
                        <td>${linea[i].precio}</td>
                    </tr>`
                    suma2 +=   linea[i].precio
        }
        document.querySelector('.ventas2').innerHTML = ventas2
        document.querySelector('.suma2').innerHTML = "$ "+ suma2 
    }
    }



function fecha5(){
    let ventas2 =""
    let dni =[]
        for (let i=0; i<=linea.length; i++){
            
        if (linea[i].fecha >= (document.getElementById("monto3").value)&&
        linea[i].fecha <= (document.getElementById("monto2").value)){
            ventas2 +=  `<tr>
                        <td >${linea[i].dni}</td>
                        <td>${linea[i].juego}</td>
                        <td>${linea[i].fecha}</td>
                        <td>${linea[i].precio}</td>
                        </tr>`
            dni.push(linea[i].dni)       
            }
            document.querySelector('.ventas3').innerHTML = ventas2
            
        }
        
    }


let agregar =""
fetch("http://localhost:8080/compradores/traer")
.then(response => response.json())
.then(data=> 
{
for (let i=0; i<=data.length; i++){
    agregar +=  `<option>${data[i].dni}</option>`
    document.querySelector('.dniEmpleado1').innerHTML = agregar
}
})
.catch(error => console.log(error))


    

function fecha6(){
    let ventas2 =""
    for (let i=0; i<=linea.length; i++){
        if (linea[i].fecha === (document.getElementById("fecha").value)&&
        linea[i].dni === (document.getElementById("dniEmpleado").value)){
            ventas2 +=  `<tr>
                        <td>${linea[i].dni}</td>
                        <td>${linea[i].juego}</td>
                        <td>${linea[i].fecha}</td>
                        <td>${linea[i].precio}</td> 
                        </tr>`    
            }
            document.querySelector('.ventas2').innerHTML = ventas2  
        }
        }        