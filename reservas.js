const reservasForm = document.getElementById("reservas");
const reservasFormSubmit = reservasForm.querySelector('button[type="submit"]');

// fetch exitoso
function postOK() {
    reservasFormSubmit.disabled = false;
    reservasForm.reset();
    alert("Formulario enviado con éxito");
}

reservasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    reservasFormSubmit.disabled = true;

    const fname = reservasForm.querySelector("#fname").value;
    const lname = reservasForm.querySelector("#lname").value;
    const email = reservasForm.querySelector("#email").value;
    const phone = reservasForm.querySelector("#phone").value;
    const message = reservasForm.querySelector("#message").value;

    const reservasJSON = {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        message: message,
    };

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify(reservasJSON),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then(() => postOK())
        .catch((e) => console.error(e));
});