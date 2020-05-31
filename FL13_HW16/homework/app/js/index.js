const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

appContainer.innerHTML = `
<h1>Manage User App</h1>
<div>
<input name='name' id='name' placeholder='Name Surname'>
<input name='username' id='username' placeholder='Username'>
<button id='add' onclick='addUser()'>Add New User</button>
<div id='updateMessage' class='hidden'>Loading....</div>
</div>
<table id='user-list'></table>
`;

const table = document.getElementById('user-list');
const addBtn = document.getElementById('add');
const updateMessage = document.getElementById('updateMessage');
const addName = document.getElementById('name');
const addUsername = document.getElementById('username');

const SC_OK = 200;
const SC_CREATED = 201;
const SC_NO_CONTENT = 204;
const expectedStatusCode = new Map([
    ['GET', SC_OK],
    ['POST', SC_CREATED],
    ['PUT', SC_NO_CONTENT],
    ['DELETE', SC_NO_CONTENT]]);
const AUTHORIZATION_HEADER = ['Authorization', 'admin'];

// encapsulate boilerplate for XMLHttpRequest
const sendHttpRequest =
    (urlTail, method = 'GET', data = null) =>
        new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, baseUrl + urlTail);
                xhr.responseType = 'json';
                if (method === 'DELETE') {
                    xhr.setRequestHeader(...AUTHORIZATION_HEADER);
                }
                if (data) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
                xhr.onload = () => {
                    if (xhr.status !== expectedStatusCode.get(method)) {
                        reject(xhr.response);
                    } else {
                        resolve(xhr.response);
                    }
                };
                xhr.onerror = () => {
                    reject('Something went wrong!');
                };
                xhr.send(JSON.stringify(data));
            });

let loading = 0;

function showStartUpdating(...elements) {
    ++loading;
    updateMessage.classList.remove('hidden');
    for (let element of elements) {
        element.style.pointerEvents = 'none';
        element.style.filter = 'blur(5px)';
    }
}

function showEndUpdating(...elements) {
    for (let element of elements) {
        element.style.pointerEvents = 'auto';
        element.style.filter = 'none';
    }
    if (--loading === 0) {
        updateMessage.classList.add('hidden');
    }
}

function fetchTableData() {
    showStartUpdating(table);
    sendHttpRequest('/users')
        .then(fillTable)
        .catch(console.error)
        .finally(() => {
            showEndUpdating(table);
        });
}

function fillTable(listOfUsers) {
    const LAST = -1;
    table.innerHTML = '';
    for (let user of listOfUsers) {
        let row = table.insertRow(LAST);
        row.setAttribute('id', 'row-' + user.id);
        row.insertCell(LAST).innerHTML = user.id;
        row.insertCell(LAST).innerHTML = `<input id='name-${user.id}' value='${user.name}'>`;
        row.insertCell(LAST).innerHTML = `<input id='username-${user.id}' value='${user.username}'>`;
        row.insertCell(LAST).innerHTML = `<button onclick='updateUser("${user.id}")'>Update</button>`;
        row.insertCell(LAST).innerHTML = `<button onclick='deleteUser("${user.id}")'>Delete</button>`;
    }
}

function updateUser(userId) {
    const row = document.getElementById('row-' + userId);
    const nameInput = document.getElementById('name-' + userId);
    const usernameInput = document.getElementById('username-' + userId);
    if (!nameInput.value || !usernameInput.value) {
        alert('Please don\'t leave the fields blank');
        return;
    }
    showStartUpdating(row, nameInput, usernameInput, ...row.querySelectorAll('button'));
    sendHttpRequest('/users/' + userId, 'PUT',
        {name: nameInput.value, username: usernameInput.value}
    ).then(fetchTableData)
        .catch(console.error)
        .finally(() => {
            showEndUpdating(row, nameInput, usernameInput, ...row.querySelectorAll('button'));
        });
}

function addUser() {
    if (!addName.value || !addUsername.value) {
        alert('Please don\'t leave the fields blank');
        return;
    }
    showStartUpdating(addBtn, addName, addUsername);
    sendHttpRequest('/users', 'POST',
        {name: addName.value, username: addUsername.value}
    ).then(fetchTableData)
        .catch(console.error)
        .finally(() => {
            addUsername.value = '';
            addName.value = '';
            showEndUpdating(addBtn, addName, addUsername);
        });
}

function deleteUser(userId) {
    const row = document.getElementById('row-' + userId);
    showStartUpdating(row, ...row.querySelectorAll('button'));
    sendHttpRequest('/users/' + userId, 'DELETE').then(fetchTableData)
        .catch(console.error)
        .finally(() => {
            showEndUpdating(row, ...row.querySelectorAll('button'));
        });
}

fetchTableData();
