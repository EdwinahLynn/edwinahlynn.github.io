"use strict";

export function LoadFooter() {
    return fetch("views/components/footer.html")
        .then(response => response.text())
        .then( html => {
          document.querySelector("#footer").innerHTML = html;
        })
        .catch(error => console.error("[Error] Failed to load footer: ", error));
}