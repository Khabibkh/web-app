function buildCardsUsingDOMAPI(container, data) {
  let cardDiv = document.createElement("div");
  cardDiv.addEventListener("click", (ev) => {
    let fadeTarget = ev.currentTarget;
    let fadeEffect = setInterval(function () {
      fadeTarget.remove();
      clearTimeout(fadeEffect);
    }, 300);
    fadeTarget.style.opacity = "0";
    let cardLength =
      document.getElementById("product-list").childNodes.length - 1;
    cardLength--;
    document.getElementById("card-num").innerHTML = cardLength;
  });

  cardDiv.setAttribute("class", "product-card");
  let imgElement = document.createElement("img"); // img
  imgElement.setAttribute("src", data.thumbnailUrl); // img thumbnail
  let prodInfoDiv = document.createElement("div");
  prodInfoDiv.setAttribute("class", "prod-info");
  let titleP = document.createElement("p");
  titleP.setAttribute("class", "prod-title");
  titleP.appendChild(document.createTextNode(data.title));
  prodInfoDiv.appendChild(titleP);
  cardDiv.appendChild(imgElement);
  cardDiv.appendChild(prodInfoDiv);
  container.appendChild(cardDiv);
}

function fetchPhoto() {
  fetch("https://jsonplaceholder.typicode.com/albums/2/photos")
    .then((response) => response.json())
    .then((data) => {
      let container = document.getElementById("product-list");
      let containerFragment = document.createDocumentFragment();
      data.forEach((item) => {
        buildCardsUsingDOMAPI(containerFragment, item);
      });
      if (container !== null) {
        container.appendChild(containerFragment);
        document.getElementById("card-num").innerHTML = data.length;
      }
    });
}

fetchPhoto();
