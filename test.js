async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const allUsers = await response.json()
    console.log(allUsers);
    let userInfo = ''
    allUsers.forEach(user => {
        let userBody = createUserBody(user)
        console.log(userBody);
        userInfo += userBody
    })
    
    return userInfo
    
}

async function renderUsers() {
    const usersMarkup = await getUsers()
    createUserTable(usersMarkup)
}

function renderUsers() {
    getUsers().then((userInfo) => {
        createUserTable(userInfo)
    })  
}





function sortTable() {
    let table = document.querySelector("#myTable");
    let switching = true;

    while (switching) {
        switching = false;
        let rows = table.querySelectorAll("tr");
        let shouldSwitch = false;

        for (i = 1; i < rows.length; i++) {
            let x = rows[i].querySelectorAll("td")[1];
            let y = rows[i + 1].querySelectorAll("td")[1];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}



// async function renderUsers() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users')
//     const usersResponse = await response.json()
//     let allUsers = usersResponse.reduce((container, currentObj) => {
//         let userBody = createUserBody(currentObj)
//         return container += userBody
//     }, '')

//     createUserTable(allUsers)
// }



//------------------------------------------------------------------------------------------- post

// function createPostBody(id, postTitle, postBody) {
//     return  `
//         <tr>
//             <td class="user_id">${id}</td>
//             <td>${postTitle}</td>
//             <td>${postBody}</td>
//         </tr>
//     `
// }

let informationBlock = document.querySelector('.information')


function createPostTable(bodyHtml) {
    let wrapper = `
            <table class="posts table mx-auto remove" id="myTable">
                <thead class="posts_header table-header">
                    <tr>
                        <th class="text-nowrap" scope="col">
                            <span class="sortby-id">
                                id<i class="bi bi-chevron-double-up"></i>
                            </span>
                        </th>
                        <th scope="col">Title</th>
                        <th scope="col">Comment</th>
                    </tr>
                </thead>
                <tbody class="users_body tbody">
                    ${bodyHtml}
                </tbody>
            </table>
    `
    informationBlock.insertAdjacentHTML('afterbegin',wrapper)
}

function createPostBody(post) {
    return  `
        <tr>
            <td class="user_id">${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
        </tr>
    `
}

let data = []

async function renderPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    data = await response.json()
    render()

    let sortBtn = document.querySelector('.sortby-id')
    sortBtn.addEventListener('click', sortTable)
}

function render() {
    let allPosts = data.reduce((container, currentObj) => {
        console.log(currentObj);
        let userBody = createPostBody(currentObj)
        return container += userBody
    }, '')

    console.log(allPosts);

    createPostTable(allPosts)
}





function sortTable() {
    let tableBody = document.querySelector('tbody')
    let rows = tableBody.querySelectorAll('tr')
    let arrow = document.querySelector('.bi')
    let rowsId = []
    rows.forEach(row => {
        rowsId.push(Number(row.querySelector('.user_id').textContent))
    })

    if (arrow.classList.contains('bi-chevron-double-up')) {
        rowsId.sort((a, b) => b - a)
        arrow.classList.remove('bi-chevron-double-up')
        arrow.classList.add('bi-chevron-double-down')
    } else {
        rowsId.sort((a, b) => a - b)
        arrow.classList.remove('bi-chevron-double-down')
        arrow.classList.add('bi-chevron-double-up')
    }
    
    rowsId.forEach(num => {
        rows.forEach(row => {
            if (Number(row.querySelector('.user_id').textContent) === num) {
                tableBody.append(row)
            }
        })
    })
}



export default renderPosts

//--------------------------------------------------------------------------------------------- users

// function createUserBody(id, name, username, email, phone) {
//     return  `
//         <tr>
//             <td class="user_id">${id}</td>
//             <td>${name}</td>
//             <td>${username}</td>
//             <td>${email}</td>
//             <td>${phone}</td>
//         </tr>
//     `
// }

let informationBlock = document.querySelector('.information')

function createUserTable(bodyHtml) {
    let wrapper = `
            <table class="users table mx-auto remove" id="myTable">
                <thead class="users_header table-header">
                    <tr>
                        <th scope="col">
                            <span class="sortby-id">
                                Id<i class="bi bi-chevron-double-up"></i>
                            </span>
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody class="users_body tbody">
                    ${bodyHtml}
                </tbody>
            </table>
    `
    informationBlock.insertAdjacentHTML('afterbegin',wrapper)
}

function createUserBody(user) {
    return  `
        <tr>
            <td class="user_id">${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        </tr>
    `
}

let data = []

async function renderUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    data = await response.json()
    render()

    let sortBtn = document.querySelector('.sortby-id')
    sortBtn.addEventListener('click', sortTable)
}

