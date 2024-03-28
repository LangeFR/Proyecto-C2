function quitarEspacios(string) {
  return string.replace(/\s/g, '');
}
var listaJSON = {};	
/*
    -------------------
    Landing Page Inicio
    -------------------
*/

// ESTABLECIDO EL LOADER
function mostrarLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; 
  }
  
  function ocultarLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  }

function readMorePresentacion() {
  var dots = document.getElementById("dotsReadMorePresentacion");
  var moreText = document.getElementById("moreTextPresentacion");
  var btnText = document.getElementById("btnReadMorePresentacion");
  var hamburguesaImg = document.getElementById("hamburguesaDescripcion");
  var malteadaImg = document.getElementById("malteadaDescripcion");
  var descripcion = document.getElementsByClassName("divPresentacion").clientHeight;

  if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";

      hamburguesaImg.style.marginLeft = "5px"; // Restablecer margen izquierdo
        hamburguesaImg.setAttribute("style", "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin-top: 5px; max-height: 150px;");
        malteadaImg.setAttribute("style", "aspect-ratio: 150 / 100; min-height: 150px; min-width: 225px; max-width: 225px; margin-top: 5px; max-height: 150px;");

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
/*
function ocultarCategoria(categoriaId) {
  var categoria = document.getElementById(categoriaId);
  // Ocultar la categoría al cargar la página
  categoria.style.display = 'none';
}

// Ocultar todos los elementos de las categorías al cargar la página
ocultarCategoria('listaItemsEntrada');
ocultarCategoria('listaItemsPlatosPrincipales');
ocultarCategoria('listaItemsBebidas');
ocultarCategoria('listaItemsPostres');


// Función para mostrar u ocultar los elementos de una categoría
function toggleCategoria(categoriaId) {
  var categoria = document.getElementById(categoriaId);
  // Verificar si la categoría está visible o no
  if (categoria.style.display === 'none') {
      // Si está oculta, mostrarla
      categoria.style.display = 'initial';
  } else {
      // Si está visible, ocultarla
      categoria.style.display = 'none';
  }
}



// Agregar un evento de clic a cada botón de categoría
document.querySelector('#entradas .mostrarCategoria').addEventListener('click', function() {
  toggleCategoria('listaItemsEntrada');
});

document.querySelector('#bebidas .mostrarCategoria').addEventListener('click', function() {
  toggleCategoria('listaItemsBebidas');
});

document.querySelector('#postres .mostrarCategoria').addEventListener('click', function() {
  toggleCategoria('listaItemsPostres');
});

*/

//FUNCIÓN PARA CARGAR MENÚ

document.addEventListener("DOMContentLoaded", () => {
  const listaItemsPrincipales = document.getElementById("listaItemsPrincipales");
  const listaItemsEntrada = document.getElementById('listaItemsEntrada');
  const listaItemsBebidas = document.getElementById('listaItemsBebidas');
  const listaItemsPostres = document.getElementById('listaItemsPostres');
  const InfoEntradas = document.querySelector("#InfoEntradas");
  const InfoPrincipales = document.querySelector("#InfoPrincipales");
  const InfoBebidas = document.querySelector("#InfoBebidas");
  const InfoPostres = document.querySelector("#InfoPostres");
  const infoPlato = document.querySelector(".InfoPlato");

  // Función ASINCRONA para cargar y mostrar los platos según la categoría
  async function mostrarPlatosPorCategoria(categoria) {
    try {
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbz837EfQwrT9v7tNwuQR-NA1jztv5-_W9Rk4F7WcyxwL_S5IAyVqkmZT9imGFchAsQ2/exec'
        );
        if (response.ok) {
            const data = await response.json();
            const platosCategoria = data.data.filter(plato => plato.Categoria === categoria); //se filtran por categorias :)
            // Mostrar info de los platos de la categoría
            platosCategoria.forEach(plato => {
                infoPlato.innerHTML += `   
                <h3 class="id">${plato.ID ?? ""}</h3>
                <p class="nombre">${plato.Nombre ?? ""}</p>  
                <img id="imagen" src="${plato.Imagen ?? ""}"/>
                <h3 class="descripcion">${plato.Descripcion ?? ""}</h3>
                <p class="categoria">${plato.Categoria ?? ""}</p>  
                `;
            });
        } else {
            throw new Error("Error en la solicitud: " + response.status);
        }
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error, realiza la acción nuevamente");
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
  
    listaItemsPostres.addEventListener("click", () => {
      mostrarPlatosPorCategoria("Entradas");
    });
  



  });


/*
  Precios
*/

// Selecciona todos los elementos que tienen la clase 'precio'
var elementosPrecio = document.querySelectorAll('.precio');

// Itera sobre los elementos y aplica la lógica de manejo de precios
elementosPrecio.forEach(function(elemento) {
    // Obtiene el precio bruto del elemento
    var precioBruto = parseFloat(elemento.textContent);
    // Formatea y actualiza el precio mostrado
    elemento.textContent = precioBruto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
});


/*
    ------------------
    Landing Page Final
    ------------------
*/


///----------------------
// Obtén todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.añadir-carrito');


// Itera sobre cada botón y agrega un event listener
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    // Obtén el nombre del producto del input oculto
    const nombreProducto = boton.parentElement.querySelector('.nombre-producto').value;
    const precioProducto = parseFloat(boton.parentElement.querySelector('.precio-producto').value);
    
    // Llama a una función para agregar el nombre del producto a la lista en el otro HTML
    agregarProductoALista(nombreProducto, precioProducto);
    actualizarTotal(precioProducto)
  });
});


