document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector("#search");
  const countriesList = document.querySelector("#countries-list");

  searchInput.addEventListener("input", function() {
    const searchQuery = searchInput.value.toLowerCase();
    fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        countriesList.innerHTML = "";
        data.forEach(country => {
          const { name, capital, population, flags, languages, currencies, region } = country;
          const languagesList = Object.values(languages).map(lang => lang).join(', ');
          const currenciesList = Object.values(currencies).map(curr => `${curr.name} (${curr.code})`).join(', ');

          const countryDiv = document.createElement("div");
          countryDiv.classList.add("country");
          countryDiv.innerHTML = `
            <h2>${name.common}</h2>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${languagesList}</p>
            <p>Currencies: ${currenciesList}</p>
            <p>Region: ${region}</p>
            <img src="${flags.png}" alt="${name.common} Flag">
          `;
          countriesList.appendChild(countryDiv);
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  });
});