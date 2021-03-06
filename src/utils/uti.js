
// Import de todo:
// 	import * from "./utils/session"



/*
	Almacena u obtiene los datos de sesión en el siguiente formato:
		{
			username: "",
			userId: "",
			token: "",
			userType: 0
		}
	
	Import:
		import { session } from "./utils/session"
	
	Ejemplos:
		session.get(); 		// Devuelve el objeto con datos o NULL si NO estás logeado
		session.set({		// Metes los datos para guardar en localStorage
			username: "Icaruk",
			userId: "56785675",
			token: "8765867586745",
			userType: 0
		});	
	
*/

export const session = {
	
	get: () => {
		return JSON.parse( localStorage.getItem("sessionData") );
	},
	
	set: (data) => {
		localStorage.setItem ("sessionData", JSON.stringify(data) );
	},
	
	del: () => {
		localStorage.removeItem("sessionData");
	},
	
};



/*
	Forma una URL apuntando a la API.
	
	Params:
		route: STRING - Ruta a la que se quiere llamar.
		incudeToken: BOOL (opc) - Si es true se añadirá "token={token}" al final del string de route.
		
	Import:
		import { getUrl } from "./utils/uti"
	
	Ejemplos:
		getUrl(); 				// Devuelve http://localhost:3000	
		getUrl("/user/login"); 	// Devuelve http://localhost:3000/user/login	
		getUrl("/user/asd?", true); 	// Devuelve http://localhost:3000/asd?token=123h1u8o93uhe
	
*/

export const getUrl = (route = "", includeToken = false) => {
	
	let sessionData = session.get();
	let token = "";
	
	if (includeToken) {
		if (sessionData) {
			token = "token=" + sessionData.token;
		};
	};
	
	return `http://localhost:3000${route}${token}`
};



/*
	Muestra un mensaje de error de forma temporal.
	
	Import:
		import { muestraError } from "./utils/uti"
	
	Ejemplos:
		muestraError("Usuario no encontrado");
		muestraError("Todo bien", 2, false);
	
	Requisitos:
		1. Tener los siguientes estados declarados:
			message: "",
			errorTime: 0,
			messageClassName: "error"
		2. Poner en el HTML esto:
			<p className={this.state.messageClassName}> {this.state.message} </p>
		.
	.
*/

export const muestraError = (message, timeout = 3, isError = true) => {
	
	// Pongo la clase
	let className = isError ? "error" : "success";
	this.setState({messageClassName: className});
	
	
	// Pongo el mensaje
	this.setState({message: message});
	
	
	// Ya estoy en loop
	if (this.state.errorTime > 0) {
		this.setState({errorTime: timeout});
		return; // y salgo
	};
	
	
	this.setState({errorTime: timeout}); // Entro por primera vez, pongo tiempo
	
	
	// Loop
	let loop = setInterval( ()=> {
		
		if (this.state.errorTime <= 0) {
			this.setState({message: ""});
			clearInterval(loop); // salgo del loop
		};
		
		
		this.setState( preState => ( {errorTime: preState.errorTime - 1}) );
		
	}, 1000);
	
};



/*
	Limita un número por arriba y por abajo.
	
	Return:
		number
		
	Import:
		import { listaCategorias } from "./utils/uti"
	Ejemplo: 	
		uti.minMax (15, 0, 10); // devuelve 10
	.
*/

export const minMax = (n, min, max) => {
	return Math.max (Math.min (n, max), min);
};



/*
	Lista de las categorías. 
	
	Import:
		import { listaCategorias } from "./utils/uti"
	.
*/

export const listaCategorias = {
	"aut": "Automóvil",
	"ali": "Alimentación",
	"bri": "Bricolaje",
	"cul": "Cultura",
	"dep": "Deporte",
	"electrod": "Electrodomésticos",
	"electron": "Electrónica",
	"hog": "Hogar",
	"jug": "Juguetes",
	"vid": "Videojuegos",
	"mod": "Moda",
	"ofi": "Oficina",
	"par": "Parafarmacia",
	"cos": "Cosmética",
	"otr": "Otros"
}



/*
	Devuelve un número en función de lo que tenga el usuario:
		1: Sólo tarjeta de crédito
		2: Sólo paypal
		3: Ambos
	
	Import:
		import { userBillingOptions } from "./utils/uti"
	.
*/

export const userBillingOptions = (userCard,userPaypal) => {

	let userBilling = 0;

	if (userCard && !userPaypal) {
		//Comprobamos si el usuario disponde de tarjeta de crédito pero no de paypal.
		userBilling = 1;
	  }
	  if (!userCard && userPaypal) {
		//Comprobamos si el usuario disponde de paypal pero no de tarjeta de crédito.
		userBilling = 2;
	  }
	  if (userCard && userPaypal) {
		//Comprobamos si el usuario disponde de ambos sistemas de pago.
		userBilling = 3;
	  }

	  return userBilling;

}



/*
	Convierte un número de más de 3 dígitos en un string que separa las centenas con un punto.
	
	Import 
		import { numToStr } from "./utils/uti"
	
	Ejemplo:
		numToStr(1000);			// "1.000"
		numToStr(1000, ",");	// "1,000"
	.
*/

export const numToStr = (numero, separador = ".") => {
	
	// Existe?
	if (! numero) {
		return 0
	};
	
	
	// Convierto
	let strNum = numero.toString();
	
	
	// Pregunto
	if (strNum.length <= 3) {
		return strNum;
	};
	
	
	// Itero
	let arrNumeros = [];
	let digitos = 0;
	
	for (let _i = strNum.length - 1; _i >= 0; _i --) {
		
		arrNumeros.unshift( strNum.charAt(_i) );
		digitos ++;
		
		if (digitos === 3) {
			if (_i === 0) {break};
			arrNumeros.unshift( separador );
			digitos = 0;
		};
		
	};
	
	
	return arrNumeros.join("");
	
};