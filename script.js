var p = '';
var props = [];
var props_len = props.length;
var c = 0;
var ic = 0;
const status = document.getElementById("status")
const paccepted = document.getElementById("ac");
const prejected = document.getElementById("rc");
const final = document.getElementsByClassName("decision");
const quest = document.getElementById("question");
const object = document.getElementById("object");
const btn_yes= document.getElementById("object-yes");
const btn_no= document.getElementById("object-no");

var accepted = [];
var rejected = [];
var finished = false;
var r_found = false;
var actual_obj = null;

let kb = [
  {
    props: ['A', 'B', 'C'],
    descr: 'This contains the object 1'
  },
  {
    props: ['A', 'M', 'Y'],
    descr: 'This contains the object 2'
  },
  {
    props: ['D','X','C'],
    descr: 'This contains the object 3'
  },
  {
    props: ['A','B','D'],
    descr: 'This contains the object 4'
  },
  { //Estos son de prueba y no son validos para la materia
    props: ['Z','Q','M'],
    descr: 'This contains the object 5'
  },
  {
    props: ['A','M','Q'],
    descr: 'This contains the object 6'
  },
  {
    props: ['A','V','W'],
    descr: 'This contains the object 7'
  }
];

function getProps(){
  if(actual_obj!=null){
    for(var i=0; i<actual_obj.props.length;i++)
      props.push(actual_obj.props[i]);
    props_len = actual_obj.props.length;
  }
}
function setLetter(){
  p = actual_obj.props[ic];
  if(p!=undefined)
    object.innerText = String(p);
}

// Se establece/actualiza el objeto en la posición c
updateObject(c);

function updateObject(counter){
  if(counter>=0 && counter<=kb.length){
    actual_obj = kb[counter];
    getProps(); setLetter();
  }
  
}

//Transforma un objeto del tipo A = ['M','C','Y'] en A = 'M, C, Y'
function printProps(array){
  if(array!=null){
    let s = '';
    for(var i=0; i<array.length; i++){
      if(i == 0){
        s = array[i];
      }
      else
        s += ', '+array[i];
    }
    return s;
  }
  else
    return "__NOPROP__";
}

function displayStatus(){
  status.style.display = "block";
  paccepted.innerHTML = "Aceptados: <b>"+printProps(accepted)+"</b>";
  prejected.innerHTML = "Rechazados: <b>"+printProps(rejected)+"</b>";
}

//Cada que se presiona el boton YES hace la validación
function acceptedProp(){
  if(actual_obj.props[ic]!=null){
    if(ic++<props_len){
      accepted.push(p);
      setLetter();
      displayStatus();
      JSON.stringify(actual_obj.props)===JSON.stringify(accepted) ? 
      terminado(): '';
    }
    else
      finalizado();
  } 
}

function rejectedProp(){
  if(actual_obj.props[ic]!=null){
    if(ic<props_len){
      rejected.push(p);
      buscarArreglo();
      setLetter();
      displayStatus();
    }
    else
      finalizado();
  } 
}

function buscarArreglo(){
  console.log("Entrando a buscar rechazados");
  for(var i=0; i<rejected.length; i++){
      for(var x=0; x<actual_obj.props.length;x++){
        if(actual_obj.props[x]===rejected[i]){
          console.log("Contador: "+i+"\nObj.prop: "+actual_obj.props[x]+"\nRejected: "+rejected[i]);
          if(c<kb.length){
            updateObject(++c);
            p == actual_obj.props[x] ? ++ic : '';
            setLetter();
          }
          else{
            finalizado();
          }
          break;
        }
      }
  }
}

function finalizado(){
  JSON.stringify(actual_obj.props)==JSON.stringify(accepted) ? terminado(): reintentar();
  final.innerHTML = "<a id='object-yes'>Ver objeto.</a>";
}

function terminado(){
  console.log("He encontrado algo y terminé.")
  quest.innerHTML = "El objeto encontrado es: <b>"+(c+1)+"</b>";
}

function resetear(){
  actual_obj = []; p = '';
  props = []; c = 0; ic = 0;
  accepted = []; rejected = [];
  props_len = props.length;
  updateObject(c); getProps();
  setLetter(); displayStatus();
}

function reintentar(){
  resetear(); 
  console.log("No he encontrado nada y reintentaré.")
  quest.innerHTML = "No se ha encontrado el <b>objeto</b>";
  quest.innerHTML = "¿El objeto tiene <b id='object'>"+p+"</b>?";
}

btn_yes.onclick = function(){
  if(ic<props_len){
    acceptedProp();
    console.log("Sigo aceptando");
    console.log("Propiedad(es) verdadera(s): "+printProps(accepted));
  }
  else{
    console.log("Ya no debería seguir aceptando");
    finalizado();
  }
    
  //console.log("Propiedad(es) verdadera(s): "+accepted);
}

btn_no.onclick = function(){
  if(ic<props_len){
    rejectedProp();
    console.log("Sigo rechazando");
    console.log("Propiedad(es) rechazadas(s): "+printProps(rejected));
  }
  else{
    console.log("Ya no debería seguir rechazando");
    finalizado();
  }
}