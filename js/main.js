window.onload = (event) => {
    console.log('Pagina html cargada');

    class CincoDeOro {
        constructor() {
            this.numeros = Array.from({ length: 48 }, (_, i) => i + 1);
        }

        jugar5deoro() {
            let carton = [];
            let usarMismosNumeros = false; // Variable para determinar si usar los mismos números

            do {
                if (!usarMismosNumeros) {
                    carton = []; // Reinicia el cartón si no se van a usar los mismos números
                    for (let i = 1; i <= 5; i++) {
                        let numero = parseInt(prompt(`Ingresa el número ${i} (entre 1 y 48):`));
                        if (isNaN(numero) || numero < 1 || numero > 48) {
                            alert(`Número inválido: ${numero}. Por favor, ingresa un número entre 1 y 48.`);
                            i--; // Repite la iteración si el número es inválido
                            continue;
                        }
                        if (carton.includes(numero)) {
                            alert(`El número ${numero} ya ha sido ingresado. Por favor, ingresa un número diferente.`);
                            i--; // Repite la iteración si el número ya está en el cartón
                            continue;
                        }
                        carton.push(numero);
                    }
                    alert("Números ingresados correctamente: " + carton.join(", "));
                }

                let { ganadores, bolillaExtra } = this.generarNumerosGanadores();
                let aciertos = this.contarAciertos(carton, ganadores);
                let premio = this.determinarPremio(aciertos, bolillaExtra, carton);

                console.log("Cartón: " + carton.join(", "));
                console.log("Números ganadores: " + ganadores.join(", ") + "  Bolilla extra:  " + bolillaExtra);
                console.log("Aciertos: " + aciertos);
                console.log("Premio: " + premio);

                alert(
                    "Su apuesta: " + carton.join(", ") + "\n" +
                    "Números ganadores: " + ganadores.join(", ") + "\n" +
                    "Bolilla extra: " + bolillaExtra + "\n" +
                    "Aciertos: " + aciertos + "\n" +
                    "Premio: " + premio
                );

                this.segundoSorteo(carton);

                // Preguntar si desea realizar otra jugada
                if (confirm("¿Desea jugar de nuevo?")) {
                    if (confirm("¿Desea usar los mismos números de cartón?")) {
                        usarMismosNumeros = true; // Usar los mismos números
                    } else {
                        usarMismosNumeros = false; // Ingresar nuevos números
                    }
                } else {
                    alert("Gracias por su jugada.");
                    break; // Termina el bucle si no desea jugar de nuevo y sale del programa
                }
            } while (true);
        }
        //genera sorteo revancha
        segundoSorteo(carton) {
            let numerosBarajados = [...this.numeros].sort(() => Math.random() - 0.5);
            let ganadoresNuevos = numerosBarajados.slice(0, 5);
            let aciertosNuevos = this.contarAciertos(carton, ganadoresNuevos);
            let premioNuevos = aciertosNuevos === 5 ? "5 de oro revancha" : "Sin premio";

            console.log("Nuevos números ganadores: " + ganadoresNuevos.join(", "));
            console.log("Aciertos en el segundo sorteo: " + aciertosNuevos);
            console.log("Premio: " + premioNuevos);

            alert(
                "Su apuesta: " + carton.join(", ") + "\n" +
                "Resultado sorteo revancha: " + ganadoresNuevos.join(", ") + "\n" +
                "Aciertos en sorteo revancha: " + aciertosNuevos + "\n" +
                "Premio: " + premioNuevos
            );
        }
        //genera numeros ganadores
        generarNumerosGanadores() {
            let numerosBarajados = [...this.numeros].sort(() => Math.random() - 0.5);
            let ganadores = numerosBarajados.slice(0, 5);
            let bolillaExtra = numerosBarajados[5];
            return { ganadores, bolillaExtra };
        }

        contarAciertos(carton, ganadores) {
            return carton.filter(numero => ganadores.includes(numero)).length;
        }

        determinarPremio(aciertos, bolillaExtra, carton) {
            let premio;
            if (aciertos === 5) {
                premio = "Pozo de oro 5 aciertos";
            } else if (aciertos === 4) {
                if (carton.includes(bolillaExtra)) {
                    premio = "Pozo de plata 4 aciertos + bolilla Extra";
                } else {
                    premio = "$8000";
                }
            } else if (aciertos === 3) {
                if (carton.includes(bolillaExtra)) {
                    premio = "$1600 3 aciertos + bolilla extra";
                } else {
                    premio = "$400";
                }
            } else if (aciertos === 2) {
                if (carton.includes(bolillaExtra)) {
                    premio = "$160 2 aciertos + bolilla extra";
                } else {
                    premio = "$60 dos aciertos";
                }
            } else {
                premio = "Sin premio";
            }
            return premio;
        }
        
    }

    function main() {
        const juego = new CincoDeOro();
        juego.jugar5deoro();
    }

    main();
};
