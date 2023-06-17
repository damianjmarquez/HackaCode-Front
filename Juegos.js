//LLAMADO A LAS URL CORRESPONDIENTE PARA LOS CRUD PARA LOS EMPLEADOS
const url ="http://localhost:8080/juegos/traer"
const url2 ="http://localhost:8080/juegos/borrar/"
const url3 = "http://localhost:8080/juegos/crear"
const url4 = "http://localhost:8080/juegos/editar/"

//seleccionar el tbody para en el ingresar los datos que se obtienen de la tabla 
const contenedor = document.querySelector('tbody')
let resultados = ''
const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const FormArticulo  = document.querySelector('form')
const nombre  = document.getElementById('nombre')
const personas  = document.getElementById('personas')
const precio  = document.getElementById('precio')
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
                            <td>${articulo.cantidadDePersonas}</td>
                            <td>${articulo.precio}</td>
                            <td class="text-center"> <a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Eliminar</a></td>

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


//EDITAR LOS DATOS DE LA VENTANA EMERGENTE
let idForm = 0
on(document, "click", '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const idFormu = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const personasForm= fila.children[2].innerHTML
    const precioForm= fila.children[3].innerHTML
    id.value = idFormu
    nombre.value = nombreForm
    cantidadDePersonas.value = personasForm
    precio.value = precioForm
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
                cantidadDePersonas:cantidadDePersonas.value,
                precio:precio.value
                
                
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
       console.log('opcion editar')
       fetch(url4, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
                id:id.value,
                nombre:nombre.value,
                cantidadDePersonas:cantidadDePersonas.value,
                precio:precio.value
            
        })
    })
    .then(response => response.json() )
    .then(response => location.reload())

    }
    modalArticulo.hide()
})
