// tesis_germanñ! 
// URL QUE LUEGO SE VA A CAMBIAR PARA LA DEL SERVIDOR
url_json = "https://mucilaginous-web.000webhostapp.com/tesis_german/php/dar_cartas.php";

// CANVAS PARA LAS CARTAS
// Montamos el canvas con alta resolución
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");

// CLASE CARTAS
// Classe carta
class carta {
	// las variables static pertenece a la clase
	static x = 50;
	static y = 50;

	constructor() {
		this.img = new Image();
	}
}

let cartitas = traer_cartas();


function traer_cartas(){ // SE EJECUTA EN onload, por ahora
    
/*     fetch(url_json, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    })
        .then(res => res.json() )
        .then(cartas => {
            console.log(cartas);
        })
        .catch((err) => console.log(err)); */
        fetch(url_json)
            .then(res => res.json() )
            .then(cartas => {
                for(let carta_ of cartas){
                    carta_jugador = new carta();
                    dibujarCarta(carta_jugador,carta_.palo,carta_.numero);
                }
                
            })
            .catch((err) => console.log(err));
        
}


/* FUNCION PARA DIBUJAR CARTAS */
function dibujarCarta(CJ,palo,numero) {
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
	CJ.img.src = "https://mucilaginous-web.000webhostapp.com/tesis_german/img/cartas/" + palo + numero.toString() + ".png";
}