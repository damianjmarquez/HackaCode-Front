//LLAMADO A LAS URL CORRESPONDIENTE PARA LOS CRUD PARA LOS EMPLEADOS
const url ="http://localhost:8080/juegos/traer"


//seleccionar el tbody para en el ingresar los datos que se obtienen de la tabla 
const contenedor = document.querySelector('tbody')
let resultados = ''
const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const FormArticulo  = document.querySelector('form')
const nombre  = document.getElementById('nombre')
const personas  = document.getElementById('personas')
const precio  = document.getElementById('precio')
const empleado  = document.getElementById('empleado')
let opcion=''


//boton correspondiente al la ventana modal para crear y modificar los datos

//funcion para mostrar resusltados
const mostrar =(articulos) =>{
    articulos.forEach(articulo => {
        resultados +=  `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.nombre}</td>
                            <td>${articulo.cantidadDePersonas}</td>
                            <td>${articulo.precio}</td>
                            <td>${articulo.empleado}</td>
                            

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


function actualizarPagina(){
    location.reload();
}

//EDITAR LOS DATOS DE LA VENTANA EMERGENTE



//SI LA OPCION SELECCIONADA ES LA DE CREAR SE ABRE CON LOS DATOS INGRESADOS EN DICHA LINEA DE LO CONTRARIO SE CREAN LOS DATOS
