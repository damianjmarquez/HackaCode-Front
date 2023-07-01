//LLAMADO A LAS URL CORRESPONDIENTE PARA LOS CRUD
const url ="http://localhost:8080/entrada/traer"
const url2 ="http://localhost:8080/entrada/borrar/"
const url3 = "http://localhost:8080/entrada/crear"
const url4 = "http://localhost:8080/entrada/editar/"


//seleccionar el tbody para en el ingresar los datos que se obtienen de la tabla 
const contenedor = document.querySelector('tbody')
let resultados = ''
const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const FormArticulo  = document.querySelector('form')
const dni  = document.getElementById('dni')
const juego  = document.getElementById('juego')
const fecha  = document.getElementById('fecha')
const precio  = document.getElementById('precio')
const hora  = document.getElementById('hora')
let opcion=''


//boton correspondiente al la ventana modal para crear y modificar los datos
btnCrear.addEventListener('click', ()=>{
   
   modalArticulo.show()
   
    opcion = 'crear'
    
})


//funcion para mostrar resusltados

const mostrar =(articulos) =>{
    
    articulos.forEach(articulo => {
        resultados +=  `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.dni}</td>
                            <td>${articulo.juego}</td>
                            <td>${articulo.fecha}</td>
                            <td>${articulo.precio}</td>
                            <td>${articulo.hora}</td>
                            <td class="text-center"> <a class="btnEditar btn btn-primary">Editar</a><a onclick="actualizarPagina()" class="btnBorrar btn btn-danger">Eliminar</a></td>

                        </tr>`
                        
    })
    contenedor.innerHTML = resultados
}





//MOSTRANDO LOS DATOS CORRESPONDIENTES EN LA TABLA

fetch(url)
.then(response => response.json())
.then(data=> mostrar(data))
.catch(error => console.log(error))

const on = (element, event, selector, handler)=>{
    
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}


// BORRAR LA LINEA DE LA TABLA MEDIANTE EL BOTON BTNBORRAR INGRESADO EN LA MISMA LINEA CON SU FETCH CORRESPONDIENTE
on(document, "click", '.btnBorrar', e =>{
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    
    
    fetch(url2 + id,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => location.reload())
    
})

function actualizarPagina(){
   
    //if(document.getElementById('hora').value === "12:00:00"){
        location.reload();
    //}
    //else{
        //alert("no se pudo crear")
    //}
    
}

//EDITAR LOS DATOS DE LA VENTANA EMERGENTE 

let idForm = 0
on(document, "click", '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const idFormu = fila.children[0].innerHTML
    const dniForm = fila.children[1].innerHTML
    const juegoForm= fila.children[2].innerHTML
    const fechaForm = fila.children[3].innerHTML
    const precioForm= fila.children[4].innerHTML
    const horaForm = fila.children[5].innerHTML
    
    id.value = idFormu
    dni.value = dniForm
    juego.value = juegoForm
    fecha.value = fechaForm
    precio.value = precioForm
    hora.value = horaForm
    
    
    opcion = 'editar'
    modalArticulo.show()
    
})

function disponible(){
    if (document.getElementById('hora').value >= "10:00:00" &&
    document.getElementById('hora').value <= "16:00:00"){
        swal.fire({
            title:"Horario Disponible",
            text:"Puedes seleccionarlo",
            icon: "success",
            confirmButtonText:"Seleccionar"
        }) 
    }else{
        swal.fire({
            title:"Horario No Disponible",
            text:"El horario de juegos es de las 10:00hs a 16:00hs",
            icon: "error",
            confirmButtonText:"Ingresar nuevo horario"
        }) 
    }
}

//SI LA OPCION SELECCIONADA ES LA DE CREAR SE ABRE CON LOS DATOS INGRESADOS EN DICHA LINEA DE LO CONTRARIO SE CREAN LOS DATOS
FormArticulo.addEventListener('submit', (e) =>{
    e.preventDefault()
    if(opcion == 'crear' && document.getElementById('hora').value >= "10:00:00" &&
     document.getElementById('hora').value <= "16:00:00"){  
        
        fetch(url3 , {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            
            body: JSON.stringify({
                
                id:id.value,
                dni:dni.value,
                juego:juego.value,
                fecha:fecha.value,
                precio:precio.value,
                hora:hora.value
                
            })
        })
        
        .then(response => response.json() )
        .then(data =>{
            
            const nuevoArticulo =[]
            nuevoArticulo.push(data)

            
            mostrar(nuevoArticulo)
            
        }
        )
        
    }
    
    if(opcion == 'editar'){  
       
        fetch(url3 , {
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
                id:id.value,
                dni:dni.value,
                juego:juego.value,
                fecha:fecha.value,
                precio:precio.value,
                hora:hora.value
          })
      })
  .then(response => response.json() )
  .then(response => console.log(response) )
  

  }
  modalArticulo.hide()
})