
const API_URL = "https://itunes.apple.com/search?term=";

let searchForm;
let resultsDiv; 
document.addEventListener("DOMContentLoaded", () => {
  searchForm = document.querySelector("#search-form");
  resultsDiv = document.querySelector("#results");
  reset();
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.querySelector(".searchp").value;
    if (!query) return;
    const maxDuration = document.querySelector("#max-duration-input").value;
    const explicitness = document.querySelector("#explicit-input").value;
    resultsDiv.innerHTML = "Processing...";
    search(query, maxDuration, explicitness);
  });
});



function search(query, maxDuration, explicitness) {
  let url =
    API_URL + encodeURIComponent(query.replaceAll(" ", "+")) + "&limit=200";
  //   if (maxDuration) {
  //     url += "&attribute=duration&maxDuration=${maxDuration}";
  //   }
  //   if (explicitness) {
  //     url += "&explicit=${explicitness}";
  //   }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data || !data.results || data.results.length === 0) {
        resultsDiv.innerHTML = "No results found.";
        return;
      }

      let results = data.results;
      if (maxDuration) {
        results = results.filter(
          (result) => result.trackTimeMillis <= maxDuration * 60 * 1000
        );
      }
      //explicitness = explicitness == 'all' ? '' : explicitness;
      if (explicitness) {
        results = results.filter(
          (result) => result.trackExplicitness === explicitness
        );
      }

      results = results.slice(0, 10);

      resultsDiv.innerHTML = "";
      resultsDiv.classList.add("results");

      results.forEach((result) => {
        const { trackName, artistName, artworkUrl100, previewUrl } = result;
        const div = document.createElement("div");
        div.classList.add("result");
        const img = document.createElement("img");

        img.src = artworkUrl100;
        img.alt = `${trackName} by ${artistName}`;
        const title = document.createElement("h2");
        title.textContent = trackName;
        const artist = document.createElement("p");
        artist.textContent = artistName;
        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(artist);
        if (previewUrl) {
          const audio = document.createElement("audio");
          const source = document.createElement("source");
          source.src = previewUrl;
          source.type = "audio/mp3";
          audio.controls = true;
          audio.appendChild(source);
          div.appendChild(audio);
        }
        resultsDiv.appendChild(div);
      });
    })
    .catch((error) => {
      console.error(error);
      resultsDiv.innerHTML = "An error occurred.";
    });
}

function reset() {
  let searchEl = document.querySelector(".searchp");
  if (searchEl) {
    searchEl.value = '';
  }
  let maxDuration = document.querySelector("#max-duration-input");
  if (maxDuration) {
    maxDuration.value = '';
  }
  let explicitness = document.querySelector("#explicit-input");
  if (explicitness) {
    explicitness.value = '';
  }
}


