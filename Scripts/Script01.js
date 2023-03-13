// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getDatabase, ref, set, child, onValue, get, onChildAdded, onChildChanged, onChildRemoved} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
      
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATb1d5IrKUvwSp4kh6PWabBoSGukWyqvQ",
    authDomain: "msc-jorgejcs-carlos-dht11-f.firebaseapp.com",
    databaseURL: "https://msc-jorgejcs-carlos-dht11-f-default-rtdb.firebaseio.com",
    projectId: "msc-jorgejcs-carlos-dht11-f",
    storageBucket: "msc-jorgejcs-carlos-dht11-f.appspot.com",
    messagingSenderId: "635122711335",
    appId: "1:635122711335:web:cabef481e203d17a1bc702"
};
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getDatabase()
const dbRef = ref(getDatabase());
/*
//EXPORT PERMITE IMPORTARLO EN DISTINTOS MODULOS, RECIBE DATOS COMO UN METODO CONTIENE FUNCIONES, IGUAL QUE UN METODO (?)
export const guardarDatos = (inFecha, inHumedad, inSTC, inSTF, inTemperaturaC, inTemperaturaF) => {
    console.log(inFecha + inHumedad + inSTC + inSTF + inTemperaturaC + inTemperaturaF);
}
*/
/*
export const guardarDatos = (nombreF, numeroF) => {
  console.log(nombreF, numeroF);
  var randomValue = Math.floor(Math.random() * 100) //VALOR ALEATORIO ENTRE 0 Y 10
  //set es el equivalente a add() o push() en firebase
  //ref contiene parametro 1 referencia a la bd y la dirección basada en el arbol de valores
  set(ref(db, 'esp32/Prueba_JS/' + randomValue),{
    Nombre: nombreF,
    Numero: numeroF
  })
}
*/

//Recibir Valores y agregarlos al DOM
const retrieved = get(child(dbRef, `esp32/JCS_Carlos/PRUEBADHT11_4/`)).then((snapshot) => {
    if(snapshot.exists()){
        //RECIBE EL OBJETO DE LA LLAMADA Y LO AGREGA A UN ARREGLO
        const obtenerArregloConLecturas = Object.entries(snapshot.val());
        const borrarLoading = document.querySelectorAll(".cargandoValores");
        borrarLoading.forEach((elemento) => {
            elemento.remove();
        });
        
        //CREARÁ UN NUEVO ELEMENTO EN CADA ITERACION
        for(let i=0; i<obtenerArregloConLecturas.length; i++){
            //OBTIENE EL CONTENEDOR - CREA UN SECTION - ASIGNA UNA CLASE - AGREGA AL DOCUMENTO
            const contenedorLecturas = document.querySelector(".contenedorLecturas");
            const nuevoElemento = document.createElement("SECTION");
            nuevoElemento.classList.add("nuevoElemento");
            nuevoElemento.id = "agregado"+i;
            contenedorLecturas.appendChild(nuevoElemento);

            //OBTIENE EL CONTENEDOR - CREA UN SECTION - ASIGNA UNA CLASE - AGREGA AL DOCUMENTO
            const contenedorDiv = document.querySelector("#agregado"+i);
            const nuevoDiv = document.createElement("DIV");
            nuevoDiv.classList.add("nuevoElementoDiv");
            nuevoDiv.id = "agregadoDiv"+i
            contenedorDiv.appendChild(nuevoDiv);

            //OBTIENE EL CONTENEDOR - CREA UN SECTION - ASIGNA UNA CLASE - AGREGA AL DOCUMENTO
            const parrafoDiv = document.querySelector("#agregadoDiv"+i);
            const identificadorFirebase = document.createElement("h3");
            const fechaParrafo = document.createElement("P");
            const humedadParrafo = document.createElement("P");
            const sensTermC = document.createElement("P");
            const sensTermF = document.createElement("P");
            const temperaturaC = document.createElement("P");
            const temperaturaF = document.createElement("P");

            //SE CREA UN PARRAFO PARA CADA UNO DE LOS ELEMENTOS CONTENIDOS
            identificadorFirebase.textContent= obtenerArregloConLecturas[i][0];
            
            fechaParrafo.textContent = `
                Fecha de registro: ${obtenerArregloConLecturas[i][1].Fecha} 
            `;
            humedadParrafo.textContent = `
            Humedad: ${obtenerArregloConLecturas[i][1].Humedad} 
            `;
            sensTermC.textContent = `
            Sensacion termica en Centígrados: ${obtenerArregloConLecturas[i][1].SensacionTermicaC}
            `;
            sensTermF.textContent = `
            Sensacion termica en Fahrenheit: ${obtenerArregloConLecturas[i][1].SensacionTermicaF}
            `;
            temperaturaC.textContent = `
            Temperatura en centigrados: ${obtenerArregloConLecturas[i][1].TemperaturaC}
            `;
            temperaturaF.textContent = `
            Temperatura en Fahrenheit: ${obtenerArregloConLecturas[i][1].TemperaturaF}
            `;
            //SE AGREGAN AL DOCUMENTO
            parrafoDiv.appendChild(identificadorFirebase);
            parrafoDiv.appendChild(fechaParrafo);
            parrafoDiv.appendChild(humedadParrafo);
            parrafoDiv.appendChild(sensTermC);
            parrafoDiv.appendChild(sensTermF);
            parrafoDiv.appendChild(temperaturaC);
            parrafoDiv.appendChild(temperaturaF);
        }
        /*
        O P E R A C I O N E S D E P R U E B A  -> Funcionaron y se les agradece
        //const textoContenido = Object.entries(snapshot.val());
        //console.log(textoContenido[0][1].Fecha);
        //gridAppend.textContent = textoContenido[0][1].Fecha + " " + textoContenido[0][1].Humedad;
        */
        return Object.entries(snapshot.val());
        
    }
    else{
        console.log("Nel");
    }
}).catch((error) => {
    console.log(error);
})

