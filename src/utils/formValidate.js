export const formValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: "Este campo es obligatorio",
        },
        patternEmail:{
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto"
        },
        minLength:{
            value: 6,
            message: "Contraseña debe tener al menos 6 caracteres"
        },
        validateTrim: {
            trim: (v) => {
                if(!v.trim()) {
                    return "No seas 🤡, escribe algo";
                }
                return true;
            }, 
        },
        validateEquals(getValues) {
            return {
                equals: (v) => 
                    v === getValues("password") || 
                    "Las contraseñas no coinciden",
            };
        },
    };
};