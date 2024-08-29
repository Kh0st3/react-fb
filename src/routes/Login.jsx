import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
//import ButtonLoading from "../components/ButtonLoading";

const Login = () => {

    const { loginUser } = useContext(UserContext);
    const [ loading, setLoading ] = useState (false);
    const navigate = useNavigate();
    const {required, patternEmail, minLength, validateTrim } = formValidate();
    
    const { 
        register, 
        handleSubmit, 
        formState: {errors}, 
        setError,
    } = useForm ();

    const onSubmit = async({email, password}) => {
        try {
            setLoading(true);
            await loginUser(email, password);
            navigate("/");
        } catch (error) {
            const {code, message} = errorsFirebase(error);
            setError(code, { message });
        } finally { 
            setLoading(false);
        }  // finally block will execute regardless of whether an error occurred or not.  //  finally block is used for cleanup.  //  Here we're setting loading to false when we're done with the request.  //  It's a good practice to always include a finally block in your async functions to ensure cleanup.  //  It's also a good practice to wrap the API call in a try-catch block and call the finally block in the catch block.  //  This way, you're guaranteed that the finally block will be executed, regardless of whether an error occurred or not.  //  This prevents potential memory leaks.  //  Finally block is used for cleanup.  //  Here we're setting loading to false when we're done with the request.  //  It's a good practice to always include a finally block in your async functions to ensure cleanup.  //  It's also a good practice to wrap the
    };

    return (
        <>
            <Title text="Login"/> 
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                    label = "Ingresa tu correo"
                    type="email" 
                        placeholder="Ingrese Email" 
                        {...register("email", {
                            required,
                        pattern: patternEmail,
                    })}
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>
                <FormInput
                    label = "Ingresa tu contraseña"
                    type="password" 
                    placeholder="Ingrese Contraseña"
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                    error={errors.password}
            >
                <FormError error={errors.password} />
            </FormInput>
                <Button 
                    text="Login" 
                    type="submit"
                    color="blue" 
                    loading={loading}/>
            </form>
        </>
    );
};

export default Login;