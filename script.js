const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const Pronunciation = document.getElementById("Pronunciation");
const meaningEl = document.getElementById("meaning");
const example = document.getElementById("example");
const audioEl = document.getElementById("audio");
const meaningList = document.querySelector(".meaningList");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    console.log(result);

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "Not Available";
      example.innerText = "Not Available";
      Pronunciation.innerText = "Not Available";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      Pronunciation.innerText = result[0].phonetic;
      const meaningElement = result[0].meanings[0].definitions;
      console.log(meaningElement);

      const lisOfMeaning = [];
      for (var i of meaningElement) {
        const allMeans = i.definition;
        lisOfMeaning.push(allMeans);
        console.log(allMeans);
      }
      console.log(lisOfMeaning);
      for (let j = 0; j < lisOfMeaning.length; j++) {
        $("#meaning ul").append(`<li>${lisOfMeaning[j]}</li>`);
      }
      example.innerText = result[0].meanings[0].definitions[0].example;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `an error happened, try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
    console.log(e.target.value);
  }
});
