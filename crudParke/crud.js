const url ="http://localhost:8080/personas/traer"
const url2 ="http://localhost:8080/personas/borrar/"
const url3 = "http://localhost:8080/personas/crear"
const url4 = "http://localhost:8080/personas/editar/"
const contenedor = document.querySelector('tbody')
let resultados = ''
const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const FormArticulo  = document.querySelector('form')
const usuario  = document.getElementById('usuario')
const clave  = document.getElementById('contraseña')
let opcion=''

btnCrear.addEventListener('click', ()=>{
   
    modalArticulo.show()
   
    opcion = 'crear'
    
})
//funcion para mostrar resusltados
const mostrar =(articulos) =>{
    articulos.forEach(articulo => {
        resultados +=  `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.usuario}</td>
                            <td>${articulo.contraseña}</td>
                            <td class="text-center"> <a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Eliminar</a></td>

                        </tr>`
        
    })

    contenedor.innerHTML = resultados
}




//procedimient0 mostrar

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

// Borrar
on(document, "click", '.btnBorrar', e =>{
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    
    alertify.confirm("Desea eliminar este usuario?",
  function(){
    fetch(url2 + id,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => location.reload())
    

    alertify.success('Ok')
  },
  function(){
    alertify.error('Cancel')
  })
})


//Editar

let idForm = 0
on(document, "click", '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const idFormu = fila.children[0].innerHTML
    const usuarioForm = fila.children[1].innerHTML
    const contraseñaForm= fila.children[2].innerHTML
    id.value = idFormu
    usuario.value = usuarioForm
    
    contraseña.value = contraseñaForm
    opcion = 'editar'
    modalArticulo.show()
    
})

// para crear y editar

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
                usuario:usuario.value,
                contraseña:contraseña.value
                
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
            usuario:usuario.value,
            contraseña:contraseña.value
            
        })
    })
    .then(response => response.json() )
    .then(response => location.reload())

    }
    modalArticulo.hide()
})
