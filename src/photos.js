import { createPhotoTable, createPhotoWrapper } from "../src/table";

let data = []
async function renderPhotos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=8')
    data = await response.json()
    render() 
}

function render() {
    let allPhotos = data.reduce((container, currentObj) => {
        let photoBody = createPhotoTable(currentObj)
        return container += photoBody
    }, '')
    createPhotoWrapper(allPhotos)
}

export default renderPhotos