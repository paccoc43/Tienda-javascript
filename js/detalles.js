//Obtiene los detalles del objeto seleccionado, despues llama a fetchObjetos
const cargaStorageDetalles = function () {
    const detallesJSON = localStorage.getItem("detalles");

    if (detallesJSON) {
        const objeto = JSON.parse(detallesJSON);
        idStorage = objeto.id;
        console.log("Storage cargado, Detalles id: " + idStorage);
        // console.log(id)
        fetchObjetos();
    }
    else {
        return
    }
}
//Carga los datos de objetos.json para mostrar los detalles del objeto seleccionado
const fetchObjetos = async () => {
    try {
        const resul = await fetch('./src/objetos.json');
        const datos = await resul.json();
        console.log(datos);
        const objetoSeleccionado = datos.filter(({id}) => id === +idStorage);
        console.log(objetoSeleccionado);
        muestraDetalles(objetoSeleccionado[0])
        // itemsObjetos = obtenerDatos(datos)
        // console.log(itemsObjetos)
        // muestraItems(itemsObjetos, maxItems, 0)
        // nPaginas = Math.ceil(itemsObjetos.length / maxItems)
        // muestraPaginas(nPaginas)
        
    } catch (error) {
        console.log("error al cargar archivo JSON");
    }
}

let idStorage;
cargaStorageDetalles();

//Muestra los detalles del objeto seleccionado
function muestraDetalles(objeto) {
    const div = document.createElement("div");
    const contenedorDetalles = document.getElementById("detalles");
    div.classList.add("card")
    div.classList.add("d-flex")
    div.classList.add("flex-row")
    div.innerHTML = `<img class="w-50" src="${objeto.imagenes[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="container d-flex flex-column">
                            <h5 class="card-title">${objeto.nombre} |<span class="text-success"> ${objeto.precio}€</span></h5><span class="bg-black text-secondary rounded">${objeto.coleccion}</span>
                            <p class="card-text">${objeto.descripcion}</p>
                            <a href="#" class="btn btn-primary" data-id="${objeto.id}">Comprar</a>
                            <a target="_blank" href="${objeto.imagenes[1]}" class="card-link m-5">Vista 3D</a>
                        </div>
                        <div class="container d-flex ">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <p class="card-text">Stock: ${objeto.stock}</p>
                                </li>
                                <li class="list-group-item">
                                    <p class="card-text">Categoria: ${objeto.categoria}</p>
                                </li>
                                <li class="list-group-item">
                                    <p class="card-text">Estado: ${calculaDesgaste(objeto.float)}</p>
                                </li>
                            </ul>
                        </div>
                    </div>`
    contenedorDetalles.append(div)
}

//Calcula el estado del arma
function calculaDesgaste(float) {

// 0 – 0.07 – Factory New 
// 0.07 – 0.15 – Minimal Wear 
// 0.15 – 0.38 – Field-Tested 
// 0.38 – 0.45 – Well-Worn 
// 0.45 – 1 – Battle-Scarred

    if (float >= 0 && float < 0.07) {
        return "Recien fabricado";
    } else if (float >= 0.07 && float < 0.15) {
        return "Casi nuevo";
    } else if (float >= 0.15 && float < 0.38) {
        return "Algo desgastado";
    } else if (float >= 0.38 && float < 0.45) {
        return "Bastante desgastado";
    } else if (float >= 0.45 && float <= 1) {
        return "Deplorable";
    } else {
        return "Valor no válido";
    }
    //!No funciona
    // switch(float) {
    //     case 0:
    //     case 0.07:
    //         return "Recien fabricado"
    //     case 0.07:
    //     case 0.15:
    //         return "Casi nuevo"
    //     case 0.15:
    //     case 0.38: 
    //         return "Algo desgastado"
    //     case 0.38:
    //     case 0.45:
    //         return "Bastante desgastado"
    //     case 0.45:
    //     case 1:
    //         return "Deplorable"
    // }
}