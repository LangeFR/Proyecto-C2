function quitarEspacios(string) {
  return string.replace(/\s/g, "");
}
var listaJSON = {};
let countJSON = 0;

/*
    -------------------
    Landing Page Inicio
    -------------------
*/

// ESTABLECIDO EL LOADER
function mostrarLoading() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}

function ocultarLoading() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

function readMorePresentacion() {
  var dots = document.getElementById("dotsReadMorePresentacion");
  var moreText = document.getElementById("moreTextPresentacion");
  var btnText = document.getElementById("btnReadMorePresentacion");
  var hamburguesaImg = document.getElementById("hamburguesaDescripcion");
  var malteadaImg = document.getElementById("malteadaDescripcion");
  var descripcion =
    document.getElementsByClassName("divPresentacion").clientHeight;

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";

    hamburguesaImg.style.marginLeft = "5px"; // Restablecer margen izquierdo
    hamburguesaImg.setAttribute(
      "style",
      "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin-top: 5px; max-height: 150px;"
    );
    malteadaImg.setAttribute(
      "style",
      "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin-top: 5px; max-height: 150px;"
    );
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";

    hamburguesaImg.style.aspectRatio = 225 / 350;
    hamburguesaImg.style.minHeight = "350px";
    hamburguesaImg.style.minWidth = "225px";
    hamburguesaImg.style.maxWidth = "225px";

    malteadaImg.style.aspectRatio = 225 / 350;
    malteadaImg.style.minHeight = "350px";
    malteadaImg.style.minWidth = "225px";
    malteadaImg.style.maxWidth = "225px";
  }
}

//FUNCIÓN PARA CARGAR MENÚ

document.addEventListener("DOMContentLoaded", () => {
  const listaItemsPrincipales = document.getElementById(
    "listaItemsPrincipales"
  );
  const listaItemsEntrada = document.getElementById("listaItemsEntrada");
  const listaItemsBebidas = document.getElementById("listaItemsBebidas");
  const listaItemsPostres = document.getElementById("listaItemsPostres");
  const InfoEntradas = document.querySelector("#InfoEntradas");
  const InfoPrincipales = document.querySelector("#InfoPrincipales");
  const InfoBebidas = document.querySelector("#InfoBebidas");
  const InfoPostres = document.querySelector("#InfoPostres");
  const infoPlato = document.querySelector(".InfoPlato");

  if (infoPlato.innerHTML.trim() === "") {
    const loader = document.querySelector("#loader img");
    loader.src = "hamburguesa_elegante.png";
  }

  // Función ASINCRONA para cargar y mostrar los platos según la categoría
  async function mostrarPlatosPorCategoria(categoria) {
    try {
      mostrarLoading(categoria);
      const loading = document.getElementById("loader");
      infoPlato.innerHTML = "";

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwgidJUqj5RAmPH_sZQVA2D-rHAcxO4bKfAjG2ursRCa3o7dbFZ36WafHT0-Z-bCr8X/exec"
      );
      if (response.ok) {
        const data = await response.json();
        const platosCategoria = data.data.filter(
          (plato) => plato.Categoria === categoria
        ); //se filtran por categorias :)
        // Mostrar info de los platos de la categoría
        platosCategoria.forEach((plato) => {
          infoPlato.innerHTML += ` 
                  <div class="platoContainer"  id="infoPlatoContainer${
                    plato.ID
                  }">                      
                      <img id="imagen${plato.ID}" src="${plato.Imagen ?? ""}"/>
                      <div class"infoPlatoContainer">
                        <h3 class="nombre">${plato.Nombre ?? ""}</h3>
                        <p class="descripcion">${plato.Descripcion ?? ""}</p>
                        <p class="id">ID:${plato.ID ?? ""}</p>
                        <p class="precio">$${plato.Precio ?? "COP"}</p>
                        <button class="añadir-carrito" onClick="añadirAlCarrito(${
                          plato.ID
                        })">Agregar al carrito</button>
                      </div>
                  </div>
                  <hr>
                    
                `;

          let tempID = "imagen" + plato.ID;
          let imagenPlato = document.getElementById(tempID);

          imagenPlato.setAttribute(
            "style",
            "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin-top: 5px; max-height: 150px;"
          );

          tempID = "infoPlatoContainer" + plato.ID;
          let infoPlatoId = document.getElementById(tempID);
          infoPlatoId.setAttribute("style", "display: flex; gap: 10px;");
        });
        ocultarLoading();
      } else {
        throw new Error("Error en la solicitud: " + response.status);
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error, realiza la acción nuevamente");
      ocultarLoading();
    }
  }

  // Llamadas a la función para cargar información en cada divv
  listaItemsPrincipales.addEventListener("click", () => {
    mostrarPlatosPorCategoria("platosPrincipales");
  });

  listaItemsBebidas.addEventListener("click", () => {
    mostrarPlatosPorCategoria("Bebidas");
  });

  listaItemsPostres.addEventListener("click", () => {
    mostrarPlatosPorCategoria("Postres");
  });

  listaItemsEntrada.addEventListener("click", () => {
    mostrarPlatosPorCategoria("Entradas");
  });
});

