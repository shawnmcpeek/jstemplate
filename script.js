const infiniteScroll = () => {
  let fetchingData = false; // Flag to prevent multiple fetches

  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if the user has scrolled to the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 5 && !fetchingData) {
      fetchingData = true; // Set flag to true to prevent multiple fetches

      fetch("./faq.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((json) => {
          // Display one question and answer from the JSON
          const question = json[0].question;
          const answer = json[0].answer;
          const contentContainer = document.querySelector(".content");
          const qaContainer = document.createElement("div");
          qaContainer.classList.add("question-answer");
          qaContainer.innerHTML = `
                          <h2>${question}</h2>
                          <p>${answer}</p>
                      `;
          contentContainer.appendChild(qaContainer);

          fetchingData = false; // Reset flag after successful fetch
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          fetchingData = false; // Reset flag on error
        });
    }
  });
};
