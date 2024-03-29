const bars = document.querySelector("#bars");
const nav = document.querySelector("#nav");

bars.addEventListener("click", ()=>{
    if (nav.classList.contains("-translate-y-full")){
        nav.classList.remove("-translate-y-full");
    } else {
        nav.classList.add("-translate-y-full");
    }
})

nav.addEventListener("click", ()=>{
    if (nav.classList.contains("-translate-y-full")){
        nav.classList.remove("-translate-y-full");
    } else {
        nav.classList.add("-translate-y-full");
    }
})


// ! ECUACIONES

const rsInput = document.querySelector("#rs");
const tpInput = document.querySelector("#tp");

const fInput = document.querySelector("#f");
const mfInput = document.querySelector("#mf");
const esfInput = document.querySelector("#esf");
const tdesInput = document.querySelector("#tdes");
const pInput = document.querySelector("#p");
const cpmInput = document.querySelector("#cpm");
const cdInput = document.querySelector("#cd");

const textoEsfInput = document.querySelector("#textoEsf");
const textoTdesInput = document.querySelector("#textoTdes");

const porcentaje1 = document.querySelectorAll(".por1");
const porcentaje2 = document.querySelectorAll(".por2");
const porcentaje3 = document.querySelectorAll(".por3");
const valor1 = document.querySelectorAll(".val1");
const valor2 = document.querySelectorAll(".val2");
const valor3 = document.querySelectorAll(".val3");
const porcentajeTotal1 = document.querySelector(".porTotal1");
const porcentajeTotal2 = document.querySelector(".porTotal2");
const porcentajeTotal3 = document.querySelector(".porTotal3");
const valorTotal1 = document.querySelector(".valTotal1");
const valorTotal2 = document.querySelector(".valTotal2");
const valorTotal3 = document.querySelector(".valTotal3");
const testeoPorcentaje1 = document.querySelector(".tesPor1");
const testeoPorcentaje2 = document.querySelector(".tesPor2");
const testeoPorcentaje3 = document.querySelector(".tesPor3");
const testeoValor1 = document.querySelector(".tesVal1");
const testeoValor2 = document.querySelector(".tesVal2");
const testeoValor3 = document.querySelector(".tesVal3");


rsInput.addEventListener("keyup", () => {
    calcular()
});

tpInput.addEventListener("change", () => {
    //const opcionSeleccionada = miSelect.value;
    calcular();
});

const valores = [2, 8, 32, 128, 512];
const fasesEsf = [ 
    // Organico
    [ 
        [6, 16, 68, 26, 42, 16], 
        [6, 16, 65, 25, 40, 19], 
        [6, 16, 62, 24, 38, 22], 
        [6, 16, 59, 23, 36, 25], 
        [0, 0, 0, 0, 0, 0] 
    ], 
    
    // Semilibre
    [ 
        [7, 17, 64,27,37,19], 
        [7, 17, 61,26,35,22], 
        [7, 17, 58,25,33,25], 
        [7, 17, 55,24,31,28], 
        [7, 17, 52,23,29,31] 
    ], 
    
    // F. Restringido
    [ 
        [8, 18, 60,28,32,22], 
        [8, 18, 57,27,30,25], 
        [8, 18, 54,26,28,28], 
        [8, 18, 51,25,26,31], 
        [8, 18, 48,24,24,34] 
    ] ]; 

const fasesTdes = [ 

    // Organico
    [ 
        [10, 19, 63, 0, 0, 18], 
        [11, 19, 59, 0, 0, 22], 
        [12, 19, 55, 0, 0, 26], 
        [13, 19, 51, 0, 0, 30], 
        [0, 0, 0, 0, 0, 0]
    ], 
    
    // Semilibre
    [ 
        [16, 24, 56, 0, 0, 20], 
        [18, 25, 52, 0, 0, 23], 
        [20, 26, 48,0,0,26], 
        [22, 27, 44, 0, 0, 29], 
        [24, 28, 40, 0, 0, 32] 
    ], 

    // F. Restringido
    [ 
        [24, 30, 48, 0, 0, 22], 
        [28, 32, 44, 0, 0, 24], 
        [32, 34, 40, 0, 0, 26], 
        [36, 36, 36, 0, 0, 28], 
        [40, 38, 32, 0, 0, 30] 
    ] ]; 

