//récupérer les paramètres dans l'url
const urlParams = new URL(location.href);
const id = urlParams.searchParams.get("id");

//Appel a l'API avec "id" en paramètre de function
fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    //Appel des options produits (qty/img/name/description)

    document.getElementById("title").innerHTML = data.name;
    document.getElementById("price").innerHTML = data.price;
    document.getElementById("description").innerHTML = data.description;
    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    let colorsS = document.getElementById("colors");
    for (let color of data.colors) {
      console.log(color);
      let addOption = document.createElement("option");
      addOption.text = color;
      addOption.value = color;
      colorsS.add(addOption);
    }
  })
  //permet de retourner une error dans la console si une réponse provoque une exception
  .catch((err) => console.log(err));

//Écoute les évènements sur la soumission du panier + enregistrement dans le localStorage
let button = document.querySelector("#addToCart");

function addToCart(id, color, qty, price) {
  let cart = {
    id: id,
    color: color,
    qty: qty,
    price: price,
  };

  let currentCart = JSON.parse(localStorage.getItem("products"));
  let isNewProduct = true;

  if (currentCart && currentCart.length > 0) {
    for (let i of currentCart) {
      if (i.id === cart.id && i.color === cart.color) {
        i.qty = parseInt(i.qty) + parseInt(cart.qty);
        isNewProduct = false;
      }
    }
    if (isNewProduct) {
      currentCart.push(cart);
    }

    localStorage.setItem("products", JSON.stringify(currentCart));
  } else {
    let newCart = [];
    newCart.push(cart);
    localStorage.setItem("products", JSON.stringify(newCart));
  }
}
//Ajout au panier du choix client
button.addEventListener("click", function () {
  let color = document.getElementById("colors");
  let qty = document.getElementById("quantity");
  let price = document.getElementById("price");
  addToCart(
    id,
    color.options[color.selectedIndex].value,
    qty.value,
    price.innerText
  );
});
