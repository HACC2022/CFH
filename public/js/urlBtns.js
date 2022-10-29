const editBtn = document.querySelectorAll('#updateEditBtn')
const deleteBtn = document.querySelectorAll('#delUrlBtn')

Array.from(editBtn).forEach((element) => {
    element.addEventListener('click', updateUrl)
})
Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteUrl)
})

async function updateUrl() {
    const longUrl = this.parentNode.childNodes[1].value
    const slug = this.parentNode.childNodes[4].value
    const id = this.parentNode.dataset.id
    try {
        const response = await fetch(`/urls/${id}`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'idFromJSFile': id,
                'urlFromJSFile': longUrl,
                'slugFromJSFile': slug,
            })
        })
        const data = await response.json()
        console.log(data)
        location.replace('/urls')
    } catch(error) {
        console.error(error)
    }
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