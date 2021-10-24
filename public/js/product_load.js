let parameters = []
function removeElement(event, position){
    event.target.parentElement.remove()
    delete parameters[position]
}
const addJsonElement = json => {
    parameters.push(json)
    return parameters.length - 1

}
(function load(){
const $form = document.getElementById("frmUsers")
const $divElements = document.getElementById("divElements")
const $btnSave = document.getElementById("btnSave")
const $btnAdd = document.getElementById("btnAdd")

const templateElement = (data, position) => {
    return(`
    <button class="delete" onclick="removeElement(event, ${position})"></button>
    <strong> - </strong> ${data}
    `)
}

    $btnAdd.addEventListener("click", (event) => {
        if($form.description.value != ""){
            let index = addJsonElement({
                description: $form.description.value,
                
            })
        
            const $div = document.createElement("div")
            $div.classList.add("notification", "is-link", "is-light", "py-2", "my-1")
            $div.innerHTML = templateElement($form.description.value, index)
            $divElements.insertBefore($div, $divElements.firstChild)

            $form.reset()

        }else{
            alert("Complete los campos")
        }
    })

    $btnSave.addEventListener("click", (event) =>{
        parameters = parameters.filter(el => el != null)
        const $jsonDiv = document.getElementById("jsonDiv")
        $jsonDiv.innerHTML = `JSON: ${JSON.stringify(parameters)}`
        $divElements.innerHTML = ""
        parameters = []
    })
})()