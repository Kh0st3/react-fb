export const errorsFirebase = (code) => {

        switch (code) {
            case "auth/email-already-in-use":
              return "Usuario ya registrado";
            case "auth/invalid-email":
                return "Formato email no valido";
              case "auth/user-not-found":
                return "Usuario no encontrado";
              case "auth/wrong-password":
                return "Contraseña incorrecta";
            default:
                return "Ocurrio un error en el servidor";
        }
}

