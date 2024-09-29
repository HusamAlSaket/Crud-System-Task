let editingDeviceIndex = null;

function addUser() {
    const name = document.getElementById("Name").value;
    const age = document.getElementById("Age").value;
    const address = document.getElementById("Address").value;
    const email = document.getElementById("Email").value;

    const newDevice = { name, age, address, email };
    let devices = JSON.parse(localStorage.getItem("devices")) || [];
    if (editingDeviceIndex !== null) {
        devices[editingDeviceIndex] = newDevice;
        editingDeviceIndex = null; 
    } else {
        devices.push(newDevice);
    }
    localStorage.setItem("devices", JSON.stringify(devices));
    renderTable();
    document.getElementById("Name").value = '';
    document.getElementById("Age").value = '';
    document.getElementById("Address").value = '';
    document.getElementById("Email").value = '';
}

function renderTable() {
    let devices = JSON.parse(localStorage.getItem("devices")) || [];
    const tableBody = document.getElementById("table-item");
    tableBody.innerHTML = "";

    devices.forEach((device, index) => {
        const newRow = `
        <tr>
            <td>${device.name}</td>
            <td>${device.age}</td>
            <td>${device.address}</td>
            <td>${device.email}</td>
            <td><button type="button" class="btn btn-primary edit-btn">Edit</button>
                <button type="button" class="btn btn-danger delete-btn">Delete</button></td>
        </tr>
        `;
        tableBody.innerHTML += newRow;
    });
}

window.onload = function() {
    renderTable();
}

document.getElementById("addData").addEventListener("click", addUser);

document.getElementById("table-item").addEventListener("click", function(event) {
    let devices = JSON.parse(localStorage.getItem("devices")) || [];

    if (event.target.classList.contains("edit-btn")) {
        
        const row = event.target.closest("tr");
        const name = row.cells[0].innerText;
        const age = row.cells[1].innerText;
        const address = row.cells[2].innerText;
        const email = row.cells[3].innerText;

        document.getElementById("Name").value = name;
        document.getElementById("Age").value = age;
        document.getElementById("Address").value = address;
        document.getElementById("Email").value = email;

        editingDeviceIndex = devices.findIndex(device =>
            device.name === name &&
            device.age === age &&
            device.address === address &&
            device.email === email
        );

    } else if (event.target.classList.contains("delete-btn")) {

        const row = event.target.closest("tr");
        const name = row.cells[0].innerText;
        const age = row.cells[1].innerText;
        const address = row.cells[2].innerText;
        const email = row.cells[3].innerText;

        devices = devices.filter(device =>
            device.name !== name ||
            device.age !== age ||
            device.address !== address ||
            device.email !== email
        );

        localStorage.setItem("devices", JSON.stringify(devices));

        renderTable();
    }
});
