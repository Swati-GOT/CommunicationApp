
const  deleteUpload = (id)=> {
    if (confirm("Are you sure you want to delete this file?")) {
        const uploads = JSON.parse(localStorage.getItem("uploads"));
        const newUploads = uploads.filter(item => item.id != id);
        localStorage.setItem("uploads", JSON.stringify(newUploads));
        window.location.href = "../upload/uploadList.html";
    }
}
const uploadFile = ()=> {
    const label = document.getElementById("fileDesc").value;
    const fileName = document.getElementById("fileUpload").value.split("\\").pop();

    if (label == "" || fileName == "") {
        alert("Please fill all fields");
        return false;
    }

    const uploads = localStorage.getItem("uploads") ? JSON.parse(localStorage.getItem("uploads")) : [];

    const isFileExist = uploads.some((item) => item.fileName === fileName && item.id != upload.id);
    if (isFileExist) {
        alert("File already exists");
        return false;
    }

    const upload = {
        id: Number(new Date()),
        label: label,
        fileName: fileName
    }

    uploads.push(upload);
    localStorage.setItem("uploads", JSON.stringify(uploads));

    $('#uploadModal').modal('hide');
    reloadTable()
}

const reloadTable =()=> {
    const isUserLoggedIn = isLoggedIn();
    if (!isUserLoggedIn) return;
    let uploads = JSON.parse(localStorage.getItem("uploads"));

    let htmlContent = "";
    uploads.forEach(({ fileName, label, id }) => {
        htmlContent += `
            <tr>
                <td>${label}</td>
                <td>${fileName}</td>
                <td>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#uploadModal" onclick="editDocument(${id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteUpload(${id})">Delete</button>
                   
                </td>
            </tr>`;
    });
    document.getElementById("uploadTable").innerHTML = htmlContent;
}

const editDocument =(id)=> {
    const uploads = JSON.parse(localStorage.getItem("uploads"));
    const upload = uploads.find((item) => item.id == id);
    if (upload) {
        document.getElementById("fileDesc").value = upload.label;
        document.getElementById("fileUpload").value = upload.fileName;
        $('#uploadModal').modal('show');

    }
}