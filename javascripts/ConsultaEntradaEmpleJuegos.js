


let resultado =""

fetch("http://localhost:8080/compradores/traer")
.then(response => response.json())
.then(data=> 
    {
        for (let i=0; i<=data.length; i++){

            resultado +=  `<option>${data[i].dni}</option>`


            

            document.querySelector('.dni').innerHTML = resultado
        }
        
    })
    


.catch(error => console.log(error))



let resultado2 =""

fetch("http://localhost:8080/juegos/traer")
.then(response => response.json())
.then(data=> 
    {
        for (let i=0; i<=data.length; i++){

            resultado2 +=  `<option>${data[i].nombre}</option>`


            

            document.querySelector('.juego').innerHTML = resultado2
            
        }
        
    })
    


.catch(error => console.log(error))



let agregar =""

fetch("http://localhost:8080/empleados/traer")
.then(response => response.json())
.then(data=> 
    {
        for (let i=0; i<=data.length; i++){
            console.log(data[i].nombre)
            agregar +=  `<option>${data[i].nombre}</option>`


            document.querySelector('.empleadoACargo').innerHTML = agregar
            
        }
        
    })
    
.catch(error => console.log(error))