// Función para agregar el nombre del producto a la lista en el otro HTML
function agregarProductoALista(nombreProducto, precioProducto) {
  /*
    Revisar si el producto ya esta en la lista
  */
  const carrito = (localStorage.getItem('carrito')) || [];
  let yaEsta = false;

  
  for (var clave in listaJSON) {
    if (listaJSON.hasOwnProperty(clave)) {
      if (clave === nombreProducto) {
        yaEsta = true;
        listaJSON[clave].Cantidad++;
        break; // Termina el bucle una vez que se encuentra el objeto
      }
    }
  }

  
  if(!yaEsta){
    // Crea un nuevo elemento de lista
    const nuevoElementoLista = document.createElement('li');
    nuevoElementoLista.classList.add('item-lista');

    // Crea un elemento de botón para el botón de eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('eliminar-item');

    botonEliminar.addEventListener('click', function() {
      this.parentElement.remove(); // Elimina el elemento de lista al hacer clic en el botón de eliminar
      precioProducto *= -1;
      actualizarTotal(precioProducto)
    });

    const precioFormateado = precioProducto.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP'
    });

    listaJSON[nombreProducto] = {
      "Precio": precioProducto,
      "Cantidad": 1
    }; 

    let idItem = quitarEspacios(nombreProducto);

    carritoList.innerHTML +=`
      <li class="item-lista" id="carrito${idItem}">
        <p>${nombreProducto }</p>
        <div class="cantidadItem">
            <button class="btnMasItem" id="btnMasItem${idItem}" onclick="masItem('${String(idItem)}', '${String(nombreProducto)}')">+</button>
            <p class="cantidadItem" id="cantidad${idItem}"> ${listaJSON[nombreProducto].Cantidad}</p>
            <button class="btnMenosItem" id="btnMenosItem${idItem}" onclick="menosItem('${String(idItem)}', '${String(nombreProducto)}')">-</button>
        </div>
      </li>
    `;

    console.log(botonEliminar); 
    /* Agrega el nombre del producto, el precio y el botón de eliminar al nuevo elemento de lista
    nuevoElementoLista.textContent = nombreProducto + " - " + precioFormateado;
    nuevoElementoLista.appendChild(botonEliminar);

    // Agrega el nuevo elemento a la lista en el otro HTML
    const listaEnOtroHTML = document.getElementById('carritoList');
    listaEnOtroHTML.appendChild(nuevoElementoLista);*/
  }
  console.log(listaJSON);
  
}

function masItem(idItem, nombreProducto) {
  listaJSON[nombreProducto].Cantidad++;
  actualizarTotal(listaJSON[nombreProducto].Precio)

  let idStr = "cantidad" + idItem;
  let cantidadElemento = document.getElementById(idStr);
  cantidadElemento.innerHTML = listaJSON[nombreProducto].Cantidad;
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

  const precioFormateado = precioTotal.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
  });
  
  // Obtener el elemento textarea donde se muestra el total
  const totalTextarea = document.getElementById('totalPrecio');
  
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
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoList = document.getElementById('carritoList');
  carritoList.innerHTML = '';
  console.log("cargarCarrito: ");
  console.log(carrito);
  carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
      carritoList.appendChild(li);
  });

  // Calcular y mostrar el total del carrito
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  const totalElement = document.getElementById('total');
  if(totalElement != null){
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
}

// Event listener para cargar el carrito cuando la página se cargue
window.addEventListener('load', cargarCarrito);

function limpiarCarrito() {
  listaJSON = {};
  localStorage.removeItem('carrito');
  cargarCarrito();
  precioTotal = 0;
  const totalTextarea = document.getElementById('totalPrecio');
  totalTextarea.value = 0;
}



// Event listener para cargar el carrito cuando la página se cargue
window.addEventListener('load', cargarCarrito);

// Event listener para limpiar el carrito cuando se haga clic en el botón
document.getElementById('limpiarCarrito').addEventListener('click', limpiarCarrito);

document.querySelector('.botonComprar').addEventListener('click', function() {
  // Obtiene la lista de productos del carrito
  const listaProductos = document.querySelectorAll('#carritoList li');
  console.log(listaProductos);

  // Filtra los elementos que no deseas incluir en la lista de productos
  const productosFiltrados = [];

  listaProductos.forEach(producto => {
    productosFiltrados.push(producto.textContent.trim());
  });

  console.log(productosFiltrados);

  // Convierte el array en una cadena de texto para incluirlo en la URL
  const listaProductosURL = encodeURIComponent(JSON.stringify(productosFiltrados));
  

  // Guarda la lista de productos en la URL
  window.history.pushState({}, '', '?productos=' + productosFiltrados);

  limpiarCarrito();
  const totalTextarea = document.getElementById('totalPrecio');
  totalTextarea.value = 0;
  
  // Muestra un mensaje de confirmación
  alert('Comprados Con Exito');
});

/*
    --------------
    Carrito Final
    --------------
*/