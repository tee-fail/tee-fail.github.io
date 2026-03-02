{
    const source_text = "<p>Nice teapot!<br>Did you know your teapot is also a secure NFC tag? You can authenticate your teapot by scanning it with your phone!</p>";

    const params = new URLSearchParams(window.location.search);
    const a = params.get("a");
    const b = params.get("b");
    const teapot = params.has("teapot");

    const overlay = document.querySelector(".overlay");
    const positioner = document.querySelector(".positioner");
    const box = document.querySelector(".alertBox");
    const text = document.querySelector(".alertText");
    const dismiss = document.querySelector(".dismiss");

    function clear() {
        overlay.classList.add("nodisplay");
        positioner.classList.add("nodisplay");
    };
    dismiss.addEventListener("click", clear);
    overlay.addEventListener("click", clear);

    function display(msg, status) {
        box.classList.add(status);
        dismiss.classList.add(status);
        
        text.innerHTML = msg;

        overlay.classList.remove("nodisplay");
        positioner.classList.remove("nodisplay");
    }

    if(teapot) {
        display(source_text, "info");
    }

    if(a && b) {
        fetch(`https://tees.architecture.fail/check?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`).then((res) => res.json()).then((data) => {
            display(data.message, data.status);
        });
    }
}
