import '../style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Dropdown
} from 'bootstrap';
import renderUsers from "../src/users";
import renderPosts from "../src/posts";
import renderPhotos from '../src/photos';

function removeElChild() {
    let informationBlock = document.querySelector('.information')
    informationBlock.innerHTML = ''
}

window.addEventListener('hashchange', selectPage)

function selectPage() {
    let hash = window.location.hash

    switch (hash) {
        case '#users':
            renderUsers()
            removeElChild()
            break;
        case '#photo':
            renderPhotos()
            removeElChild()
            break;
        case '#posts':
            renderPosts()
            removeElChild()
            break
    }
}

selectPage()

export default removeElChild