function render() {
    let allUsers = data.reduce((container, currentObj) => {
        let userBody = createUserBody(currentObj)
        return container += userBody
    }, '')

    createUserTable(allUsers)
}






function sortTable() {
    let tableBody = document.querySelector('tbody')
    let rows = tableBody.querySelectorAll('tr')
    let arrow = document.querySelector('.bi')
    let rowsId = []
    rows.forEach(row => {
        rowsId.push(Number(row.querySelector('.user_id').textContent))
        
    })

    if (arrow.classList.contains('bi-chevron-double-up')) {
        rowsId.sort((a, b) => b - a)
        arrow.classList.remove('bi-chevron-double-up')
        arrow.classList.add('bi-chevron-double-down')
    } else {
        rowsId.sort((a, b) => a - b)
        arrow.classList.remove('bi-chevron-double-down')
        arrow.classList.add('bi-chevron-double-up')
    }
    
    rowsId.forEach(num => {
        rows.forEach(row => {
            if (Number(row.querySelector('.user_id').textContent) === num) {
                tableBody.append(row)
            }
        })
    })

    console.log(data);
}




export default renderUsers


//-----------------------------photo

// async function renderPhotos() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=8')
//     const photosResponse = await response.json()
//     let allPhotos = photosResponse.reduce((container, currentObj) => {
//         let photoBody = createPhotoTable(currentObj)
//         return container += photoBody
//     }, '')
//     createPhotoWrapper(allPhotos)
// }

function createPhotoWrapper(allPhotoHtml) {
    let wrapper= `
        <div class="container-fluid text-center remove">
            <div class="row row-cols-4 row-cols-lg-4 g-2 g-lg-3">
                ${allPhotoHtml}
            </div>
        </div>
    `
    informationBlock.insertAdjacentHTML('afterbegin', wrapper)
}

function createPhotoTable(photo) {
    return `
            <div class="col">
                <div class="p-3 border bg-light">
                    <p>${photo.title}</p>
                    <img src="${photo.url}" class="rounded photo" alt="photo">
                </div>
            </div>
    `
}




//--------------------------------filter

// let newKeys = keys.filter(key => {
//     if (bannedKeys.includes(key)) return false;
//     return true
// })







============



// function sort(data) {
//     if(column) {
//         sortAsc = !sortAsc;
//     }

//     return data.sort((object1, object2) => {
//         if (object1[column] > object2[column]) {

//             return sortAsc ? -1 : 1;
//         }
//         if (object1[column] < object2[column]) {
//             return sortAsc ? 1 : -1;
//         }
//         return 0;
//     })
    
// }


// import { createTable, createTableData } from "./table";



// async function renderUsers() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4')
//     let data = await response.json()
//     let sortedData = sort(data)
//     render(sortedData)
// }

// function render(data) {
//     let allUsers = data.reduce((container, currentObj) => {
//         let userBody = createTableData(currentObj.id, currentObj.name, currentObj.username, currentObj.email, currentObj.phone)
//         return container += userBody
//     }, '')
    
//     let keys = Object.keys(data[0])
//     let bannedKeys = ['address', 'website', 'company']
//     let newKeys = keys.filter(key => !bannedKeys.includes(key))

//     let tableData = createTableData(...newKeys)
        
//     createTable(allUsers, tableData)

// }


// function sort(data) {
//     let column = ''
//     console.log(data);
    
//     return data.sort((item1, item2) => {
//         console.log(item1);
//         console.log(item2);
//         if (item1[column] < item2[column]) {
//             return -1;
//         }
//         if (item1[column] > item2[column]) {
//             return 1;
//         }
        
//         return 0;
//     })
    
// }

// export default renderUsers