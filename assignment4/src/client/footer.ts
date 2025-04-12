
export function Footer(){
    // Create a dynamic footer that has the terms of service and privacy policy links and add it to the document
    let DocumentBody = document.body;
    let footer = document.createElement("footer");
    footer.setAttribute("class", "bg-dark text-center py-3");

    let footer1:string = `<a class="text-secondary" href="../views/content/privacypolicy.html">Privacy Policy</a><br>`;
    let footer2:string = `<a class="text-secondary" href="../views/content/termsofservice.html">Terms of Service</a>`;
    footer.innerHTML = footer1
    footer.innerHTML += footer2
    DocumentBody.appendChild(footer);
}
