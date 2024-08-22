import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
        
    const navegate = useNavigate();
    
    const {registerUser} = useContext(UserContext);

    const {required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();
    
    const { 
        register, 
        handleSubmit, 
        formState: {errors}, 
        getValues,
        setError,
    } = useForm ();

    const onSubmit = async({email, password}) => {
        try {
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            console.log(error.code);
            const {code, message} = errorsFirebase(error.code);
            setError(code, { message });
        }
    };

    return (
        <>
           <Title text="Register"/> 
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email" 
                        placeholder="Ingrese Email" 
                        {...register("email", {
                            required,
                        pattern: patternEmail,
                    })}
                    label = "Ingresa tu correo"
                    error = {errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>
            <FormInput
                type="password" 
                placeholder="Ingrese Contraseña"
                {...register("password", {
                    minLength,
                    validate: validateTrim,
                })}
                label = "Ingresa tu contraseña"
                error={errors.password}
            >
                <FormError error={errors.password} />
            </FormInput>
            <FormInput
                type="password" 
                placeholder="Ingrese Contraseña" 
                {...register("repassword", {
                    validate: validateEquals(getValues("password")),
                })}
                label = "Repite la contraseña"
                error={errors.repassword}
            >
                <FormError error={errors.repassword} />
            </FormInput>
            <Button text="Register" type="submit"/>
            </form>
        </>
    )
}

export default Register;