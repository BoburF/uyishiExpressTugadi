const card_price = document.querySelectorAll('.card_price');
const price = document.querySelector('.total');

function toCurrency(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'rub'
    }).format(price)
}

card_price.forEach(e => {
    e.innerHTML = toCurrency(e.innerHTML)
})

price.innerHTML = toCurrency(price.innerHTML)

const cardBox = document.querySelector('#cards');

cardBox.addEventListener('click', (e) => {
    const contains = e.target.classList.contains('remove-btn')
    
    if (contains) {
        // button bor bo'sa bo'tga kiradi 
        const id = e.target.getAttribute('id')
        

        fetch('/products/delete/' + id, {
            method: "delete",
        }).then(res => res.json())
            .then(card => {
                if (card.favorit.length > 0) {
                    const htmla = card.favorit.map(book => {
                        return `
                        <div class="col s12 m3">
                            <div class="card">
                                <div class="card-image">
                                <img src=${book.img} />
                                <span class="card-title">${book.name}</span>
                                </div>
                                <div class="card-content">
                                <p>${toCurrency(book.price)}</p>
                                <p>${book.count}</p>
                                <p>${toCurrency(+book.price * book.count)}</p>
                                </div>
                                <div class="card-action">
                                    <button type="submit" class="btn">покупка</button>
                                <button id="${book.id}" data-id="${book.id}" class="btn remove-btn">Удалить</button>
                                </div>
                            </div>
                        </div>
                        `
                    }).join('')

                    cardBox.querySelector('.row').innerHTML = htmla
                    
                    price.innerHTML = toCurrency(card.price)

                } else {
                    cardBox.innerHTML = '<h2>Card is empty</h2>'
                }
            })
    }
})