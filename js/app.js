

const formulario = document.querySelector('#formulario');

const listaTareas = document.querySelector('#listado-tareas');

let tareasArray = [];



formulario.addEventListener('submit', agregarTarea);

document.addEventListener('DOMContentLoaded', () => {

    tareasArray = JSON.parse(localStorage.getItem('tareasArray')) || [];
    mostrarTareas();
})




function agregarTarea (e) {
e.preventDefault();


const tareaInput = document.querySelector('#tarea').value;


  if (tareaInput === '') {
     mostrarAlertas('El campo es obligatorio agrega una tarea','error');
     return;
  }
  
  const tareaObjeto = {
    id : Date.now(),
    tareaInput
  }

   tareasArray = [...tareasArray,tareaObjeto];

   formulario.reset();

   mostrarAlertas('Tarea Creada Correctamente');

   mostrarTareas();

  
}



function mostrarTareas () {

   limpiarHTML();
  
   if (tareasArray.length > 0) {


      tareasArray.forEach(tarea => {

      const { id , tareaInput } = tarea;

        const divCard = document.createElement('div');
        divCard.classList.add('card','mt-2');

        const divHeader = document.createElement('div');
        divHeader.classList.add('text-center','card-header');
        divHeader.textContent = 'Tareas';

        const divBody = document.createElement('div');
        divBody.classList.add('card-body');

        const parrafo = document.createElement('p');

        parrafo.textContent = `Nombre de Tarea : ${tareaInput}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger');
        btnEliminar.textContent = 'Eliminar';

        btnEliminar.onclick = () => {
            
            borrarTarea(id);
        }
        
        divCard.appendChild(divHeader);
        divCard.appendChild(divBody);
        divBody.appendChild(parrafo);
        divBody.appendChild(btnEliminar);
        listaTareas.appendChild(divCard);
        
      });

   }else{

       const noHayTareas = document.createElement('div');
       noHayTareas.classList.add('text-center','alert-warning','p-5');
       noHayTareas.textContent = ' No hay tareas agrega una';
       listaTareas.appendChild(noHayTareas); 
   }
  
  

   localStorage.setItem('tareasArray', JSON.stringify(tareasArray));
}





function borrarTarea (id) {
   
   tareasArray = tareasArray.filter ( tareasArray =>  tareasArray.id !== id);
   mostrarAlertas('Tarea Eliminada Correctamente');
   mostrarTareas();
  
}




function limpiarHTML () {
   
   while (listaTareas.firstChild) {
      
      listaTareas.removeChild(listaTareas.firstChild);
   }
}






function mostrarAlertas (mensaje,tipo) {

   
   const alerta = document.querySelector('.alerta');

   if (!alerta) {

      const divMensaje = document.createElement('div');
      divMensaje.classList.add('text-center','alert','alerta','mt-3')

      if (tipo === 'error') {
         
         divMensaje.classList.add('alert-danger');

      }else{

        divMensaje.classList.add('alert-success');
      }

      divMensaje.textContent = mensaje;
      formulario.appendChild(divMensaje)

      setTimeout( () =>  {
         divMensaje.remove();
      },3000);

   }
}