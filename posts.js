import { createTable, createTableData, sort } from "./table";
import removeElChild from "./main"
let column

async function renderPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    let data = await response.json()
    let sortedData = sort(data, column)
    render(sortedData)

    let tr = document.querySelector('.table thead tr')
    tr.addEventListener('click', event => {
        column = event.target.innerText
        removeElChild()
        renderPosts()
    })
}

function render(data) {
    let allPosts = data.reduce((container, currentObj) => {
        let userBody = createTableData(currentObj.id, currentObj.title, currentObj.body)
        return container += userBody
    }, '')

    let keys = Object.keys(data[0])
    let bannedKeys = ['userId']
    let newKeys = keys.filter(key => !bannedKeys.includes(key))

    let tableData = createTableData(...newKeys)
    createTable(allPosts, tableData)
}

export default renderPosts