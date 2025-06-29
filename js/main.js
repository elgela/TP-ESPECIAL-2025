"use strict"

console.log("JS cargado");

document.querySelector(".btn-menu").addEventListener('click', toggleMenu);

function toggleMenu() {
    document.querySelector(".menu").classList.toggle("show");
}

//<!--------------------captcha--------------------

function registroFormulario(e) {
    e.preventDefault();

    // para agarrar todos los datos
    let formData = new FormData(form);

    let usuario = formData.get('usuario');
    let password = formData.get('password');
    let captcha = formData.get('captcha');
    let referencia = document.querySelector("#referencia").innerHTML;
    let aviso = document.querySelector("#aviso");
    console.log(usuario, password, captcha);

    if (referencia == captcha) {
        aviso.innerHTML = "el captcha es correcto";
    } else {
        aviso.innerHTML = "captcha incorrecto";
    }
}
let form = document.querySelector("#form");
if (form) {
    form.addEventListener('submit', registroFormulario);
}

function cargarReferencia() {
    let referencia = document.querySelector("#referencia");
    if (referencia) {
        let aleatorio;
        aleatorio = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
        referencia.innerHTML = aleatorio;
    }
}
cargarReferencia();

//----------------fin captcha------------------->

////////////GET personas///////////////////
const urlUsuario = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/usuarios";
const formRegistro = document.querySelector("#formRegistro");
let id = 0;

async function obtenerUsuarios() {
    const lista = document.querySelector("#tabla_usuarios");
    if (lista) {
        lista.innerHTML = "";
    } else {
        console.log("No hay lista de usuario");
        return;
    }

    try {
        let res = await fetch(urlUsuario); //por defecto fetch hace GET al explorador
        let json = await res.json(); //texto json a objeto
        console.log(json);
        for (const usuarios of json) {
            let nombre = usuarios.nombre;
            let apellido = usuarios.apellido;
            let usuario = usuarios.usuario;
            id = usuarios.id;
            lista.innerHTML += `<tr>
                                    <td>${nombre}</td>
                                    <td>${apellido}</td>
                                    <td>${usuario}</td>
                                    <td><button type="button" class="btn-actualizar" data-id="${id}">Modificar</button><button type="button" class="btn-eliminar" data-id="${id}">Eliminar</button></td>
                                </tr>`;
        }
        let botonesEliminar = document.querySelectorAll(".btn-eliminar");
        for (const boton of botonesEliminar) {
            boton.addEventListener("click", eliminarUsuario);
        }
        let botonesModificar = document.querySelectorAll(".btn-actualizar");
        for (const boton of botonesModificar) {
            boton.addEventListener("click", modificarUsuario);
        }

    } catch (error) {
        console.log("Error", error);
    }
}

////////////////POST personas///////////////
async function enviarUsuario(e) {
    e.preventDefault();
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let telefono = document.querySelector("#telefono").value;
    let ciudad = document.querySelector("#ciudad").value;
    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;

    document.querySelector("#msg").innerHTML = "Usuario registrado!";

    if (!nombre || !apellido || !usuario || !password) {
        document.querySelector("#msg").innerHTML = "Ingrese los datos obligatorios";
        return;
    }

    let persona = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        ciudad: ciudad,
        usuario: usuario,
        password: password
    }

    try {
        let res = await fetch(urlUsuario, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(persona)
        })
        if (res.status === 201) {
            console.log("usuario registrado");
            obtenerUsuarios();
        }
    } catch (error) {
        console.log(error);
    }
    document.querySelector("#form-registro").reset();// resetea los datos ya ingresados en los input del form
}

let btnRegistro = document.querySelector("#btn-registro");
if (btnRegistro) {
    document.querySelector("#btn-registro").addEventListener("click", enviarUsuario);
}

/////////////PUT personas//////////////////////
async function modificarUsuario(e) {
    e.preventDefault();
    const formRegistroOriginal = document.querySelector("#form-registro").innerHTML;
    let idModificar = this.dataset.id;
    let res = await fetch(`${urlUsuario}/${idModificar}`);
    let usuario = await res.json();

    document.querySelector("#form-registro").innerHTML = `
        <h4>Modificar usuario</h4>
        <form id="form-modificar">
            <input type="text" id="nombre" value="${usuario.nombre}" placeholder="Nombre">
            <input type="text" id="apellido" value="${usuario.apellido}" placeholder="Apellido">
            <input type="number" id="telefono" value="${usuario.telefono}" placeholder="Teléfono">
            <input type="text" id="ciudad" value="${usuario.ciudad}" placeholder="Ciudad">
            <input type="text" id="usuario" value="${usuario.usuario}" placeholder="Usuario">
            <input type="text" id="password" value="${usuario.password}" placeholder="Contraseña">
            <button type="button" id="btn-guardar">Guardar cambios</button>
            <button type="button" id="btn-cancelar">Cancelar</button>
        </form>
    `;

    document.querySelector("#btn-cancelar").addEventListener("click", function () {
        document.querySelector("#form-registro").innerHTML = formRegistroOriginal;
    })
    document.querySelector("#btn-guardar").addEventListener("click", async function (e) {
        e.preventDefault();

        let persona = {
            nombre: document.querySelector("#nombre").value,
            apellido: document.querySelector("#apellido").value,
            telefono: document.querySelector("#telefono").value,
            ciudad: document.querySelector("#ciudad").value,
            usuario: document.querySelector("#usuario").value,
            password: document.querySelector("#password").value
        };
        let resPut = await fetch(`${urlUsuario}/${idModificar}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(persona)
        });
        if (resPut.status === 200) {
            document.querySelector("#msg").innerHTML = "Usuario modificado!";
            obtenerUsuarios();
            document.querySelector("#form-registro").innerHTML = formRegistroOriginal;
        } else {
            document.querySelector("#msg").innerHTML = "Error al modificar usuario";
        }
    });
}
/////////////DELETE personas//////////////////
async function eliminarUsuario(e) {
    e.preventDefault();
    let idEliminar = this.dataset.id;

    try {
        let resDelete = await fetch(`${urlUsuario}/${idEliminar}`, {
            "method": "DELETE"
        })
        if (resDelete.status === 200) {
            document.querySelector("#msg").innerHTML = "Usuario eliminado!";
            obtenerUsuarios(); //refresca la lista
        } else {
            document.querySelector("#msg").innerHTML = "Usuario no encontrado";
        }
    } catch (error) {
        console.log(error);
    }
}

obtenerUsuarios();

////////////////partial render////////////
function asociarPartialRender() {
    document.querySelectorAll(".link-bazar").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            partialRender("bazar.html");
        });
    });
    document.querySelectorAll(".link-almacen").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            partialRender("almacen.html");
        });
    });
}

asociarPartialRender();

async function partialRender(ruta) {
    try {
        let res = await fetch(ruta);
        let text = await res.text();
        let temp = document.createElement('div');
        temp.innerHTML = text;
        let nuevoMain = temp.querySelector('main.content');
        if (nuevoMain) {
            document.querySelector('main.content').innerHTML = nuevoMain.innerHTML;
            asociarPartialRender();
        }
    } catch (error) {
        console.log('Error al cargar el contenido:', error);
    }
}
