import { userSigninSchema } from "@maniksharma17/common";
import Button from "../components/Button";
import InputBoxLabelled from "../components/InputBoxLabelled";
import AuthPageLogo, { AuthPageLogoResponsive } from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import {BACKEND_URL} from '../../config'


export default function Signin(){

    return <div className="flex xl:flex-row flex-col xl:justify-between gap-20 h-[100vh] xl:h-auto">
        <AuthPageLogoResponsive></AuthPageLogoResponsive>
        <SigninBox></SigninBox>
        <AuthPageLogo></AuthPageLogo>
    </div>
}

function SigninBox(){

    const navigate = useNavigate()
    const [ signinInput, setSigninInput ] = useState<userSigninSchema>({
        email: "",
        password: ""
    })
    const [ message, setMessage ] = useState("")

    async function sendRequest(){
        console.log(signinInput)
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput);
        const userData = response.data
        
        
        if (userData.error){
            setMessage(userData.error)
            return
        }
        localStorage.setItem("token", userData.token)
        localStorage.setItem("userID", userData.id)
        navigate('/blogs')
    }

    return <div className="flex flex-col justify-between items-center rounded-xl h-[450px] w-96 mx-auto p-2 relative lg:m-auto">
        <p className="font-bold text-4xl mb-5">Enter into <br></br>Blogging paradise.</p>
        <InputBoxLabelled type={"email"} label={"Email"} placeholder={"johndoe@gmail.com"} icon={"alternate_email"}
                            onChange={(e)=>{
                                setSigninInput({
                                    ...signinInput,
                                    email: e.target.value
                                })
                            }}
        ></InputBoxLabelled>
        <InputBoxLabelled type={"Password"} label={"Password"} placeholder={"123456"} icon={"password"}
                            onChange={(e)=>{
                                setSigninInput({
                                    ...signinInput,
                                    password: e.target.value
                                })
                            }}
        ></InputBoxLabelled> 
        <p className="text-sm text-center ">Don't have an account? <br></br> 
            <Link to={"/signup"} className="text-[#534eea]">Make one here!</Link> 
        </p>
        <Button onClick={sendRequest} label={"Continue"}></Button>
        <p>{message}</p>
    </div>
}