const btn = document.querySelector('.currency__btn');
btn.addEventListener('click', getData);


function getData() {
    const code = document.querySelector('.currency__currency-name').value;
    const url = `https://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;
    fetch(url)
        .then(res => {
            if (res.status !== 200) {
                return console.log(`Coś poszlo nie tak! Sprawdź wpisany url. Kod błedu: ${res.status}`);
            } else {
                return res.json();
            }
        })
        .then(currency => {
            const result = document.querySelector('.result');
            result.innerText = '';
            const div = document.createElement('div');
            div.classList.add('result__currency')
            const message = `Średnia cena waluty: "${currency.currency}" w dniu ${currency.rates[0].effectiveDate} wynosi ${currency.rates[0].mid} złotego.`;
            div.innerHTML = `<h2>Dzisiejszy kurs:</h2><p>${message}</p>`;
            result.appendChild(div);
        })
        .catch(err => console.log('Wystąpił błąd', err));
}
