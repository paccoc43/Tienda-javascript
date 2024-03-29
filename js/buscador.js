const buscador = document.getElementById("buscador")
const listaObjetos = document.getElementById("dropdownMenu")

buscador.addEventListener('input',() =>{
    
    fetchBuscador(buscador.value.toLowerCase())
})

const fetchBuscador = async (input) => {
    try {
        const resul = await fetch('./src/objetos.json');
        const datos = await resul.json();
        // console.log(datos);
  
        muestraDropdown(datos, input)
        // itemsObjetos = obtenerDatos(datos)
        // console.log(itemsObjetos)
        // muestraItems(itemsObjetos, maxItems, 0)
        // nPaginas = Math.ceil(itemsObjetos.length / maxItems)
        // muestraPaginas(nPaginas)
        
    } catch (error) {
        console.log("error al cargar archivo JSON");
    }
}

//Crea una lista con los datos de los objetos y la coloca en el buscador,
// si el input que recibe coincide con el contenido de la lista, esta se añade,
// las lista que NO coincidan con el input no se mostraran
function muestraDropdown(datos, input) {
    // console.log(input)
    // console.log(datos)
    
    
    while (listaObjetos.firstChild) {
        listaObjetos.removeChild(listaObjetos.firstChild);
    }

    datos.forEach(objeto => {
        const li = document.createElement("li")
        // li.innerHTML = `<p class="d-flex"><a class="dropdown-item" href="detalles.html" data-id="${objeto.id}">${objeto.nombre}</a></p>`    
        li.innerHTML = `<a class="dropdown-item" href="detalles.html">
                            <div class="container d-flex" data-id="${objeto.id}" style="margin-top: -10px;">
                            <p class="d-flex mt-3" >${objeto.nombre}
                                <div class="container mt-2 d-flex flex-column" data-id="${objeto.id}">
                                    <p class="m-0 align-self-end">${objeto.categoria}</p>
                                    <hr style="margin: 0px ;">
                                    <p class="m-0 align-self-end">${objeto.coleccion}</p>
                                </div>
                            </div>
                            </a>`
        listaObjetos.append(li)
    })

    const arrayLi = Array.from(listaObjetos.childNodes)
    // console.log(arrayLi)
    arrayLi.forEach(linea => {
        const contenido = linea.textContent.toLowerCase();
        if (contenido.includes(input)) {
            // console.log("dentro")
            linea.hidden = false
        }
        else {
            linea.hidden = true;
        }
    })
    
    
}

listaObjetos.addEventListener('click',(e) => {
    console.log(e.target.parentNode)
    if(e.target.parentNode.dataset.id) {//Si el click se realiza sobre el texto
        const objeto = {
            id: e.target.parentNode.dataset.id
        }
        guardaDetalles(objeto)
        // window.location.reload();
    }
    if (e.target.dataset.id) {//Si el click se realiza sobre
        const objeto = {
            id: e.target.dataset.id
        }
        guardaDetalles(objeto)
    }
})

function guardaDetalles(id) {
    localStorage.setItem("detalles", JSON.stringify(id));
    
}