/*
  Precios
*/

// Selecciona todos los elementos que tienen la clase 'precio'
var elementosPrecio = document.querySelectorAll(".precio");

// Itera sobre los elementos y aplica la lógica de manejo de precios
elementosPrecio.forEach(function (elemento) {
  // Obtiene el precio bruto del elemento
  var precioBruto = parseFloat(elemento.textContent);
  // Formatea y actualiza el precio mostrado
  elemento.textContent = precioBruto.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
});

/*
    ------------------
    Landing Page Final
    ------------------
*/

///----------------------

async function añadirAlCarrito(idProducto) {
  let nombreProducto;
  let precioProducto;

  try {
    mostrarLoading();
    const loading = document.getElementById("loader");

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwgidJUqj5RAmPH_sZQVA2D-rHAcxO4bKfAjG2ursRCa3o7dbFZ36WafHT0-Z-bCr8X/exec"
    );
    if (response.ok) {
      const dataResponse = await response.json();

      const data = dataResponse.data; // Acceder al arreglo de objetos dentro de la propiedad "data"
      console.log(data);
      nombreProducto = data[idProducto].Nombre;
      precioProducto = parseFloat(data[idProducto].Precio);

      ocultarLoading();
    } else {
      throw new Error("Error en la solicitud: " + response.status);
    }
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error, realiza la acción nuevamente");
  }

  // Llama a una función para agregar el nombre del producto a la lista en el otro HTML
  agregarProductoALista(nombreProducto, precioProducto);
  actualizarTotal(precioProducto);
}

// Función para agregar el nombre del producto a la lista en el otro HTML
function agregarProductoALista(nombreProducto, precioProducto) {
  /*
    Revisar si el producto ya esta en la lista
  */
  const carrito = localStorage.getItem("carrito") || [];
  let yaEsta = false;

  for (var clave in listaJSON) {
    if (listaJSON.hasOwnProperty(clave)) {
      if (listaJSON[clave].Nombre === nombreProducto) {
        yaEsta = true;
        listaJSON[clave].Cantidad++;
        break; // Termina el bucle una vez que se encuentra el objeto
      }
    }
  }

  let idJSON = Object.keys(listaJSON).length - 1;

  if (yaEsta === false) {
    idJSON++;
    // Crea un nuevo elemento de lista
    const nuevoElementoLista = document.createElement("li");
    nuevoElementoLista.classList.add("item-lista");

    // Crea un elemento de botón para el botón de eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar-item");

    botonEliminar.addEventListener("click", function () {
      this.parentElement.remove(); // Elimina el elemento de lista al hacer clic en el botón de eliminar
      precioProducto *= -1;
      actualizarTotal(precioProducto);
    });

    const precioFormateado = precioProducto.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });

    /*
    listaJSON[nombreProducto] = {
      "Precio": precioProducto,
      "Cantidad": 1
    };*/
    listaJSON[idJSON] = {
      Nombre: nombreProducto,
      Precio: precioProducto,
      Cantidad: 1,
    };

    let idItem = quitarEspacios(nombreProducto);

    carritoList.innerHTML += `
      <li class="item-lista" id="carrito${idItem}">
        <p>${nombreProducto}</p>
        <div class="cantidadItem">
            <button class="btnMasItem" id="btnMasItem${idItem}" onclick="masItem('${String(
      idItem
    )}', '${String(idJSON)}')">+</button>
            <p class="cantidadItem" id="cantidad${idItem}"> ${
      listaJSON[idJSON].Cantidad
    }</p>
            <button class="btnMenosItem" id="btnMenosItem${idItem}" onclick="menosItem('${String(
      idItem
    )}', '${String(idJSON)}')">-</button>
        </div>
      </li>
    `;

    /* Agrega el nombre del producto, el precio y el botón de eliminar al nuevo elemento de lista
    nuevoElementoLista.textContent = nombreProducto + " - " + precioFormateado;
    nuevoElementoLista.appendChild(botonEliminar);

    // Agrega el nuevo elemento a la lista en el otro HTML
    const listaEnOtroHTML = document.getElementById('carritoList');
    listaEnOtroHTML.appendChild(nuevoElementoLista);*/
  } else {
    let idStr = "cantidad" + quitarEspacios(nombreProducto);
    let cantidadElemento = document.getElementById(idStr);

    console.log(idJSON);
    cantidadElemento.innerHTML = listaJSON[idJSON].Cantidad;
  }
  console.log(listaJSON);
}

