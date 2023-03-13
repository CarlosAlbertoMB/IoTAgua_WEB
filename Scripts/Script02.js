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
//const database = getDatabase(app);
const db = getDatabase()
//const dbRef = ref(getDatabase());

//Contenedor
const datos = {
    Fecha: "",
    Humedad: null,
    SensacionTermicaC: null,
    SensacionTermicaF: null,
    TemperaturaC: null,
    TemperaturaF: null
}
//Conectar al DOM
const inFecha = document.querySelector("#inFecha");
const inHumedad = document.querySelector("#inHumedad");
const inSTC = document.querySelector("#inSTC");
const inSTF = document.querySelector("#inSTF");
const inTemperaturaC = document.querySelector("#inTemperaturaC");
const inTemperaturaF = document.querySelector("#inTemperaturaF");
//const inEnviar = document.querySelector("#inEnviar"); No es necesario
const formulario = document.querySelector("#formularioAgregar");

//Recuperar el valor ingresado en el campo de texto
inFecha.addEventListener("input", (e) =>{
    datos["Fecha"] = e.target.value;
});

inHumedad.addEventListener("input", (e)=>{
    datos["Humedad"] = e.target.value;
});

inSTC.addEventListener("input", (e) => {
    datos["SensacionTermicaC"] = e.target.value;
})

inSTF.addEventListener("input", (e) => {
    datos["SensacionTermicaF"] = e.target.value;
});

inTemperaturaC.addEventListener("input", (e) => {
    datos["TemperaturaC"] = e.target.value;
});

inTemperaturaF.addEventListener("input", (e) => {
    datos["TemperaturaF"] = e.target.value;
});


formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    if(datos["Fecha"] == "" || datos["Humedad"] == null || datos["SensacionTermicaC"] == null || datos["SensacionTermicaF"] == null || datos["TemperaturaC"] == null || datos["TemperaturaF"] == null){
        console.log("Favor de llenar todos los campos");
        crearDivMensaje("noEnviado");
    }else{
        guardarDatos(datos["Fecha"],datos["Humedad"],datos["SensacionTermicaC"], datos["SensacionTermicaF"], datos["TemperaturaC"], datos["TemperaturaF"]);
    }
});


function generarID(){
    const date = new Date();
    //console.log(date.getFullYear());
    let randomVal = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}RMANUAL`;
    return randomVal;
}
function guardarDatos(inFecha, inHumedad, inSTC, inSTF, inTemperaturaC, inTemperaturaF){
    //IMPRESION DE PRUEBA
    console.log(inFecha +" "+ inHumedad +" "+ inSTC +" "+ inSTF +" "+ inTemperaturaC +" "+ inTemperaturaF);
    //GENERACION DEL ID
    let randomVal = generarID();
    
    set(ref(db, 'esp32/JCS_Carlos/PRUEBADHT11_4/' +randomVal),{
        Fecha: inFecha,
        Humedad: parseFloat(inHumedad),
        SensacionTermicaC: parseFloat(inSTC),
        SensacionTermicaF: parseFloat(inSTF),
        TemperaturaC: parseFloat(inTemperaturaC),
        TemperaturaF: parseFloat(inTemperaturaF)
    });
    
    if(Notification.permission == "granted"){
        new Notification("Sistema IoT", {
            icon: "/Imagenes/Agregado.png",
            body: `Añadido correctamente con id ${randomVal}`
        });
    }
    crearDivMensaje("enviado");
    reiniciarCampos();
}

function crearDivMensaje(estado){
    const remover = document.querySelectorAll(".remover");

    remover.forEach((elemento) => {
        elemento.remove();
    });

    const contenedorForm = document.querySelector(".contenedorAgregar");
    const mensajeAgregado = document.createElement("DIV");
    mensajeAgregado.classList.add("mensajeEnviado");
    contenedorForm.appendChild(mensajeAgregado);

    const mensajeEnviadoDiv = document.querySelector(".mensajeEnviado");
    const nuevoP = document.createElement("P");
    nuevoP.id = estado;
    nuevoP.classList.add("remover");
    mensajeEnviadoDiv.appendChild(nuevoP);


    if(estado == "enviado"){
        const enviadoP = document.querySelector("#enviado")
        enviadoP.textContent = "Se ha enviado correctamente";
    }
    else if(estado == "noEnviado"){
        const enviadoP = document.querySelector("#noEnviado")
        enviadoP.textContent = "No ha sido enviado, faltan campos por agregar"
    }
    else{
        console.log("No se como pasó eso");
    }
}

function reiniciarCampos(){
    inFecha.value = "";
    inHumedad.value = null;
    inSTC.value = null;
    inSTF.value = null;
    inTemperaturaC.value = null;
    inTemperaturaF.value = null;
}
