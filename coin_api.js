let apiKey = {
  key: "c896f104-91e7-4344-8a78-5da6a6dfeeaa",
};

const container = document.querySelector(".container");

request(
  "GET",
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" +
    apiKey.key
)
  .then((response) => {
    // console.log(r1);
    let coinData = JSON.parse(response.target.responseText);
    // console.log(x1.data[6].symbol);
    // console.log(x1.data[6].quote.USD.price);
    // console.log(x1.data[6].quote.USD.percent_change_90d);

    const symbol = coinData.data[6].symbol;
    let price = coinData.data[6].quote.USD.price;
    let changeInPrice = coinData.data[6].quote.USD.percent_change_90d;

    container.innerHTML += `<article>
    <div class="doge">
    <h2>${symbol}</h2>
      <p>The current price is $${price} ... <strong>SUCH COOL</strong></p>
      <p>The percentage change in USD over the last 90 days is ${changeInPrice}% ... <strong>MUCH WOW</strong></p>
    </div>
  </article>
  `;
  })
  .catch();

function request(httpMethod, apiUrl) {
  return new Promise((resolve, reject) => {
    let xmlRequest = new XMLHttpRequest();
    xmlRequest.open(httpMethod, apiUrl);
    xmlRequest.onload = resolve;
    xmlRequest.onerror = reject;
    xmlRequest.send();
  });
}
