document.getElementById("sign-up-btn").addEventListener("click", async () => {
    const newUsername = document.getElementById("newUsername").value
    const newPassword = document.getElementById("newPassword").value
    const email = document.getElementById("email").value
    const firstName = document.getElementById("first-name").value
    const lastName = document.getElementById("last-name").value
    // following schema syntax
    const requestBody = {
        first_name: firstName,
        last_name: lastName,
        username: newUsername,
        user_email: email,
        password: newPassword,
    }
    console.log(requestBody)
    const response = await fetch('/api/users', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        document.location.replace('/');
    } else {
        console.log('Error Signing up!')
    }
})

const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log('Hi');
    // Collect values from the login form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/');
        } else {
            const json = await response.json()
            console.log(json)
            alert(json.err);
        }
    }
};
document.getElementById('login-btn').addEventListener('click', loginFormHandler);