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

////////////GET personas///////////////////
const urlUsuario = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/usuarios";
let id = 0;
let usuarioInput = "";

async function obtenerUsuarios() {
    const lista = document.querySelector("#tabla_usuarios");
    lista.innerHTML = "";
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
                                    <td><button type="button" class="btn-modificar" data-id="${id}">Modificar</button><button type="button" class="btn-eliminar" data-id="${id}">Eliminar</button></td>
                                </tr>`;
        }
        let botonesEliminar = document.querySelectorAll(".btn-eliminar");
        for (const boton of botonesEliminar) {
            boton.addEventListener("click", eliminarUsuario);
        }
        let botonesModificar = document.querySelectorAll(".btn-modificar");
        for (const boton of botonesModificar) {
            boton.addEventListener("click", modificarUsuario);
        }

    } catch (error) {
        console.log("Error");
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
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(persona)
        })
        if(res.status == 201) {
            console.log("usuario creado");
            obtenerUsuarios();
        }
    } catch(error) {
        console.log(error);
    }
    document.querySelector("#form-registro").reset();// resetea los datos ya ingresados en los input del form
}

/////////////PUT personas//////////////////////
async function modificarUsuario(e) {
    e.preventDefault();
    let idModificar = this.dataset.id;

    try {
        let resModif = await fetch(`${urlUsuario}/${idModificar}`, {
            "method": "PUT",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(persona)
        })

        if (resModif.status === 200) {
            document.querySelector("#msg").innerHTML = "Usuario modificado";
        }
    } catch (error) {
        console.log(error);
        
    }
}
// document.querySelector("#btn-modifica").addEventListener("click", modificarUsuario);

/////////////DELETE personas//////////////////
async function eliminarUsuario(e) {
    e.preventDefault();
    let idEliminar = this.dataset.id;

    try {
        let resDelete = await fetch(`${urlUsuario}/${idEliminar}`, {
            "method": "DELETE"
        })
        if(resDelete.status === 200) {
            document.querySelector("#msg").innerHTML = "Usuario eliminado!";
            obtenerUsuarios(); //refresca la lista
        } else {
            document.querySelector("#msg").innerHTML = "Usuario no encontrado";
        }
        document.querySelector("#usuario-eliminar").value = "";
    } catch(error) {
        console.log(error);
    }
}

document.querySelector("#btn-registro").addEventListener("click", enviarUsuario);
obtenerUsuarios();




//-----------------tabla productos-------------->
///////////////GET productos//////////////////////
// async function obtenerDatos() {
//     const urlProductos = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/carrito";
//     // e.preventDefault();
//     const lista = document.querySelector("#listado");
//     lista.innerHTML = "";
//     try {
//         let res = await fetch(urlProductos); // GET al listado y se obtienen datos de productos en la API
//         let json = await res.json(); // así el texto json se parsea (compila) a un objeto
//         console.log(json);
//         for (const productos of json) {
//             let cantidad = productos.cantidad;
//             let producto = productos.producto;
//             let precio = productos.precio;
//             lista.innerHTML += `<tr>
//                                 <td>${cantidad}</td>
//                                 <td>${producto}</td>
//                                 <td>${precio}</td>
//                                 <td><button style="cursor:pointer">Modificar</button</td>
//                                 <td><button style="cursor:pointer">Eliminar</button></td>
//                                 </tr>`;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// obtenerDatos();

// ////////////////POST productos/////////////////
// const urlProductos = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/carrito";
// async function agregarProductos(e) {
//     e.preventDefault();
//     let cantidad = document.querySelector("#cantidad").value;
//     let producto = document.querySelector("#producto").value;
//     let precio = document.querySelector("#precio").value;

//     contenedor.innerHTML = cantidad + producto + " se agregó al carrito";

//     let nuevoProducto = {
//         cantidad: cantidad,
//         producto: producto,
//         precio: precio
//     };

//     try {
//         let res = await fetch(urlProductos, {
//             method: "POST",
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify(nuevoProducto)
//         })
//         let json = await res.json();
//         console.log(json);

//         obtenerDatos();
//     } catch (error) {
//         console.log(error);

//     }
// }

// let formAgregar = document.querySelector("#listado");
// if (formAgregar) {
//     formAgregar.addEventListener('submit', agregarProductos);
// }

// ////////////////POST usuarios/////////////////
// const urlUsuario = "https://6845ab1afc51878754dbee55.mockapi.io/api/v1/usuarios";
// const contenedor = document.querySelector("#registro");

// async function registrarse(e) {
//     e.preventDefault();
//     let nombre = document.querySelector("#nombre").value;
//     let apellido = document.querySelector("#apellido").value;
//     let telefono = document.querySelector("#telefono").value;
//     let ciudad = document.querySelector("#ciudad").value;
//     let usuario = document.querySelector("#usuario").value;
//     let password = document.querySelector("#password").value;

//     contenedor.innerHTML = nombre + " " + apellido + " " + " ha quedado registrado/a!";

//     let usuarios = {
//         nombre: nombre,
//         apellido: apellido,
//         telefono: telefono,
//         ciudad: ciudad,
//         usuario: usuario,
//         password: password
//     };

//     try {
//         let res = await fetch(urlUsuario, {
//             "method": "POST",
//             "headers": { "Content-type": "application/json" },
//             "body": JSON.stringify(usuarios)
//         });
//         let json = await res.json();
//         console.log(json);
//         let idUsuario = json.id;

//         contenedor.innerHTML = "Tu ID de usuario es: " + idUsuario;

//         if (res.status === 201)
//             console.log(nombre + " " + apellido + " " + " ha quedado registrado/a!");
//     } catch (error) {
//         console.log(error);

//     }
// }

// let formRegistro = document.querySelector("#form-registro");
// if (formRegistro) {
//     formRegistro.addEventListener('submit', registrarse);
// }

// //////////////obtener ID usuario////////////
// async function obtenerIDporUsuario(usuario) {
//     const respuesta = await fetch(`https://6845ab1afc51878754dbee55.mockapi.io/api/v1/usuarios?usuario=${usuario}`);
//     if (!respuesta.ok) {
//         alert("No se pudo obtener el ID del usuario");
//     }
//     let datos = await respuesta.json();
//     return datos.id;
// }

// /////////////cambiar contraseña/////////////
// async function cambiarContrasenia(e) {
//     e.preventDefault();

//     let newPass = document.querySelector("#newPass");
//     newPass.innerHTML = `<h5>Usuario: <input type="text" placeholder="usuario"></h5>
//                         <h5>Contraseña actual: <input type="text" placeholder="actual"></h5>
//                         <h5>Nueva contraseña: <input type="text" placeholder="nueva"</h5>
//                         <button id="btn-enviarPass">Enviar</button>`

//     document.querySelector("#btn-enviarPass").addEventListener("click", async function () {
//         let usuario = document.querySelector("#usuario").value;
//         let actual = document.querySelector("#actualPass").value;
//         let nueva = document.querySelector("#nuevoPass");
//     })

//     try {
//         let res = await fetch(`https://6845ab1afc51878754dbee55.mockapi.io/api/v1/usuarios?usuario=${usuario}`);
//         let data = await res.json();

//         if (data.length > 0 && data[0].password === actual) {
            
//         }
//     } catch (error) {

//     }

// }
// document.querySelector("#btn-cambiar").addEventListener('click', cambiarContrasena);



// //////////////PUT usuarios//////////////////
// async function actualizar(e) {
//     e.preventDefault();
// }
// document.querySelector("#btn-cambiar").addEventListener('click', actualizar);
