const TEMAS = ['Cocina', 'Futbol', 'Salud', 'Arte', 'Sucesos', 'Política', 'Economía', 'Música', 'Cine', 'Baloncesto', 'Javascript', 'Vinos', 'Papiroflexia'];

//En el examen en un apartado dices de poner el precio, pero como no habia nada adjunto me los invente
var precios = {
  'basico' : 10,
  'estandar' : 12,
  'premium' : 20,
  'elite' : 25
}

let spanError = [...document.getElementsByClassName('error')];
let inputName = document.getElementById('nombre');
let inputDni = document.getElementById('dni');
let suscriptions = [...document.getElementsByName('tipo')];
var temas = document.querySelectorAll('fieldset');
let maxTemas = 1;

inputName.addEventListener("blur", function(event){
  let text = inputName.value.toUpperCase();
  inputName.value = text;
});

document.getElementsByTagName('form')[0].addEventListener('submit', (e) =>{
  e.preventDefault();
  if(inputName.value.length < 3){
    spanError[0].textContent = 'Se espera una palabra mayor a 3 letras';
    return;
  }

    let seleccionados = [...document.querySelectorAll('input[name="tema"]:checked')];
    if(seleccionados.length > maxTemas){
      if(spanError[spanError.length-1].textContent == 0){
        spanError[spanError.length-1].textContent = 'Solo puede seleccionar '+maxTemas+' temas para la suscripción';
        return;
      }
    }else{
      spanError[spanError.length-1].textContent = '';
    }
  

});



//Validacion de las suscripciones
suscriptions.forEach((suscription) =>{
  suscription.addEventListener("click", limiteTemas);
  suscription.addEventListener("change", validateSuscription);
});

function validateSuscription(event){
  let precio = document.getElementById('precio');
  let claves = Object.keys(precios);
  for(let i=0; i<claves.length; i++){
    if(claves[i] === event.target.value){
      precio.textContent = precios[claves[i]];
    }
  }
}

//Poner los temas en el html
TEMAS.forEach((tema) =>{
  let input = document.createElement('input');
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "tema");
  input.setAttribute("id", tema);
  input.setAttribute("value", tema);

  let label = document.createElement('label');
  label.setAttribute("for", tema);
  label.textContent = tema;

  let fieldsetTemas = document.querySelector('fieldset:nth-child(3)');
  fieldsetTemas.insertBefore(input, fieldsetTemas.childNodes[fieldsetTemas.childNodes.length - 3]); 
  fieldsetTemas.insertBefore(label, fieldsetTemas.childNodes[fieldsetTemas.childNodes.length - 3]);
});


//Validacion de los temas

function limiteTemas(event){
  switch(event.target.value){
    case 'basico':
      maxTemas = 1;
      break;
    case 'estandar':
      maxTemas = 3;
      break;
    case 'premium':
      maxTemas = 5;
      break;
    case 'elite':
      maxTemas = 10;
      break;
    default:
      maxTemas = 1;
  }
}