function calcular() {
    let rs = rsInput.value;
    let tp = parseInt(tpInput.value);

    if (rs == "") {
        rs = 0
    } else {
        rs = parseFloat(rs);
    }

    let textoEsf = "";
    let textoTdes = "";

    let f = 280.0 * rs;
    let mf = parseFloat((f/1000).toFixed(2));
    let esf;
    let tdes;
    
   if (tp == 0){
        textoEsf = "2.4 (MF) ^ 1.05";
        esf = parseFloat((2.4 * Math.pow(mf, 1.05)).toFixed(2));

        textoTdes = "2.5 (ESF) ^ 0.38";
        tdes = parseFloat((2.5 * Math.pow(esf, 0.38)).toFixed(2));

    } else if (tp == 1) {
        textoEsf = "3.0 (MF) ^ 1.12";
        esf = parseFloat((3.0 * Math.pow(mf, 1.12)).toFixed(2));

        textoTdes = "2.5 (ESF) ^ 0.35";
        tdes = parseFloat((2.5 * Math.pow(esf, 0.35)).toFixed(2));
    }

    else if (tp == 2) {
        textoEsf = "3.6 (MF) ^ 1.20";
        esf = parseFloat((3.6 * Math.pow(mf, 1.20)).toFixed(2));

        textoTdes = "2.5 (ESF) ^ 0.32";
        tdes = parseFloat((2.5 * Math.pow(esf, 0.32)).toFixed(2));
    }

    let p = f / esf;
    let cpm = esf / tdes;
    let cd = (1025/2) * esf; //salario minimo


    let aproximacion = redondearAlMasCercano(mf, valores)
    let totalEsf = 0;
    let totalTdes = 0;
    let resultadoEsf = [0, 0, 0, 0, 0, 0];
    let resultadoDtes = [0, 0, 0, 0, 0, 0];
    let resultadoCd = [0, 0, 0, 0, 0, 0];

    if (aproximacion == valores[0]) {

        //ESF

        for(let i=0; i<fasesEsf[tp][0].length; i++) {
            if (i !== 3 && i !== 4) {
                totalEsf += fasesEsf[tp][0][i];
            }
            porcentaje1[i].innerHTML = fasesEsf[tp][0][i];
            porcentaje3[i].innerHTML = fasesEsf[tp][0][i];
        }
        for(let i=0; i<fasesEsf[tp][0].length; i++) {
            resultadoEsf[i] = (((fasesEsf[tp][0][i] / 100) * esf) / (totalEsf/100)).toFixed(2);
            valor1[i].innerHTML = resultadoEsf[i];
        }

        testeoPorcentaje1.innerHTML = fasesEsf[tp][0][0]
        testeoValor1.innerHTML = resultadoEsf[0];

        // TDES


        for(let i=0; i<fasesTdes[tp][0].length; i++) {
            totalTdes += fasesTdes[tp][0][i];
            porcentaje2[i].innerHTML = fasesTdes[tp][0][i];
        }
        for(let i=0; i<fasesTdes[tp][0].length; i++) {
            resultadoDtes[i] = (((fasesTdes[tp][0][i] / 100) * tdes) / (totalTdes/100)).toFixed(2);
            valor2[i].innerHTML = resultadoDtes[i];
        }

        testeoPorcentaje2.innerHTML = fasesTdes[tp][0][0]
        testeoValor2.innerHTML = resultadoDtes[0];

        // CD

        for(let i=0; i<fasesEsf[tp][0].length; i++) {
            resultadoCd[i] = (((fasesEsf[tp][0][i] / 100) * cd) / (totalEsf/100)).toFixed(2);
            valor3[i].innerHTML = resultadoCd[i];
        }

        testeoPorcentaje3.innerHTML = fasesEsf[tp][0][0]
        testeoValor3.innerHTML = resultadoCd[0];

    } 
    else if (aproximacion == valores[1]) {

        // ESF

        for(let i=0; i<fasesEsf[tp][1].length; i++) {
            if (i !== 3 && i !== 4) {
                totalEsf += fasesEsf[tp][1][i];
            }
            porcentaje1[i].innerHTML = fasesEsf[tp][1][i];
            porcentaje3[i].innerHTML = fasesEsf[tp][1][i];
        }

        for(let i=0; i<fasesEsf[tp][1].length; i++) {
            resultadoEsf[i] = (((fasesEsf[tp][1][i] / 100) * esf) / (totalEsf/100)).toFixed(2);
            valor1[i].innerHTML = resultadoEsf[i];
        }

        testeoPorcentaje1.innerHTML = fasesEsf[tp][1][0]
        testeoValor1.innerHTML = resultadoEsf[0];

        // TDES

        for(let i=0; i<fasesTdes[tp][1].length; i++) {
            totalTdes += fasesTdes[tp][1][i];
            porcentaje2[i].innerHTML = fasesTdes[tp][1][i];
        }

        for(let i=0; i<fasesTdes[tp][1].length; i++) {
            resultadoDtes[i] = (((fasesTdes[tp][1][i] / 100) * tdes) / (totalTdes/100)).toFixed(2);
            valor2[i].innerHTML = resultadoDtes[i];
        }

        testeoPorcentaje2.innerHTML = fasesTdes[tp][1][0]
        testeoValor2.innerHTML = resultadoDtes[0];

        // CD


        for(let i=0; i<fasesEsf[tp][1].length; i++) {
            resultadoCd[i] = (((fasesEsf[tp][1][i] / 100) * cd) / (totalEsf/100)).toFixed(2);
            valor3[i].innerHTML = resultadoCd[i];
        }

        testeoPorcentaje3.innerHTML = fasesEsf[tp][1][0]
        testeoValor3.innerHTML = resultadoCd[0];
    }

    else if (aproximacion == valores[2]) {

        // ESF
        for(let i=0; i<fasesEsf[tp][2].length; i++) {
            if (i !== 3 && i !== 4) {
                totalEsf += fasesEsf[tp][2][i];
            }
        }
        for(let i=0; i<fasesEsf[tp][2].length; i++) {
            resultadoEsf[i] = (((fasesEsf[tp][2][i] / 100) * esf) / (totalEsf/100)).toFixed(2);
            valor1[i].innerHTML = resultadoEsf[i];
        }

        testeoPorcentaje1.innerHTML = fasesEsf[tp][2][0]
        testeoValor1.innerHTML = resultadoEsf[0];

        // TDES


        for(let i=0; i<fasesTdes[tp][2].length; i++) {
            totalTdes += fasesTdes[tp][2][i];
        }
        for(let i=0; i<fasesTdes[tp][2].length; i++) {
            resultadoDtes[i] = (((fasesTdes[tp][2][i] / 100) * tdes) / (totalTdes/100)).toFixed(2);
            valor2[i].innerHTML = resultadoDtes[i];
        }

        testeoPorcentaje2.innerHTML = fasesTdes[tp][2][0]
        testeoValor2.innerHTML = resultadoDtes[0];

        // CD

        for(let i=0; i<fasesEsf[tp][2].length; i++) {
            resultadoCd[i] = (((fasesEsf[tp][2][i] / 100) * cd) / (totalEsf/100)).toFixed(2);
            valor3[i].innerHTML = resultadoCd[i];
        }

        testeoPorcentaje3.innerHTML = fasesEsf[tp][2][0]
        testeoValor3.innerHTML = resultadoCd[0];
    }

    else if (aproximacion == valores[3]) {

        // ESF 
        for(let i=0; i<fasesEsf[tp][3].length; i++) {
            if (i !== 3 && i !== 4) {
                totalEsf += fasesEsf[tp][3][i];
            }
        }
        for(let i=0; i<fasesEsf[tp][3].length; i++) {
            resultadoEsf[i] = (((fasesEsf[tp][3][i] / 100) * esf) / (totalEsf/100)).toFixed(2);
            valor1[i].innerHTML = resultadoEsf[i];
        }

        testeoPorcentaje1.innerHTML = fasesEsf[tp][3][0]
        testeoValor1.innerHTML = resultadoEsf[0];

        // TDES

        for(let i=0; i<fasesTdes[tp][3].length; i++) {
            totalTdes += fasesTdes[tp][3][i];
        }
        for(let i=0; i<fasesTdes[tp][3].length; i++) {
            resultadoDtes[i] = (((fasesTdes[tp][3][i] / 100) * tdes) / (totalTdes/100)).toFixed(2);
            valor2[i].innerHTML = resultadoDtes[i];
        }

        testeoPorcentaje2.innerHTML = fasesTdes[tp][3][0]
        testeoValor2.innerHTML = resultadoDtes[0];

        // CD

        for(let i=0; i<fasesEsf[tp][3].length; i++) {
            resultadoCd[i] = (((fasesEsf[tp][3][i] / 100) * cd) / (totalEsf/100)).toFixed(2);
            valor3[i].innerHTML = resultadoCd[i];
        }

        testeoPorcentaje3.innerHTML = fasesEsf[tp][3][0]
        testeoValor3.innerHTML = resultadoCd[0];
    }

    else if (aproximacion == valores[4]) {

        // ESF

        for(let i=0; i<fasesEsf[tp][4].length; i++) {
            if (i !== 3 && i !== 4) {
                totalEsf += fasesEsf[tp][4][i];
            }
        }
        for(let i=0; i<fasesEsf[tp][4].length; i++) {
            resultadoEsf[i] = (((fasesEsf[tp][4][i] / 100) * esf) / (totalEsf/100)).toFixed(2);
            valor1[i].innerHTML = resultadoEsf[i];
        }

        testeoPorcentaje1.innerHTML = fasesEsf[tp][4][0]
        testeoValor1.innerHTML = resultadoEsf[0];

        // TDES

        for(let i=0; i<fasesTdes[tp][4].length; i++) {
            totalTdes += fasesTdes[tp][4][i];
        }
        for(let i=0; i<fasesTdes[tp][4].length; i++) {
            resultadoDtes[i] = (((fasesTdes[tp][4][i] / 100) * tdes) / (totalTdes/100)).toFixed(2);
            valor2[i].innerHTML = resultadoDtes[i];
        }

        testeoPorcentaje2.innerHTML = fasesTdes[tp][4][0]
        testeoValor2.innerHTML = resultadoDtes[0];

        // CD

        for(let i=0; i<fasesEsf[tp][4].length; i++) {
            resultadoCd[i] = (((fasesEsf[tp][4][i] / 100) * cd) / (totalEsf/100)).toFixed(2);
            valor3[i].innerHTML = resultadoCd[i];
        }

        testeoPorcentaje3.innerHTML = fasesEsf[tp][4][0]
        testeoValor3.innerHTML = resultadoCd[0];
    }


    // ! Llenar

    fInput.innerHTML = f;
    mfInput.innerHTML = mf.toFixed(2);
    esfInput.innerHTML = esf.toFixed(2);
    tdesInput.innerHTML = tdes.toFixed(2);
    pInput.innerHTML = p.toFixed(2);
    cpmInput.innerHTML = cpm.toFixed(2);
    cdInput.innerHTML = formatearNumeroConComas(cd.toFixed(2));
    textoEsfInput.innerHTML = textoEsf;
    textoTdesInput.innerHTML = textoTdes;
    porcentajeTotal1.innerHTML = totalEsf;
    porcentajeTotal2.innerHTML = totalTdes;
    porcentajeTotal3.innerHTML = totalEsf;
    valorTotal1.innerHTML = esf;
    valorTotal2.innerHTML = tdes;
    valorTotal3.innerHTML = formatearNumeroConComas(cd.toFixed(2));

}

function formatearNumeroConComas(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function redondearAlMasCercano(numero, valores) {
    let distanciaMinima = Infinity;
    let valorMasCercano = null;

    valores.forEach((valor) => {
        let distancia = Math.abs(numero - valor);
        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            valorMasCercano = valor;
        }
    });

    return valorMasCercano;
}