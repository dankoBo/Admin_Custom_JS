import { createTable, createTableData, sort} from "./table";
import removeElChild from "./main"
let column

async function renderUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
    let data = await response.json()
    let sortedData = sort(data, column)
    render(sortedData)
    
    let tr = document.querySelector('.table thead tr')
    tr.addEventListener('click', event => {
        column = event.target.innerText
        removeElChild()
        renderUsers()
    })
    
}

function render(data) {
    let allUsers = data.reduce((container, currentObj) => {
        let userBody = createTableData(currentObj.id, currentObj.name, currentObj.username, currentObj.email, currentObj.phone)
        return container += userBody
    }, '')
    
    let keys = Object.keys(data[0])
    let bannedKeys = ['address', 'website', 'company']
    let newKeys = keys.filter(key => !bannedKeys.includes(key))

    let tableData = createTableData(...newKeys)
    createTable(allUsers, tableData)
}




export default renderUsers































































