const editBtn = document.querySelectorAll('#editUrlBtn')
const deleteBtn = document.querySelectorAll('#delUrlBtn')

Array.from(editBtn).forEach((element) => {
    element.addEventListener('click', editUrl)
})
Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteUrl)
})

async function editUrl() {
    console.log('olleh');
}
async function deleteUrl() {
    const slug = this.parentNode.parentNode.childNodes[0].innerText
    try {
        const response = await fetch('/urls/deleteUrl', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'slugFromJSFile': slug
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload();
    } catch(error) {
        console.error(error)
    }
}