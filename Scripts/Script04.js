const contexto = document.querySelector("#graficoBarras");


new Chart(contexto, {
    type: 'bar',
    data:{
        labels:['uno','dos','tres','cuatro', 'cinco'],
        datasets: [
            {label: 'ahh',
            data:[12,19,3,5,2,3],
            borderWidth: 1
            },
        ]
    }
    
})
/*
const imprimirTablas = () => {
    renderModelsChart();
}



const renderModelsChart = ()=>{

    const datos = {
        labels: ['uno','dos','tres'],
        datasets: [{
            datos: [10, 20, 30]
        }] //ARREGLO DE DATOS, PUEDE TENER MUCHOS
    }
    new Chart('graficoBarras', {type: 'bar', datos})
}

imprimirTablas();
*/
