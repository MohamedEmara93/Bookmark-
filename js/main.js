const siteName = document.querySelector('#siteName');
const siteUrl = document.querySelector('#siteUrl');
const searchInput = document.getElementById('search')

const siteData = document.querySelector('.site-data')

const addBtn = document.getElementById('add')
const visitBtn = document.getElementById('visit')
const editBtn = document.getElementById('edit')
const deleteBtn = document.getElementById('delete')

const nameAlert = document.querySelector('.nameAlert')
const urlAlert = document.querySelector('.urlAlert')
const emptyAlert = document.querySelector('.empty-alert')

let bookmarkContainer = []

let currentIndex;

/////// get data during reload
if (localStorage.getItem('sites') != null) {
    bookmarkContainer = JSON.parse(localStorage.getItem('sites'))
    display()
} else {
    bookmarkContainer = []
}

/////// Add Button
addBtn.addEventListener('click', function (e) {
    if (siteName.value == '' || siteUrl.value == '') {
        emptyAlert.classList.add('d-block');
        emptyAlert.classList.remove('d-none');
        emptyAlert.innerHTML = "Please fill in required data !";
    } else if (addBtn.innerHTML == "Add Bookmark" && validateSiteName() && validateUrl()) {
        e.preventDefault();
        emptyAlert.innerHTML = "";
        addBookmark();
        localStorage.setItem('sites', JSON.stringify(bookmarkContainer));
        display();
        clearForm();
    } else if (addBtn.innerHTML == "Edit Bookmark" && validateSiteName() && validateUrl()) {
        e.preventDefault()
        submitEdit();
        addBtn.innerHTML = "Add Bookmark";
        localStorage.setItem("sites", JSON.stringify(bookmarkContainer));
        display();
        clearForm();
    }
})

///////// Add bookmark into Container
function addBookmark() {
    let bookmarkItem = {
        name: siteName.value,
        site: siteUrl.value
    }
    bookmarkContainer.push(bookmarkItem)
}

///////// Display Data
function display() {
    let html = ``;
    for (let i = 0; i < bookmarkContainer.length; i++) {
        html += `
        <div class="site-item mb-3 m-auto d-flex justify-content-between align-items-center">
            <div class="name">
               ${bookmarkContainer[i].name}
            </div>
            <div class="btns">
                <button class="btn visit"><a href="https://${bookmarkContainer[i].site}" target='_blank'> Visit </a> </button>
                <button onclick='editSite(${i})' href='#header' class="btn edit"><a href='#header'>Edit</a></button>
                <button onclick="deleteBookmark(${i})" class="btn delete">Delete</button>
            </div>
        </div>
        `
    }
    document.querySelector('.site-data').innerHTML = html;
}

////////// Clear Form After Adding
function clearForm() {
    siteName.value = null;
    siteUrl.value = null;
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid')
}

////////// Deleat Data[i]
function deleteBookmark(i) {
    bookmarkContainer.splice(i, 1)
    localStorage.setItem("sites", JSON.stringify(bookmarkContainer))
    display()
    console.log(i);
}

////////// Edit Data
function editSite(i) {
    currentIndex = i
    siteName.value = bookmarkContainer[currentIndex].name
    siteUrl.value = bookmarkContainer[currentIndex].site
    addBtn.innerHTML = "Edit Bookmark"
}

function submitEdit() {
    bookmarkContainer[currentIndex].name = siteName.value
    bookmarkContainer[currentIndex].site = siteUrl.value
    console.log('edit done');
}

////////// Search 
searchInput.addEventListener('keyup', function () {
    let html = '';
    for (let i = 0; i < bookmarkContainer.length; i++) {
        if (bookmarkContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            html += `
            <div class="site-item w-50 mb-3 m-auto d-flex justify-content-between align-items-center">
                <div class="name">
                   ${bookmarkContainer[i].name}
                </div>
                <div class="btns">
                    <button class="btn visit"><a href="https://${bookmarkContainer[i].site}" target='_blank'> Visit </a> </button>
                    <button onclick='editSite(${i})' class="btn edit">Edit</button>
                    <button onclick="deleteBookmark(${i})" class="btn delete">Delete</button>
                </div>
            </div>
            `
            document.querySelector('.site-data').innerHTML = html;
        } else {
            document.querySelector('.site-data').innerHTML = "No Result"
        }
    }
})

///////////////////////// VALIDATION ////////////////////////

// 1 => validate name of site

function validateSiteName() {
    let regex = /^[A-Z][A-Z a-z 0-9]{2,9}$/

    if (regex.test(siteName.value)) {
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")

        nameAlert.classList.add('d-none')
        nameAlert.classList.remove('d-block')

        addBtn.disabled = false
        return true
    } else {
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')

        nameAlert.classList.add('d-block')
        nameAlert.classList.remove('d-none')

        addBtn.disabled = true
        return false
    }
}

siteName.addEventListener('keyup', validateSiteName)

// 1 => validate URL of site

function validateUrl() {
    let regex = /^(www)\.[a-z0-9\-\.]+\.(com|net|org)$/

    if (regex.test(siteUrl.value)) {
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        urlAlert.classList.add('d-none')
        urlAlert.classList.remove('d-block')
        addBtn.disabled = false
        return true
    } else {
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
        urlAlert.classList.add('d-block')
        urlAlert.classList.remove('d-none')
        addBtn.disabled = true
        return false
    }
}

siteUrl.addEventListener('keyup', validateUrl)


////////////// btnUp //////////////////////

let dataOffset = $('#data').offset().top;

$(window).scroll(function(){
    let wScroll = $(window).scrollTop()

    if(wScroll > dataOffset -200){
        $('#btnUp').fadeIn(300)
    }else{
        $('#btnUp').fadeOut(300)
    }
})