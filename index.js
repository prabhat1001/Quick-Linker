document.addEventListener("DOMContentLoaded", function () {
    const linkForm = document.querySelector(".link-form");
    const titleInput = document.getElementById("title");
    const urlInput = document.getElementById("url");
    const linkList = document.getElementById("link-list");
  
    function displayLinks() {
      linkList.innerHTML = "";
  
      const storedLinks = JSON.parse(localStorage.getItem("links")) || [];
  
      storedLinks.forEach(function (link, index) {
        const listItem = document.createElement("li");
  
        const linkElement = document.createElement("a");
        linkElement.classList.add("link");
        linkElement.href = link.url;
        linkElement.textContent = link.title;
        linkElement.target = "_blank";
        listItem.appendChild(linkElement);
  
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.classList.add("copy-btn");
        copyButton.addEventListener("click", function () {
          const textArea = document.createElement("textarea");
          textArea.value = link.url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
  
          alert("Link copied to clipboard!");
        });
        listItem.appendChild(copyButton);
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");
        removeButton.addEventListener("click", function () {
          storedLinks.splice(index, 1);
          localStorage.setItem("links", JSON.stringify(storedLinks));
          displayLinks();
        });
        listItem.appendChild(removeButton);
  
        linkList.appendChild(listItem);
      });
    }
  
    displayLinks();
  
    linkForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const title = titleInput.value.trim();
      const url = urlInput.value.trim();
  
      if (title !== "" && url !== "") {
        const newLink = {
          title: title,
          url: url
        };
  
        const storedLinks = JSON.parse(localStorage.getItem("links")) || [];
        storedLinks.push(newLink);
        localStorage.setItem("links", JSON.stringify(storedLinks));
  
        titleInput.value = "";
        urlInput.value = "";
  
        displayLinks();
      }
    });
  });
  