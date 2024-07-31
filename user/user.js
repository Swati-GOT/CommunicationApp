
const registerUser =()=> {
    const fullname = document.getElementById("fullname").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return false;
    }
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (fullname == "" || password == "" || email == "" || confirmPassword == "") {
        alert("Please fill all fields");
        return false;
    } else if (password != confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

    const isUserExist = users.some((user) => user.email === email);
    if (isUserExist) {
        alert("User already exists");
        return false;
    }

    const user = {
        id: Number(new Date()),
        fullname: fullname,
        email: email,
        password: password
    }
    console.log(user)
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "registerSuccess.html";
    } else {
        alert("Invalid email or password");
    }

    return true;
}

const updateUser=() =>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    console.log(id)
    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    const user = users.find((user) => user.id == id);

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;

    if (fullname == "" || email == "") {
        alert("Please fill all fields");
        return false;
    } else {
        user.fullname = fullname;
        user.email = email;

        let newUsers = users.map(item => {
            if (item.id == id) {
                return user
            } else {
                return item
            }
        })

        console.log(newUsers)
        localStorage.setItem("users", JSON.stringify(newUsers));
        window.location.href = "userList.html";
    }
}


const deleteUser =(id) =>{

    if (confirm("Are you sure you want to delete this user?")) {
        let users = JSON.parse(localStorage.getItem("users"));
        let newUsers = users.filter(user => user.id != id);
        localStorage.setItem("users", JSON.stringify(newUsers));
        window.location.href = "userList.html";
    }

}