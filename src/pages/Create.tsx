import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../config"
import axios from 'axios'
import { createPostSchema } from "@maniksharma17/common"

export function CreatePage(){

    const [ blogContent, setBlogContent ] = useState<createPostSchema>({title: "", content: "", publication: true})

    return <div>
        <NavBar blogContent={blogContent}></NavBar>
        <ContentPage setBlogContent={setBlogContent} blogContent={blogContent}></ContentPage>
    </div>
}

function NavBar({blogContent}: {blogContent: blogContentType}){
    const navigate = useNavigate()

    return <div className="bg-white border-b block fixed w-full md:px-10 px-3 py-3">

        <div className="flex flex-row items-center justify-between">

            <p className="text-black headingFont text-2xl md:text-4xl">Medium</p>
            

            <button className="bg-blue rounded-full bg-blue-700 text-white p-1 md:p-2 px-3"
                    
                    onClick={async ()=>{
                        await axios.post(`${BACKEND_URL}/api/v1/blog/post`, blogContent, {
                            headers: {
                                'Authorization': "Bearer " + localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            }
                        })

                        navigate('/blogs')
                        
                    }}

                    onClickCapture={(e: any)=>{
                        e.target.style.opacity = 0.5;
                    }}
            >Publish</button>

            <div className="md:flex hidden flex-row gap-5 items-center justify-center">
                <Link to={'/profile'}><button className="sidebarButton">Profile</button></Link>
                <Link to={'/blogs'}><button className="sidebarButton">Explore</button></Link>
            </div>

            <div className="flex md:hidden flex-row gap-5 items-center justify-center">
                <Link to={'/profile'}><span className="material-symbols-outlined">account_circle</span></Link>
                <Link to={'/blogs'}><span className="material-symbols-outlined">Explore</span></Link>
            </div>
        </div>
        
    
    </div>
}

interface blogContentType{
    title: string,
    content: string,
    publication: boolean
}

function ContentPage({setBlogContent, blogContent}: {setBlogContent: any, blogContent: blogContentType}){


    return <div className="fixed mt-28 flex flex-col md:ml-10 mx-3 md:w-[90%] w-[95%] h-auto gap-5">
        <textarea placeholder="Title" className="headingFont paragraphSupport border text-wrap placeholder:text-6xl h-20 overflow-visible text-3xl outline-none"
        onChange={(e)=>{
            setBlogContent({
                ...blogContent,
                title: e.target.value
            })
        }}></textarea>
        <textarea placeholder="Type here" className="placeholder:text-xl paragraphSupport md:pr-40 pr-10 border placeholder:font-light text-md text-justify overflow-scroll outline-none"
        onChange={(e)=>{
            setBlogContent({
                ...blogContent,
                content: e.target.value
            })
        }}></textarea>
    </div>
}