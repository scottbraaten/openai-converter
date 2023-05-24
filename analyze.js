console.log("here");

const url = window.location.href;

// chrome.runtime.sendMessage({
//   from: "analyze",
//   subject: "provideText",
// });

savedHTML = document.body.innerHTML;
addedElement = document.createElement("h1");
addedElement.setAttribute("id", "extensionOpenAI");
addedElement.style.position = "fixed";
addedElement.style.left = "500px";
addedElement.style.top = "200px";

document.body.appendChild(addedElement);

async function process() {
  try {
    console.log("a");
    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }
    console.log(data);
    document.getElementById("extensionOpenAI").innerText = data.result;
  } catch (error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}

process();
