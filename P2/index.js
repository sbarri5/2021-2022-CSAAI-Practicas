//-- Autor: Sandra Barrilero Carrasco


function main()
{
  console.log("La página ya está cargada")
  console.log("Ahora es seguro ejecutar el código js")
}

//-- Estados de la calculadora
const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
  COMA: false,
}

// Cojo los elementos con getElementById. IDENTIFICADORES
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borra_ultimo = document.getElementById("borra_ultimo")
punto = document.getElementById("punto");

//-- Crea un array con todos los elementos de la clase cdigito
let digitos = document.getElementsByClassName("cdigito"); //-- Leo del html
//-- Crea un array con todos los elementos de la clase operacion
let operacion = document.getElementsByClassName("operacion"); //-- Leo del html
//-- Crea un array con todos los elementos de la clase boton
let boton = document.getElementsByClassName("boton"); //-- Leo del html

//--Variable del estados
let estado = ESTADO.INIT;

//-- Recorro el array de los digitos, son del 0 al 9
for (i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev)=> {
    digito(ev.target.value);
  }
}

//-- Si se introduce un digito, elimino el 0 en el display
function digito(botons) {
  //-- Según el estado hacemos una cosa u otra
  if(estado == ESTADO.INIT) {
      display.innerHTML = botons;
      estado = ESTADO.OP1;
      console.log(estado,"operador 1");
    }else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION){
      display.innerHTML += botons;
      if (estado == ESTADO.OPERATION) {
          estado = ESTADO.OP2;
          console.log(estado,"segundo operando");
          ESTADO.COMA = false;
      }
    }
  }

//-- Recorro el array de los operadores:
//-- sumar, restar, multiplicar, dividir, exponencial
for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=> {
    if(estado == ESTADO.OP1){
           display.innerHTML += ev.target.value;
           estado = ESTADO.OPERATION;
           console.log(estado,"operacion deseada");
           ESTADO.COMA = true;
    }
  }
}

//-- Evaluo coma para no introducir dos seguidas
punto.onclick = (ev) => {
  if(ESTADO.COMA){
    console.log("Error al poner dos comas seguidas");
  }else{
    display.innerHTML += ev.target.value;
    ESTADO.COMA = true;
    console.log(estado,"No hay error en la coma");
  }
}

//-- Evaluar la expresion: igual
//-- Coge la cadena del display, evalua y asigna al display para mostrarlo
igual.onclick = () => {
  if(estado == ESTADO.OP1 ||  estado == ESTADO.OP2){
      display.innerHTML = eval(display.innerHTML);
      estado = ESTADO.OP1;
      ESTADO.COMA = true;
      console.log(estado,"igual");
  }
}


//-- Borra el ultimo digito u operando
borra_ultimo.onclick = (ev) => {
  display.innerHTML = display.innerHTML.slice(0,-1);
  console.log(estado,"borrar digito");
}

//-- Pone a cero la expresion
clear.onclick = (ev) => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
  ESTADO.COMA = false;
  console.log(estado,"clear, se borra todo");
}