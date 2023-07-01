//LLAMADO A LAS URL CORRESPONDIENTE PARA LOS CRUD
const url ="http://localhost:8080/compradores/traer"
const url2 ="http://localhost:8080/compradores/borrar/"
const url3 = "http://localhost:8080/Compradores/crear"
const url4 = "http://localhost:8080/compradores/editar/"


//seleccionar el tbody para en el ingresar los datos que se obtienen de la tabla 
const contenedor = document.querySelector('tbody')
let resultados = ''
const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const FormArticulo  = document.querySelector('form')
const nombre  = document.getElementById('nombre')
const apellido  = document.getElementById('apellido')
const nacimiento  = document.getElementById('nacimiento')
const dni  = document.getElementById('dni')
const telefono  = document.getElementById('telefono')
const email  = document.getElementById('email')
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
                            <td>${articulo.nombre}</td>
                            <td>${articulo.apellido}</td>
                            <td>${articulo.nacimiento}</td>
                            <td>${articulo.dni}</td>
                            <td>${articulo.telefono}</td>
                            <td>${articulo.email}</td>
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
    location.reload();
}



//EDITAR LOS DATOS DE LA VENTANA EMERGENTE 

let idForm = 0
on(document, "click", '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const idFormu = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const apellidoForm= fila.children[2].innerHTML
    const nacimientoForm = fila.children[3].innerHTML
    const dniForm= fila.children[4].innerHTML
    const telefonoForm = fila.children[5].innerHTML
    const emailForm= fila.children[6].innerHTML
    id.value = idFormu
    nombre.value = nombreForm
    apellido.value = apellidoForm
    nacimiento.value = nacimientoForm
    dni.value = dniForm
    telefono.value = telefonoForm
    email.value = emailForm
    opcion = 'editar'
    modalArticulo.show()
})



//SI LA OPCION SELECCIONADA ES LA DE CREAR SE ABRE CON LOS DATOS INGRESADOS EN DICHA LINEA DE LO CONTRARIO SE CREAN LOS DATOS
FormArticulo.addEventListener('submit', (e) =>{
    e.preventDefault()
    if(opcion == 'crear'){  
        console.log('opcion crear')
        fetch(url3 , {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id:id.value,
                nombre:nombre.value,
                apellido:apellido.value,
                nacimiento:nacimiento.value,
                dni:dni.value,
                telefono:telefono.value,
                email:email.value    
            })
        })
        .then(response => response.json() )
        .then(data =>{
            const nuevoArticulo =[]
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
       
    }
    if(opcion == 'editar'){  
       
        fetch(url3 , {
          method: 'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
            id:id.value,
            nombre:nombre.value,
            apellido:apellido.value,
            nacimiento:nacimiento.value,
            dni:dni.value,
            telefono:telefono.value,
            email:email.value  
              
          })
      })
  .then(response => response.json() )
  .then(response => console.log(response) )
  

  }
  modalArticulo.hide()
})