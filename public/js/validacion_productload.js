

const formulario = document.getElementById('form_productsload')
const inputs = document.querySelectorAll('#form_productsload input');
const textareas = document.querySelectorAll('#form_productsload textarea');

const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-]{5,25}$/, // Letras, numeros, guion y guion_bajo
	descripcion: /^[a-zA-ZÀ-ÿ0-9\_\-\s]{20,100}$/, // Letras y espacios, pueden llevar acentos.
    precio: /^[0-9]{1,14}$/, // 1 a 14 numeros
	imagen: /(.jpg|.jpeg|.png|.gif)$/i,
};

const campos ={
    name: false,
    title: false,
    description: false,
    price: false,
    image: true,
}



const validarFormulario = (e) => {
    switch (e.target.name) {
        case "name":
            if(expresiones.nombre.test(e.target.value)){
                document.getElementById('group_name').classList.remove('text-danger')
                document.getElementById('group_name').classList.add('text-success')
                document.getElementById('name').classList.remove('text-danger')
                document.getElementById('name').classList.remove('border-danger')
                document.getElementById('name').classList.remove('border-success')
                document.getElementById('notification_name').innerHTML = ""
                campos["name"]= true;
                
            }else{
              
                document.getElementById('group_name').classList.add('text-danger')
                document.getElementById('name').classList.add('text-danger')
                document.getElementById('name').classList.add('border-danger')
                campos["name"]= false;
                
                if(e.target.value == ""){
                    document.getElementById('notification_name').innerHTML = "Campo obligatorio"
                }else{
                    document.getElementById('notification_name').innerHTML = "Debe tener como minimo 5 caracteres alfanumericos"
                }
                
            }
        break;

        case "title":
            if(expresiones.nombre.test(e.target.value)){
                document.getElementById('group_title').classList.remove('text-danger')
                document.getElementById('group_title').classList.add('text-success')
                document.getElementById('title').classList.remove('text-danger')
                document.getElementById('title').classList.remove('border-danger')
                document.getElementById('title').classList.remove('border-success')
                document.getElementById('notification_title').innerHTML = ""
                campos["title"]= true;
            }else{
              
                document.getElementById('group_title').classList.add('text-danger')
                document.getElementById('title').classList.add('text-danger')
                document.getElementById('title').classList.add('border-danger')
                campos["title"]= false;
                if(e.target.value == ""){
                    document.getElementById('notification_title').innerHTML = "Campo obligatorio"
                }else{
                    document.getElementById('notification_title').innerHTML = "Debe tener como minimo 5 caracteres alfanumericos"
                }
            }
        break;

        case "description":
            if(expresiones.descripcion.test(e.target.value)){
                document.getElementById('group_description').classList.remove('text-danger')
                document.getElementById('group_description').classList.add('text-success')
                document.getElementById('description').classList.remove('text-danger')
                document.getElementById('description').classList.remove('border-danger')
                document.getElementById('description').classList.remove('border-success')
                document.getElementById('notification_description').innerHTML = ""
                campos["description"]= true;
            }else{
              
                document.getElementById('group_description').classList.add('text-danger')
                document.getElementById('description').classList.add('text-danger')
                document.getElementById('description').classList.add('border-danger')
                campos["description"]= false;
                if(e.target.value == ""){
                    document.getElementById('notification_description').innerHTML = "Campo obligatorio"
                }else{
                    document.getElementById('notification_description').innerHTML = "Debe tener como minimo 20 caracteres alfanumericos"
                }
            }
        break;

        case "price":
            if(expresiones.precio.test(e.target.value)){
                document.getElementById('group_price').classList.remove('text-danger')
                document.getElementById('group_price').classList.add('text-success')
                document.getElementById('price').classList.remove('text-danger')
                document.getElementById('price').classList.remove('border-danger')
                document.getElementById('price').classList.remove('border-success')
                document.getElementById('notification_price').innerHTML = ""
                campos["price"]= true;
                
            }else{
              
                document.getElementById('group_price').classList.add('text-danger')
                document.getElementById('price').classList.add('text-danger')
                document.getElementById('price').classList.add('border-danger')
                campos["price"]= false;
                if(e.target.value == ""){
                    document.getElementById('notification_price').innerHTML = "Campo obligatorio"
                }else{
                    document.getElementById('notification_price').innerHTML = "Introducir numeros validos"
                }
                
            }
        break;

        case "image":
            var fileInput = document.getElementById('image');
            if(!expresiones.imagen.exec(e.target.value)){
                fileInput.value = '';
                document.getElementById('group_image').classList.add('text-danger')
                document.getElementById('image').classList.add('text-danger')
                document.getElementById('image').classList.add('border-danger')
                document.getElementById('notification_image').innerHTML = "Cargar imagenes .jpg.jpeg.png.gif"
               // campos["image"]= false;
                
                return false;
            }else{
                document.getElementById('group_image').classList.remove('text-danger')
                document.getElementById('group_image').classList.add('text-success')
                document.getElementById('image').classList.remove('text-danger')
                document.getElementById('image').classList.remove('border-danger')
                document.getElementById('image').classList.remove('border-success')
                document.getElementById('notification_image').innerHTML = ""
                //campos["image"]= true;
            }
        break;
    }
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

textareas.forEach((textarea) => {
	textarea.addEventListener('keyup', validarFormulario);
	textarea.addEventListener('blur', validarFormulario);
});


  

formulario.addEventListener('submit', (e) => {
    if (campos.name && campos.title && campos.description && campos.price && campos.image) {
        console.log(campos)
    } else{
        console.log(campos)
e.preventDefault()
document.getElementById('notification_general').innerHTML = "Complete todos los campos obligatorios"
}
})

