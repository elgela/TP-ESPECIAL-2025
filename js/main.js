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

async function obtenerPersonas() {
    const lista = document.querySelector("#lista_usuarios");
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
            lista.innerHTML += `<li>${nombre} ${apellido} / ${usuario}</li>`;
        }
     
    } catch (error) {
        console.log("Error");
        
    }
}

////////////////POST personas///////////////
async function enviarPersonas(e) {
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
            obtenerPersonas();
        }
    } catch(error) {
        console.log(error);
    }
    document.querySelector("#form-registro").reset();
}

/////////////PUT personas//////////////////////
async function actualizarPersonas(e) {
    e.preventDefault();
    
}

/////////////DELETE personas//////////////////
async function eliminarUltimo(e) {
    e.preventDefault();
    const usuarioInput = document.querySelector("#usuario-eliminar").value;

    if (!usuarioInput) {
        document.querySelector("#msg").innerHTNL = "Ingrese un nombre de usuario";
        return;
    }
    try {
        // se busca usuario por nombre
        let res = await fetch(`${urlUsuario}?usuario=${usuarioInput}`);
        let data = await res.json();

        if (data.length === 0) {
            document.querySelector("#msg").innerHTML = "Usuario no encontrado";
            return;
        }
        let id = data[0].id;
        //se elimina usuario por id
        let resDelete = await fetch(`${urlUsuario}/${id}`, {
            "method": "DELETE"
        })
        if(res.status === 200) {
            document.querySelector("#msg").innerHTML = "Usuario elimimado!";
            obtenerPersonas(); //refresca la lista
        } else {
            document.querySelector("#msg").innerHTML = "Error al eliminar";
        }
    } catch(error) {
        console.log(error);
    }
}

document.querySelector("#btn-registro").addEventListener("click", enviarPersonas);
document.querySelector("#btn-elimina-usuario").addEventListener("click", eliminarUltimo);
obtenerPersonas();




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
