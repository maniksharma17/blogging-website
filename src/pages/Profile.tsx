import { SideBar } from "./Blogs";
import { useState, useEffect } from "react";
import axios from 'axios'
import { BACKEND_URL } from "../../config";
import { useSetRecoilState } from "recoil" 
import { titleAtom, contentAtom, authorAtom } from "../atoms/atom" 
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/blogSkeleton";

export function Profile(){

    const [ profile, setProfile ] = useState({name:"Profile", id:"", email: "", posts: []})
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{

        axios.get(`${BACKEND_URL}/api/v1/user/${localStorage.getItem('userID')}`, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'json/application'
            }
        })
        .then(async (response)=>{
            const userData: any = response.data
            setProfile(userData)
            setLoading(false)
        })
        
    }, [])

    if (loading){
        return <div>
            <SideBar></SideBar>
            <br></br><br></br><br></br><br></br>
            <div>
                <Skeleton></Skeleton>
                <Skeleton></Skeleton>
                <Skeleton></Skeleton>
                <Skeleton></Skeleton>
            </div>
            
        </div>
    }

    return <div>
        <SideBar></SideBar>
        <div className="flex md:flex-row flex-col justify-end">

        <div className="md:mt-48 md:left-16 md:fixed mt-20 border-b pb-5">
            <div className="flex md:flex-row flex-col items-center gap-2 md:gap-10">
                <div className="bg-black relative inline-flex items-center justify-center overflow-hidden rounded-full w-16 h-16">
                    <span className="font-thin text-white text-4xl">{profile.name[0].toLocaleUpperCase()}</span>
                </div>
                <p className="text-3xl md:text-6xl md:w-1/2">{profile.name.toLocaleUpperCase()}</p> 
            </div>
            <p className="font-light md:text-3xl text-center md:text-start  md:ml-28 ">{profile.email}</p>
            <div className="md:ml-32 md:text-4xl md:mt-10 md:text-start text-center mt-10"><span className="md:text-6xl text-4xl font-semibold">{profile.posts.length}</span> Blogs</div>
        </div>

        <div className="overflow-y-scroll md:mt-28 md:w-1/2 w-full">
            {profile.posts.map((post: any)=>{return <BlogCard key={post.id} title={post.title} desc={post.content} blogId={post.id}></BlogCard>})}
        </div>
    </div>
</div>
    
 }

 export function BlogCard({title, desc, blogId}: {title: string, desc: string, blogId: string}){

    const setTitle = useSetRecoilState(titleAtom)
    const setContent = useSetRecoilState(contentAtom)
    const setAuthor = useSetRecoilState(authorAtom)
    const navigate = useNavigate()

    function calcMinutes(desc: string): string{
        if (desc.length < 500)
            return '2'
        else if (desc.length < 1000)
            return '4'
        else if (desc.length < 2000)
            return '5'
        else 
            return '5+'
    }


    return <div className="m-2 p-3 h-auto flex flex-col hover:bg-gray-100 border relative text-wrap overflow-hidden"
    onClick={async ()=>{
        const response: any = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'json/application'
            }
        })

        const blogData: any = response.data

        setTitle(blogData.title)
        setContent(blogData.content)
        setAuthor(blogData.author.name[0].toLocaleUpperCase() + blogData.author.name.slice(1))

        navigate('/read') 
    }}>
        <div className="h-6 w-6 p-5 absolute top-5 right-5 cursor-pointer"
            onClick={async ()=>{
                await axios.delete(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'json/application'
                    }
                })

                window.location.reload()
                navigate('/profile')
                
            }}
        ><span className="material-symbols-outlined">delete</span></div>
        <p className="md:text-lg text-md font-semibold w-10/12">{title}</p>
        <p className="font-light text-sm italic w-10/12 overflow-hidden text-wrap">{desc.slice(0, 150)}...</p>
        <p className="text-slate-500 mt-2">{`(${calcMinutes(desc)} minutes)`}</p>
        
    </div>
}