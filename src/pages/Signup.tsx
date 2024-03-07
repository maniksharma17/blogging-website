import Button from "../components/Button";
import InputBoxLabelled from "../components/InputBoxLabelled";
import AuthPageLogo, { AuthPageLogoResponsive } from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userSignupSchema } from "@maniksharma17/common";
import axios from 'axios';
import {BACKEND_URL} from '../../config'

export default function Signup(){
    return <div className="flex xl:flex-row flex-col md:justify-between h-[100vh] gap-10 xl:h-auto">
        <AuthPageLogoResponsive></AuthPageLogoResponsive>
        <SignupBox></SignupBox>
        <AuthPageLogo></AuthPageLogo>
    </div>
}

function SignupBox(){

    const navigate = useNavigate()
    const [ message, setMessage ] = useState('')
    const [ signupInput, setSignupInput ] = useState<userSignupSchema>({
        email: "",
        password: "",
        name: ""
    })



    async function sendRequest(){
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInput)
        const userData = response.data
        
        if (userData.error){
            setMessage(userData.error)
            return
        }

        localStorage.setItem("token", userData.token)
        localStorage.setItem("userID", userData.id)
        navigate('/blogs')
    }

    return <div className="flex flex-col justify-between items-center h-[530px] w-96 md:m-auto mx-auto p-2 relative bg-white">
        <p className="font-bold text-4xl mb-5">Join the <br></br>Blogging paradise.</p>
        <InputBoxLabelled type={"text"} label={"Name"} placeholder={"John Doe"} icon={"face"}
            onChange={(e)=>{
                setSignupInput({
                    ...signupInput,
                    name: e.target.value
                })
            }}
        ></InputBoxLabelled>
        <InputBoxLabelled type={"email"} label={"Email"} placeholder={"johndoe@gmail.com"} icon={"alternate_email"}
            onChange={(e)=>{
                setSignupInput({
                    ...signupInput,
                    email: e.target.value
                })
            }}
        ></InputBoxLabelled>
        <InputBoxLabelled type={"Password"} label={"Password"} placeholder={"123456"} icon={"password"}
            onChange={(e)=>{
                setSignupInput({
                    ...signupInput,
                    password: e.target.value
                })
            }}
        ></InputBoxLabelled> 

        <p className="text-sm text-center">Already have an account? <br></br> 
            <Link to={"/"} className="text-[#534eea]">Login here!</Link>
        </p>
        <Button onClick={sendRequest} label={"Create"}></Button>
        <p>{message}</p>
    </div>
}