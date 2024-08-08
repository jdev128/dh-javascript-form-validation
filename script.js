// ------------ 1 MOCKUP ------------

/* autocomplete, novalidate */

// ------------ 2 STYLING ------------

/* Ordenamiento albetico en opciones, todos los campos obligatorios, 
edad > 18, expresion regular para email */

/* Normalizacion de estilos (padding / margin / box-sizing) */

// ------------ 3 VALIDACION ( CAMPOS DE TEXTO ) ------------

/* event.preventDefault */

// ------------ 4 VALIDACION ( EMAIL / EDAD / SELECT ) ------------

/* /regex/.test, element.pattern, element.checked */

let formularioRegistro;

function enviarFormulario(event) {
	event.preventDefault();
    if (validarFormulario()) {
        alert("Formulario enviado con éxito");
    }
}

function validarFormulario() {
    let formularioValido = true;
	const campos = formularioRegistro.querySelectorAll(
		"input:not([type='submit']), select"
	);
	for (campo of campos) {
		let campoValido = campo.checkValidity();
		let nombreCampo = campo.name;
		let contenedorError = document.getElementById("error-" + nombreCampo);
		if (contenedorError) {
			if (campoValido) {
				ocultarError(contenedorError);
			} else {
                formularioValido = false;
				let mensajeError = definirMensajeError(campo);
				mostrarError(contenedorError, mensajeError);
			}
		}
	}
    return formularioValido;
}

function definirMensajeError(campo) {
	if (campo.validity.valueMissing) {
		if (campo.name === "terminos-condiciones") {
			return "Debes aceptar estos términos para continuar";
		}
        if (campo.tagName === "SELECT") {
            return "Selecciona una de las opciones";
        }
		return "Ingresa un valor";
	}
	if (campo.validity.tooShort) {
		return `Ingresa un mínimo de ${campo.minLength} caracteres`;
	}
	if (campo.validity.tooLong) {
		return `Ingresa un máximo de ${campo.maxLength} caracteres`;
	}
    if (campo.validity.badInput) {
        return "Ingresa un valor numérico";
    }
    if (campo.validity.patternMismatch && campo.type === "email") {
        return "Ingresa un email con formato válido";
    }
	if (campo.validity.rangeOverflow) {
		return `Ingresa un valor inferior a ${campo.max}`;
	}
	if (campo.validity.rangeUnderflow) {
        if (campo.name === "edad") {
            return `Debes tener al menos ${campo.min} años para continuar`;
        }
		return `Ingresa un valor mayor o igual a ${campo.min}`;
	}
}

function mostrarError(mensajeError, contenido) {
	mensajeError.textContent = contenido;
}

function ocultarError(mensajeError) {
	mensajeError.textContent = "";
}

window.addEventListener("load", () => {
	formularioRegistro = document.forms["form-registro"];
	formularioRegistro.addEventListener("submit", enviarFormulario);
});
