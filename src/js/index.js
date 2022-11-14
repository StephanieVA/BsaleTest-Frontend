
//LISTAR TODOS LOS PRODUCTOS
const sectionProduct = document.querySelector(".section-product")
function listarProductos() {
    fetch('https://bsaletest-production-c296.up.railway.app/api/product')
    .then((response) => response.json())
    .then((rows) => {
        rows.forEach(rows =>{cargarProductos(rows);})
    })
}
listarProductos();
function cargarProductos(rows){
        const cardProduct = document.createElement("div")
        cardProduct.classList.add("card-product")
        sectionProduct.appendChild(cardProduct)

        const descuent = document.createElement("p")
        if(rows.discount != 0){
            descuent.classList.add("descuent")
            descuent.innerHTML = "-"+rows.discount + "%"
        }
        const cardProducContent = document.createElement("div")
        cardProducContent.classList.add("card-product-content")
        cardProduct.appendChild(descuent)
        cardProduct.appendChild(cardProducContent)

        const cardImg = document.createElement("img")
        cardImg.src = rows.url_image
        cardImg.classList.add("card-img")

        const cardPrice = document.createElement("div")
        cardPrice.classList.add("card-price")
        const cardPriceDisc = document.createElement("span")
        if(rows.discount!=0){
            cardPriceDisc.innerHTML = '$ '+rows.price
        }
        cardPriceDisc.classList.add("price-discount")
        const cardPriceTotal = document.createElement("span")
        cardPriceTotal.innerHTML = '$ '+(rows.price - (rows.discount * rows.price / 100))
        cardPriceTotal.classList.add("price-total")
        cardPrice.appendChild(cardPriceDisc)
        cardPrice.appendChild(cardPriceTotal)
        cardProducContent.appendChild(cardPrice)
        cardProducContent.appendChild(cardImg)

        const cardProducDescription = document.createElement("div")
        cardProducDescription.classList.add("card-product-description")
        cardProduct.appendChild(cardProducDescription)

        const cardName = document.createElement("p")
        cardName.innerHTML = rows.name
        const cardButton = document.createElement("button")
        cardButton.classList.add("btn-submit")
        cardButton.innerHTML= "<i class='bi bi-cart4'></i>"
        cardProducDescription.appendChild(cardName)
        cardProducDescription.appendChild(cardButton)
        
}

//LISTAR CATEGORIAS
const sectionNavMenu = document.querySelector(".nav-menu")
fetch('https://bsaletest-production-c296.up.railway.app/api/category')
    .then((response) =>response.json())
    .then((datos => {
    datos.forEach(informacion => {
        const navItem = document.createElement("li")
        sectionNavMenu.appendChild(navItem)
        navItem.classList.add("nav-item")

        var navEnlace = document.createElement("a")
        navEnlace.innerHTML = informacion.name.toUpperCase()
        navEnlace.setAttribute("id", informacion.id);
        navEnlace.classList.add("nav-enlace")
        navItem.appendChild(navEnlace)
    })
    // let elementos = document.getElementsByTagName("a");
    const elementos = document.querySelectorAll(".nav-enlace")
    console.log(elementos.length);

    // elementos.addEventListener("click", elements=>{
    //     alert("hiciste click")
    // })

    for(var i = 0; i<elementos.length;i++){
        elementos[i].addEventListener('click', (e) => {  
          console.log('Item numero ' + Array.from(elementos).indexOf(e.target) + ' del array');
          const puntero = Array.from(elementos).indexOf(e.target) + 1;
          console.log(puntero);
            consultarCategoria(puntero)
        });
      }
}))

//BUSCAR PRODUCTO
function consultProdcut(textSearch){
  if(textSearch != ""){
    while(sectionProduct.firstChild){
        sectionProduct.removeChild(sectionProduct.firstChild)}

        fetch('https://bsaletest-production-c296.up.railway.app/api/productName/'+textSearch)
        .then((res) => res.json())
        .then((data) => {
            data.forEach(data =>{
                console.log("datos: ",data)
                cargarProductos(data);
            })
        })
    
  }else if(textSearch == "" || textSearch == null){
    while(sectionProduct.firstChild){
        sectionProduct.removeChild(sectionProduct.firstChild)}
    listarProductos();
  }
}

// LISTAR POR CATEGORIAS
function consultarCategoria(id){

    while(sectionProduct.firstChild){
        sectionProduct.removeChild(sectionProduct.firstChild)}
    fetch('https://bsaletest-production-c296.up.railway.app/api/productCat/'+id)
    .then((res) => res.json())
        .then((data) => {
            data.forEach(data =>{
                console.log("productos: ",data)
                cargarProductos(data);
            })
        })

    alert("hiciste click " + id)
}

//HACER CLICK AL LOGO, MOSTRAR TODOS LOS PRODUCTOS
const logo = document.getElementById("logo")

logo.addEventListener("click", () =>{
    while(sectionProduct.firstChild){
        sectionProduct.removeChild(sectionProduct.firstChild)}
    listarProductos();
})