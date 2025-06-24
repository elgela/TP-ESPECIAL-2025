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
    // let usuario = document.querySelector("#usuario").value;
    // let password = document.querySelector("#password").value;
    // let captcha = document.querySelector("#captcha").value;
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

//-----------------tabla productos-------------->
///////////////GET productos//////////////////////
async function obtenerDatos() {
    const urlProductos = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/carrito";
    // e.preventDefault();
    const lista = document.querySelector("#listado");
    lista.innerHTML = "";
    try {
        let res = await fetch(urlProductos); // GET al listado y se obtienen datos de productos en la API
        let json = await res.json(); // así el texto json se parsea (compila) a un objeto
        console.log(json);
        for (const productos of json) {
            let cantidad = productos.cantidad;
            let producto = productos.producto;
            let precio = productos.precio;
            lista.innerHTML += `<tr>
                                <td>${cantidad}</td>
                                <td>${producto}</td>
                                <td>${precio}</td>
                                </tr>`;
        }
    } catch (error) {
        console.log(error);
    }
}

obtenerDatos();

////////////////POST productos/////////////////
const urlProductos = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/carrito";
async function agregarProductos(e) {
    e.preventDefault();
    let cantidad = document.querySelector("#cantidad").value;
    let producto = document.querySelector("#producto").value;
    let precio = document.querySelector("#precio").value;

    contenedor.innerHTML = cantidad + producto + " se agregó al carrito";

    let nuevoProducto = {
        cantidad: cantidad,
        producto: producto,
        precio: precio
    };

    try {
        let res = await fetch(urlProductos, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(nuevoProducto)
        })
        let json = await res.json();
        console.log(json);

        obtenerDatos();
    } catch (error) {
        console.log(error);
        
    }
}

let formAgregar = document.querySelector("#listado");
if (formAgregar) {
    formAgregar.addEventListener('submit', agregarProductos);
}

////////////////POST usuarios/////////////////
const urlUsuario = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/usuarios";
const contenedor = document.querySelector("#registro");

async function registrarse(e) {
    e.preventDefault();
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let telefono = document.querySelector("#telefono").value;
    let ciudad = document.querySelector("#ciudad").value;
    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;

    contenedor.innerHTML = nombre + " " + apellido + " " + " ha quedado registrado/a!";

    let usuarios = {
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        ciudad: ciudad,
        usuario: usuario,
        password: password
    };

    try {
        let res = await fetch(urlUsuario, {
            "method": "POST",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(usuarios)
        });
        let json = await res.json();
        console.log(json);
        
        if (res.status === 201) 
            console.log(nombre + " " + apellido + " " + " ha quedado registrado/a!");
    } catch (error) {
        console.log(error);
        
    }
}

let formRegistro = document.querySelector("#form-registro");
formRegistro.addEventListener('submit', registrarse);


// document.addEventListener("DOMContentLoaded", function() {
//     let lista = document.querySelector("#listado");
//     if (lista) {
//         lista.innerHTML = `
//             <tr><td>Producto de prueba 1</td></tr>
//             <tr><td>Producto de prueba 2</td></tr>
//         `;
//     }
// });