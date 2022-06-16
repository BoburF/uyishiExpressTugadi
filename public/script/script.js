const card_price = document.querySelectorAll(".card_price");
const price = document.querySelector(".total");

function toCurrency(price) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "rub",
  }).format(price);
}

card_price.forEach((e) => {
  e.innerHTML = toCurrency(e.innerHTML);
});

price.innerHTML = toCurrency(price.innerHTML);

const cardBox = document.querySelector("#cards");
const count = document.querySelector(".count_fav");

cardBox.addEventListener("click", (e) => {
  const contains = e.target.classList.contains("remove-btn");

  if (contains) {
    // button bor bo'sa bo'tga kiradi
    const id = e.target.getAttribute("id");

    fetch("/products/delete/" + id, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((card) => {
        count.innerHTML = card.count;

        if (card.favorit.length > 0) {
          const htmla = card.favorit
            .map((book) => {
              return `
                        <div class="col s12 m3">
                            <div class="card">
                                <div class="card-image">
                                <img src=${book.img} />
                                </div>
                                <div class="card-content">
                                <span class="card-title">${book.name}</span>
                                <p>${toCurrency(book.price)}</p>
                                <p>${book.count}</p>
                                </div>
                                <div class="card-action">
                                <form action="/products/delivery/${id}" method="post">
                                <input type="hidden" name="id" value="${id}" >
                                    <button type="submit" class="btn_dl btn">Delivery</button>
                                </form>
                                <button id="${book.id}" data-id="${book.id}" class="btn remove-btn">Удалить</button>
                                </div>
                            </div>
                        </div>
                        `;
            })
            .join("");

          count.innerHTML = card.count;
          cardBox.querySelector(".row").innerHTML = htmla;

          price.innerHTML = toCurrency(card.price);
        } else {
          cardBox.innerHTML = "<h2>Card is empty</h2>";
        }
      });
  }
});
