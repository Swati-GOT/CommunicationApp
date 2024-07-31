const validateUser =()=> {
    console.log("function called")
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });
    console.log(user)
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "loginSuccess.html";
    } else {
        alert("Invalid email or password");
    }
}


const loadData=()=> {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    const user = users.find((user) => user.id == id);
    if (user) {
        document.getElementById("fullname").value = user.fullname;
        document.getElementById("email").value = user.email;
    } else {
        alert("User not found");
        window.location.href = "userList.html";
    }
}

const isLoggedIn=()=> {
    const user = localStorage.getItem("user");
    if (!user) {
        alert("Please login first");
        window.location.href = "../login.html";
        return;
    }
    return true;
}

const loadUserList =()=> {
    const user = localStorage.getItem("user");
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }
    document.getElementById('content').innerHTML = '<object type="text/html" data="./user/userList.html" style="width:100%; height:100vh"></object>';
}

const loadDocumentList =()=> {
    const user = localStorage.getItem("user");
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }
    document.getElementById('content').innerHTML = '<object type="text/html" data="./upload/uploadList.html" style="width:100%; height:100vh"></object>';
}

const loadChatList =() =>{
    const user = localStorage.getItem("user");
    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }
    document.getElementById('content').innerHTML = '<object type="text/html" data="./chat/chat.html" style="width:100%; height:100vh"></object>';
}

const logout =()=> {
    localStorage.removeItem("user");
    window.location.href = "logout.html";
}