function masItem(idItem, idJSON) {
  listaJSON[idJSON].Cantidad++;
  actualizarTotal(listaJSON[idJSON].Precio);

  let idStr = "cantidad" + idItem;
  let cantidadElemento = document.getElementById(idStr);
  cantidadElemento.innerHTML = listaJSON[idJSON].Cantidad;
}

function menosItem(idItem, nombreProducto) {
  let precio = listaJSON[nombreProducto].Precio * -1;

  if (listaJSON[nombreProducto].Cantidad > 1) {
    listaJSON[nombreProducto].Cantidad--;

    let idStr = "cantidad" + idItem;
    let cantidadElemento = document.getElementById(idStr);
    cantidadElemento.innerHTML = listaJSON[nombreProducto].Cantidad;
  } else {
    // Obtener el elemento <li> que se desea eliminar
    let liElemento = document.getElementById("carrito" + idItem);
    // Eliminar el elemento <li>
    liElemento.remove();
    // Eliminar el producto del objeto JSON
    delete listaJSON[nombreProducto];
  }

  actualizarTotal(precio);
  console.log(listaJSON);
}

// Variable para almacenar el precio total
let precioTotal = 0;

// Función para actualizar el precio total
function actualizarTotal(precioProducto) {
  // Convertir el precio del producto a un número antes de sumarlo
  let precioProductoNum = parseFloat(precioProducto);

  // Sumar el precio del producto al precio total
  precioTotal += precioProductoNum;

  const precioFormateado = precioTotal.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

  // Obtener el elemento textarea donde se muestra el total
  const totalTextarea = document.getElementById("totalPrecio");

  // Actualizar el valor del textarea con el nuevo total
  totalTextarea.value = precioFormateado; // Asegura que se muestren solo dos decimales
}

/*
    --------------
    Carrito Inicio
    --------------  
*/
// Función para agregar un elemento al carrito
/*function agregarAlCarrito(nombre, precio) {
  const item = { nombre: nombre, precio: precio };
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  console.log("Agregar al");
  carrito.push(item);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} ha sido agregado al carrito.`);
}*/

function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoList = document.getElementById("carritoList");
  carritoList.innerHTML = "";
  console.log("cargarCarrito: ");
  console.log(carrito);
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    carritoList.appendChild(li);
  });

  // Calcular y mostrar el total del carrito
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  const totalElement = document.getElementById("total");
  if (totalElement != null) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}

// Event listener para cargar el carrito cuando la página se cargue
window.addEventListener("load", cargarCarrito);

function limpiarCarrito() {
  listaJSON = {};
  localStorage.removeItem("carrito");
  cargarCarrito();
  precioTotal = 0;
  const totalTextarea = document.getElementById("totalPrecio");
  totalTextarea.value = 0;
}

// Event listener para cargar el carrito cuando la página se cargue
window.addEventListener("load", cargarCarrito);

