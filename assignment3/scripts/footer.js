/*export function LoadFooter() {
    return fetch("views/components/footer.html")
        .then(response => response.text())
        .then( html => {
            document.querySelector("#footer").innerHTML = html;
        })
        .catch(error => console.error("[Error] Failed to load footer: ", error));
}*/
export function Footer(){
    // Create a dynamic footer that has the terms of service and privacy policy page and it to the document
    let DocumentBody = document.body;
    let footer = document.createElement("footer");
    footer.setAttribute("class", "bg-dark text-center py-3");


    let footer1= `<a class="text-secondary" href="../views/content/privacypolicy.html">Privacy Policy</a><br>`;
    let footer2= `<a class="text-secondary" href="../views/content/termsofservice.html">Terms of Service</a>`;
    footer.innerHTML = footer1
    footer.innerHTML += footer2
    DocumentBody.appendChild(footer);
}
