document.addEventListener("DOMContentLoaded", function() {
  let form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    axios
      .post(this.action, formData)
      .then(response => {
        if (response.status === 200 && response.data.success) {
          const tweet = response.data.tweet;
          const tweets = document.querySelector(".tweets");
          const time = document.createElement("time");
          time.textContent = new Date(tweet.created_at).toLocaleString(
            "en-US",
            {
              minute: "numeric",
              hour12: true,
              hour: "numeric",
              day: "numeric",
              month: "short",
              year: "numeric"
            }
          );
          const element = document.createElement("p");
          element.textContent = tweet.message;
          const li = document.createElement("li");
          li.classList.add("tweet");
          li.appendChild(time);
          li.appendChild(element);
          tweets.appendChild(li);
          li.scrollIntoView();
          document.querySelector("textarea").value = "";
        } else {
          alert("Error Occured...");
          console.log(response);
        }
      })
      .catch(error => {
        alert("Error Occured...");
        console.log(error);
      });
  });
});
