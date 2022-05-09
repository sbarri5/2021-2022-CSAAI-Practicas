console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//--BOTONES
const imagen1 = document.getElementById('image1');
const imagen2 = document.getElementById('image2');

const original = document.getElementById('original');
const negative = document.getElementById('negative');
const color = document.getElementById('color');
const mirror = document.getElementById('mirror');
const gray = document.getElementById('gray');
const rotate = document.getElementById('rotate');



//--Acceso deslizador
const R = document.getElementById('R');
const G = document.getElementById('G');
const B = document.getElementById('B');


//--RANGO DE VALORES PARA  deslizador
const Range_Value_R = document.getElementById('Range_Value_R');
const Range_Value_G = document.getElementById('Range_Value_G');
const Range_Value_B = document.getElementById('Range_Value_B');

 



//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};


//--Funcion creada para las diferentes elecciones de imagenes 

image1.onclick = () => {
  img.src="popart1.jpg";
}
image2.onclick = () => {
  img.src="popart2.jpg";
}
image3.onclick = () => {
  img.src="popart3.jpg";
}

function colors(){

  ctx.drawImage(img, 0,0);
  
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Mostrar el nuevo valor del deslizador
  Range_Value_R.innerHTML = R.value;
  Range_Value_G.innerHTML = G.value;
  Range_Value_B.innerHTML = B.value;


  
  //-- Obtener el umbral de rojo del desliador
  var umbral_R = R.value;
  var umbral_G = G.value;
  var umbral_B = B.value;

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_R){
      data[i] = umbral_R;
    }
    if (data[i+1] > umbral_G){
      data[i+1] = umbral_G;
    }
    if (data[i+2] > umbral_B){
      data[i+2] = umbral_B;
    }
    
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada de los deslizadores
  R.oninput = () => {
    colors();
  }
  G.oninput = () => {
    colors();
  }
  B.oninput = () => {
    colors();
  }

//--Duncion habilitada para los deslizadores
function enabled (){
  R.disabled = false;
  G.disabled = false;
  B.disabled = false;
}
//--Funcion deshabilitada para los deslizadores
function disabled(){

  R.disabled = true;
  G.disabled = true;
  B.disabled = true;
}



//--Function ORIGINAL 
original.onclick = () =>{
  disabled();
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0,0);
}

//--Function color botton 
color.onclick = () => {
  enabled();
  ctx.drawImage(img, 0,0);


    R.value = 255;
    Range_Value_R.innerHTML = R.value;
    G.value = 255;
    Range_Value_G.innerHTML = G.value;
    B.value = 255;
    Range_Value_B.innerHTML = B.value;
}


//--Function  MIRROR BOTTON 
mirror.onclick =() => {
  disabled();

  ctx.drawImage(img, 0,0);
  ctx.translate(img.width,0);
  ctx.scale(-1,1);
  ctx.drawImage(img, 0, 0);
}

//--Function NEGATIVE BOTTON
negative.onclick = () =>{
  disabled();

  ctx.drawImage(img, 0, 0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  for (let i = 0; i < data.length; i+=4){
    var R = data[i];
    var G = data[i+1];
    var B = data[i+2];
    data[i] = 255 - R;
    data[i+1] = 255 - G;
    data[i+2] = 255 - B;
  }
  ctx.putImageData(imgData, 0, 0);
}



//--Function Gray Botton Gray 
gray.onclick = () => {
  disabled();

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    var R = data[i];
    var G = data[i+1];
    var B = data[i+2];
    var brillo = (3 * R + 4 * G + B)/8
    brillo = data[i] = data[i+1] = data[i+2];
    }
    // imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
}

function rotar(select){
  if (select == "horizontal") {
    mode = [img.width,0,-1,1]
  } else {
    mode = [0,img.height, 1, -1]
  }
  ctx.translate(mode[0], mode[1]);
  ctx.scale(mode[2], mode[3]);
  ctx.drawImage(img, 0, 0);
}



console.log("Fin...");