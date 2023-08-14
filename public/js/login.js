const username = document.getElementById("username")
const password = document.getElementById("password")
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
    const response = await fetch('/api/users', {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
    })
    if(response.ok){ 
        document.location.replace('/');
    }else {
        console.log('Error Signing up! ')
    }
})
