import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
        
    const navegate = useNavigate();
    
    const {registerUser} = useContext(UserContext);
    
    const { 
        register, 
        handleSubmit, 
        formState: {errors}, 
        getValues,
        setError,
    } = useForm ({
        defaultValues: {
            email: "ricardocc5@gmail.com",
        },
    });

    const onSubmit = async({email, password}) => {
        console.log(email, password);
        try {
            await registerUser(email, password);
            console.log("Usuario creado");
            navegate("/");
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("email", {
                        message: "Usuario ya registrado"
                    })
                    break;
                case "auth/invalid-email":
                    setError("email", {
                        message: "Formato email no valido"
                    })
                    break;
                default:
                    console.log("Ocurrio un error en el servidor");
            }
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                    type="email" 
                    placeholder="Ingrese Email" 
                    {...register("email", {
                        required:{
                            value: true,
                            message: "Campo Obligatorio"
                    },
                    pattern:{
                        value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                        message: "Formato de email incorrecto"
                    }
                })}
            />
            {
                errors.email && <p>{errors.email.message}</p>
            }
            <input 
                    type="password" 
                    placeholder="Ingrese Contraseña" 
                    {...register("password", {
                        setValuesAs: (v) => v.trim(),
                        minLength:{
                            value: 6,
                            message: "Contraseña debe tener al menos 6 caracteres"
                        },
                        validate: {
                            trim: (v) => {
                                if(!v.trim()) {
                                    return "No seas 🤡, escribe algo";
                                }
                                return true;
                            }, 
                        },
                    })}
            />
            {
                errors.password && <p>{errors.password.message}</p>
            }
            <input 
                    type="password" 
                    placeholder="Ingrese Contraseña" 
                    {...register("repassword", {
                        setValuesAs: (v) => v.trim(),
                        validate: {
                            equals: (v) => 
                                v === getValues("password") || 
                                "Las contraseñas no coinciden",
                        }
                    })}
            />
            {
                errors.repassword && <p>{errors.repassword.message}</p>
            }
            <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;