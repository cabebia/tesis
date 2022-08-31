// Montamos el canvas con alta resolución
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");

// Classe carta
class carta {
	// las variables static pertenece a la clase
	static x = 50;
	static y = 50;

	constructor(numero, palo, valor) {
		this.img = new Image();
        this.numero = numero;
        this.palo = palo;
		this.valor = valor;
	}
}

class jugador {
    constructor(equipo,id){
        this.id = id;
        this.equipo = equipo;
    }

    getCartas(cartas){
        this.cartas = cartas;
    }
}

const mazo = [
    {
        numero:4,
        palo:'O',
        valor:1
    },
    {
        numero:4,
        palo:'E',
        valor:1
    },
    {
        numero:4,
        palo:'C',
        valor:1
    },
    {
        numero:4,
        palo:'B',
        valor:1
    },
    {
        numero:5,
        palo:'O',
        valor:2
    },
    {
        numero:5,
        palo:'E',
        valor:2
    },
    {
        numero:5,
        palo:'C',
        valor:2
    },
    {
        numero:5,
        palo:'B',
        valor:2
    },
    {
        numero:6,
        palo:'O',
        valor:3
    },
    {
        numero:6,
        palo:'E',
        valor:3
    },
    {
        numero:6,
        palo:'C',
        valor:3
    },
    {
        numero:6,
        palo:'B',
        valor:3
    },
    {
        numero:7,
        palo:'O',
        valor:11
    },
    {
        numero:7,
        palo:'E',
        valor:12
    },
    {
        numero:7,
        palo:'C',
        valor:4
    },
    {
        numero:7,
        palo:'B',
        valor:4
    },
    {
        numero:10,
        palo:'O',
        valor:5
    },
    {
        numero:10,
        palo:'C',
        valor:5
    },
    {
        numero:10,
        palo:'E',
        valor:5
    },
    {
        numero:10,
        palo:'B',
        valor:5
    },
    {
        numero:11,
        palo:'O',
        valor:6
    },
    {
        numero:11,
        palo:'E',
        valor:6
    },
    {
        numero:11,
        palo:'C',
        valor:6
    },
    {
        numero:11,
        palo:'B',
        valor:6
    },
    {
        numero:12,
        palo:'O',
        valor:7
    },
    {
        numero:12,
        palo:'E',
        valor:7
    },
    {
        numero:12,
        palo:'C',
        valor:7
    },
    {
        numero:12,
        palo:'B',
        valor:7
    },
    {
        numero:2,
        palo:'O',
        valor:9
    },
    {
        numero:2,
        palo:'E',
        valor:9
    },
    {
        numero:2,
        palo:'C',
        valor:9
    },
    {
        numero:2,
        palo:'B',
        valor:9
    },
    {
        numero:3,
        palo:'O',
        valor:10
    },
    {
        numero:3,
        palo:'E',
        valor:10
    },
    {
        numero:3,
        palo:'C',
        valor:10
    },
    {
        numero:3,
        palo:'B',
        valor:10
    },
    {
        numero:1,
        palo:'O',
        valor:8
    },
    {
        numero:1,
        palo:'E',
        valor:14
    },
    {
        numero:1,
        palo:'C',
        valor:8
    },
    {
        numero:1,
        palo:'B',
        valor:13
    }
]

// Variables que vamos a usar
let cartas = [];
let jugadores = [];
let id_cartas_aleatorias = [];
let cartas_jugadores = [];
let cant_jugadores = 2;
let cant_cartas = cant_jugadores * 3;
cont_jugadores = 0;

// CARGAMOS JUGADORES
jugadores.push(new jugador(1,1));
jugadores.push(new jugador(2,2));

// GENERAMOS EL MAZO
cartas = generar_mazo();

// GENERAMOS LA CANTIDAD DE CARTAS A TRAER DEL MAZO
id_cartas_aleatorias = generateIds(6);

// CARGAMO LAS CARTAS DE LOS JUGADORES
cartas_jugadores = cargar_cartas();

// SETEAMOS LAS CARTAS A CADA JUGADOR
cartas_jugador1 = cartas_jugadores.slice(0,3);
cartas_jugador2 = cartas_jugadores.slice(3,6);
jugadores[0].getCartas(cartas_jugador1);
jugadores[1].getCartas(cartas_jugador2);

// DIBUJAMOS LAS CARTAS

for(let jugador of jugadores){
    for(let cartas_j of jugador.cartas){
        dibujarCarta(cartas_j);
    }
}


function generar_mazo(){
    let cartas = [];
    for (let cartita of mazo){
        cartas.push(new carta(cartita.numero,cartita.palo,cartita.valor));
        /* console.log(cartita.numero + cartita.palo + " -> " + cartita.valor); */
    }
    cartas = cartas.sort(function() { return Math.random() - 0.5} );
    return cartas;
}


function cargar_cartas(){
    let cartas_jugadores = [];
    for(let i=0;i<cant_cartas;i++){
        cartas_jugadores.push(cartas[id_cartas_aleatorias[i]])
    }
    return cartas_jugadores;
}


function dibujarCarta(CJ) {
	// Tenemos que primero cargar la carta y luego añadir el src
	// Si no las cartas no cargan en la pagina
	CJ.img.onload = () => {
		ctx.drawImage(CJ.img, carta.x, carta.y, 239, 335);
		carta.x += 300;
        if(carta.x > 2400){
            carta.x = 50;
            carta.y = carta.y + 400;
        }
	};
    
	// Para cargar la imagen correcta concatenamos el numero y el palo, que coincida con el nombre del fichero
	CJ.img.src = "img/cartas/" + CJ.palo + CJ.numero.toString() + ".png";
}

/* GENERAR NUMEROS ALEATORIOS ENTRE 0 Y MAX */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateIds(cantidad){
    let ids = [];
    for(let i = 0;i<cantidad;i++){
        let num = getRandomInt(40);
        if(ids.includes(num)){
            while(ids.includes(num)){
                num = getRandomInt(40);
            }
            ids.push(num);
        }else{
            ids.push(num);
        }

    }
    return ids;
}


/* 
for(let i = 32;i<40;i++){
    dibujarCarta(cartas[i]);
    console.log("Dibujando:" + cartas[i].palo + cartas[i].numero.toString());
}
*/
