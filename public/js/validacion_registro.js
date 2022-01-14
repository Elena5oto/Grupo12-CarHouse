const formRegister = document.getElementById('formulario__register')
const inputsReg = document.querySelectorAll('#formulario__register input');
const formLogin = document.getElementById('formulario__login')
const inputsLog = document.querySelectorAll('#formulario__login input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{2,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,20}$/, // 8 a 20 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    imagen: /(.jpg|.jpeg|.png|.gif)$/i,
};

const campos ={
    name: false,
    email: false,
    username: false,
    image: false,
    password: false,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "name":
            if(expresiones.nombre.test(e.target.value)){
                
                document.getElementById('notification_name_register').innerHTML = ""
                campos["name"]= true;
                
            }else{
				campos["name"]= false;
                if(e.target.value == ""){
                    document.getElementById('notification_name_register').innerHTML = "Campo obligatorio"
                }else{
                    document.getElementById('notification_name_registerdescription').innerHTML = "Debe tener como minimo 2 caracteres alfanumericos"
                }
            }
        break;

        case "email":
            if(expresiones.correo.test(e.target.value)){
                
                document.getElementById('notification_email_login').innerHTML = ""
				document.getElementById('notification_email_register').innerHTML = ""
                campos["email"]= true;
            }else{
              
				document.getElementById('notification_email_login').innerHTML = "Ingrese un correo valido"
				document.getElementById('notification_email_register').innerHTML = "Ingrese un correo valido"
				campos["email"]= false;
            }
        break;

        case "username":
            if(expresiones.usuario.test(e.target.value)){
                
                document.getElementById('notification_username_register').innerHTML = ""
                campos["username"]= true;
            }else{
                campos["username"]= false;
                if(e.target.value == ""){
                    document.getElementById('notification_username_register').innerHTML = "Campo obligatorio"
                }else{
                    document.getElementById('notification_username_registerdescription').innerHTML = "Debe tener como minimo 2 caracteres alfanumericos"
                }
            }
        break;

        case "password":
            if(expresiones.password.test(e.target.value)){
                document.getElementById('notification_password_login').innerHTML = ""
				document.getElementById('notification_password_register').innerHTML = ""
                campos["password"]= true;
                
            }else{ 
				document.getElementById('notification_password_login').innerHTML = "Campo obligatorio"
				document.getElementById('notification_password_register').innerHTML = "Debe tener 8 caracteres como minimo"
				campos["password"]= false; 
                
            }
        break;

        case "image":
            var fileInput = document.getElementById('btn_enviar');
            if(!expresiones.imagen.exec(e.target.value)){
                fileInput.value = '';
                document.getElementById('notification_image_register').innerHTML = "Cargar imagenes .jpg.jpeg.png.gif"
               // campos["image"]= false;
                
                return false;
            }else{
                document.getElementById('notification_image_register').innerHTML = ""
                //campos["image"]= true;
            }
        break;
    }
}

inputsLog.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
inputsReg.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formLogin.addEventListener('submit', (e) => {
    if (campos.email && campos.password) {

    } else{
e.preventDefault()
document.getElementById('notification_general_login').innerHTML = "Complete todos los campos obligatorios"
}
})

formRegister.addEventListener('submit', (e) => {
    if (campos.name && campos.username && campos.email && campos.password) {

    } else{
e.preventDefault()
document.getElementById('notification_general_register').innerHTML = "Complete todos los campos obligatorios"
}
})

