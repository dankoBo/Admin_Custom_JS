let informationBlock = document.querySelector('.information')
let sortAscend = null
let arrowUp = `<i class="bi bi-arrow-up-short"></i>`
let arrowDown = `<i class="bi bi-arrow-down-short"></i>`
let dobleArrow = `<i class="bi bi-arrow-down-up"></i>`


//* User and Comments table
function createTable(bodyHtml, headerHtml) {

    let wrapper = `
                <table class="table mx-auto">
                    <thead>
                        ${headerHtml}
                    </thead>
                    <tbody>
                        ${bodyHtml}
                    </tbody>
                </table>
            `
    informationBlock.insertAdjacentHTML('afterbegin',wrapper)
}

function createTableData(...arg) {
    arrowDirection(sortAscend)
    let table = ''
    let data = ''
    if (arg.includes('id')) {
        arg.forEach(item => {
            let cell = `
                <th class="text-nowrap">
                    ${item}${arrowDirection(sortAscend)}
                </th>
            `
            data += cell  
        })
        
    } else {
        arg.forEach(item => {
            let cell = `<td class='table-row__item'>${item}</td>`
            data += cell
        })
    }
    
    table = `
            <tr>
                ${data}
            </tr>
    `
    return table
}




//* Photo table
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


//* Sort

function sort(data, column) {
    if(column) {
        sortAscend = !sortAscend;
    }
    
    return data.sort((object1, object2) => {
        if (object1[column] > object2[column]) {
            return sortAscend ? -1 : 1;
        }
        if (object1[column] < object2[column]) {
            return sortAscend ? 1 : -1;
        }
        return 0;
    })
    
}

let arrowDirection = function(bool) {
    if(bool === false) {
        return dobleArrow = arrowUp
    } 
    if(bool === true) {
        return dobleArrow = arrowDown
    }
    if (bool === null) {
        return dobleArrow
    }
}

export { createTable, createTableData, createPhotoWrapper, createPhotoTable, sort }



