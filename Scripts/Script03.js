// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getDatabase, ref, set,remove, child, onValue, get, onChildAdded, onChildChanged, onChildRemoved} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

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

let guardarID = "";
const inID = document.querySelector("#inID");
const inFecha = document.querySelector("#inFecha");
const inHumedad = document.querySelector("#inHumedad");
const inSTC = document.querySelector("#inSTC");
const inSTF = document.querySelector("#inSTF");
const inTemperaturaC = document.querySelector("#inTemperaturaC");
const inTemperaturaF = document.querySelector("#inTemperaturaF");
const inBorrar = document.querySelector("#inBorrar");
const formularioEditar = document.querySelector("#formularioEditar");

let datos = {
    Fecha: "",
    Humedad: null,
    SensacionTermicaC: null,
    SensacionTermicaF: null,
    TemperaturaC:null,
    TemperaturaF:null
}

inID.disabled = true;
//RECUPERACION

const retrieved = get(child(dbRef, `esp32/JCS_Carlos/PRUEBADHT11_4/`)).then((snapshot) => {
    if(snapshot.exists()){
        const lecturas = Object.entries(snapshot.val());
        //console.log(lecturas[0][0]);

        const seleccionarDiv = document.querySelector("#lecturasDisplay");
        for(let i=0; i<lecturas.length; i++){
            //console.log(lecturas[i][0]);
            const nuevoP = document.createElement("P");
            nuevoP.classList.add("parrafoAgregado");
            nuevoP.textContent = lecturas[i][0];
            seleccionarDiv.appendChild(nuevoP);
        }

        const seleccionarParrafo = document.querySelectorAll(".parrafoAgregado");
        
        for(let i =0; i<seleccionarParrafo.length; i++){
            seleccionarParrafo[i].addEventListener("click", () => {
            inID.value = seleccionarParrafo[i].textContent;
            inFecha.value = lecturas[i][1].Fecha;
            inHumedad.value = lecturas[i][1].Humedad;
            inSTC.value = lecturas[i][1].SensacionTermicaC;
            inSTF.value = lecturas[i][1].SensacionTermicaF;
            inTemperaturaC.value = lecturas[i][1].TemperaturaC;
            inTemperaturaF.value = lecturas[i][1].TemperaturaF;
            console.log(lecturas[i][1].TemperaturaC);
        })};
        
        return snapshot.val();
    }
    else{
        
    }
}).catch((error) =>{
    console.log(error);
});
console.log(retrieved);

inBorrar.addEventListener("click", () => {
    if(inID.value != ""){
        let r = window.confirm("¿Seguro que desea eliminar?");
        if(r){
            remove(ref(db, 'esp32/JCS_Carlos/PRUEBADHT11_4/'+inID.value))
            location.reload();
            if(Notification.permission == "granted"){
                new Notification("Sistema IoT", {
                    icon: "/Imagenes/Agregado.png",
                    body: `Eliminado registro ${inID.value}`
                });
            }

        }
        else{
            
        }
    }
});

formularioEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    let r = window.confirm("¿Desea modificar este registro?");
    if(r){
        if(inFecha.value != ""){
            datos["Fecha"] = inFecha.value;
            datos["Humedad"] = inHumedad.value;
            datos["SensacionTermicaC"] = inSTC.value;
            datos["SensacionTermicaF"] = inSTF.value;
            datos["TemperaturaC"] = inTemperaturaC.value;
            datos["TemperaturaF"] = inTemperaturaF.value;
            guardarDatos(datos);
        }
        else{
            crearDivMensaje("noEnviado");
        }
    }
    else{

    }
    
});


function reiniciarCampos(){
    inFecha.value = "";
    inHumedad.value = null;
    inSTC.value = null;
    inSTF.value = null;
    inTemperaturaC.value = null;
    inTemperaturaF.value = null;
}

function guardarDatos(datos){
    set(ref(db, 'esp32/JCS_Carlos/PRUEBADHT11_4/' +inID.value),{
        Fecha: datos["Fecha"],
        Humedad: parseFloat(datos["Humedad"]),
        SensacionTermicaC: parseFloat(datos["SensacionTermicaC"]),
        SensacionTermicaF: parseFloat(datos["SensacionTermicaF"]),
        TemperaturaC: parseFloat(datos["TemperaturaC"]),
        TemperaturaF: parseFloat(datos["TemperaturaF"])
    });

    if(Notification.permission == "granted"){
        new Notification("Sistema IoT", {
            icon: "/Imagenes/Agregado.png",
            body: `Modificado registro ${inID.value}`
        });
    }
    crearDivMensaje("enviado");
    reiniciarCampos();
    setTimeout(() => {
        location.reload();
    }, 2000);
}


    
function crearDivMensaje(estado){
    const remover = document.querySelectorAll(".remover");

    remover.forEach((elemento) => {
        elemento.remove();
    });

    const contenedorForm = document.querySelector(".formularioInputs");
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








/*
setInterval(() => {
    while(seleccionarParrafo){
        seleccionarParrafo.addEventListener("click", () => {
        console.log("funciono?");
        });
    }
}, 2000);   */ 
//REASIGNACION