// Event listener para limpiar el carrito cuando se haga clic en el botón
document
  .getElementById("limpiarCarrito")
  .addEventListener("click", limpiarCarrito);
/*
document.querySelector(".botonComprar").addEventListener("click", function () {
  var nombre = document.getElementById("nombre").value;
  var numero = document.getElementById("numero").value;
  var direccion = document.getElementById("direccion").value;

  if (nombre && numero && direccion != "") {
    // Obtiene la lista de productos del carrito
    const listaProductos = document.querySelectorAll("#carritoList li");
    console.log(listaProductos);

    // Filtra los elementos que no deseas incluir en la lista de productos
    const productosFiltrados = [];

    listaProductos.forEach((producto) => {
      productosFiltrados.push(producto.textContent.trim());
    });

    console.log(productosFiltrados);

    // Convierte el array en una cadena de texto para incluirlo en la URL
    const listaProductosURL = encodeURIComponent(
      JSON.stringify(productosFiltrados)
    );

    // Guarda la lista de productos en la URL
    window.history.pushState({}, "", "?productos=" + productosFiltrados);

    limpiarCarrito();
    const totalTextarea = document.getElementById("totalPrecio");
    totalTextarea.value = 0;
    alert("Comprados Con Exito");
  } else {
    alert("Por favor llene todos los campos");
  }
});
*/


//ESTO ES PARA INTERCEPTAR Y QUE NO SE VAYA A LA WEBAPPSCRIPT. 

document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
  // Obtén los valores de los campos del formulario
  var nombre = document.getElementById("nombre").value;
  var numero = document.getElementById("numero").value; 
  var direccion = document.getElementById("direccion").value; 
  
  // Realiza cualquier validación adicional aquí si es necesario
  
  // Crea un objeto FormData para enviar los datos del formulario
  var formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("numero", numero);
  formData.append("direccion", direccion);

  // Realiza la solicitud POST mediante fetch
  fetch("https://script.google.com/macros/s/AKfycbwgidJUqj5RAmPH_sZQVA2D-rHAcxO4bKfAjG2ursRCa3o7dbFZ36WafHT0-Z-bCr8X/exec", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Maneja la respuesta aquí si es necesario
    console.log("Response:", data);
    alert("¡Compra realizada con éxito!");
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
  });
});

//FUNCION DE POST

/*
const scriptURL = 'https://script.google.com/macros/s/AKfycbwkUrGUvPnrHYC8ixy_jt7Wdx3Fqn7Ks_TkM_m7zWcrjeN7S0A0h7-5zpKeMxIs7m-Z/exec'
const form = document.forms['submit-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})

/*
async function postJSON(data) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw-iNnrzplDZHspDakHgRlLMI7CntYlhv38WVT1uRq3Je1hoY1c9zaSN8G6KhvW-8a7/exec",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

//FUNCION PARA ENVIAR AL FORMULARIO LA INFO del usaurio
async function enviarFormulario() {
  try {
    var nombre = document.getElementById("nombre").value;
    var numero = document.getElementById("numero").value;
    var direccion = document.getElementById("direccion").value;

    // Crear un arreglo para almacenar la información de cada producto en el carrito
    var productosPedido = [];

    // Recorrer el carrito y obtener la información de cada producto
    for (var clave in listaJSON) {
      if (listaJSON.hasOwnProperty(clave)) {
        var producto = listaJSON[clave];
        // Crear un objeto con la información del producto
        var productoPedido = {
          idProducto: producto.ID,
          precio: producto.Precio,
          cantidad: producto.Cantidad,
        };
        // Agregar el objeto a la lista de productos del pedido
        productosPedido.push(productoPedido);
      }
    }

    // Crear un objeto con la información del formulario y la lista de productos del pedido
    var formData = {
      nombre: nombre,
      numero: numero,
      direccion: direccion,
      productosPedido: productosPedido,
    };

    // Llamar a la función postJSON para enviar los datos
    await postJSON(formData);

    limpiarCarrito();
    alert("¡Compra realizada con éxito!");
  } catch (error) {
    console.error("Error:", error);
    alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
  }
}

/*
    --------------
    Carrito Final
    --------------
*/
