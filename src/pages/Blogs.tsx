import { useEffect, useState } from "react"
import axios from 'axios'
import { BACKEND_URL } from "../../config"
import { Link, useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil" 
import { titleAtom, contentAtom, authorAtom } from "../atoms/atom" 
import { Skeleton } from "../components/blogSkeleton"

export default function BlogsDashboard(){

    const [ blogs, setBlogs ] = useState([])
    const [ filter, setFilter ] = useState("")
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk?filter=` + filter, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'json/application'
            }
        })
        .then(async (response)=>{
            const blogs: any = response.data
            console.log(filter)
            setBlogs(blogs.reverse())
            setLoading(false)
        })
    }, [filter, blogs])

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

    return <div className="flex flex-col justify-between bg-white">
        <SideBar setFilter={setFilter}></SideBar>

        <div className="lg:w-1/2 w-screen mt-20 m-auto h-screen overflow-y-scroll scroll-m-0">
            <MobileSearchBar setFilter={setFilter}></MobileSearchBar>
            {blogs.map((blog: any)=>{return <BlogCard key={blog.id} title={blog.title} desc={blog.content} author={blog.author.name} blogId={blog.id}></BlogCard>})}
        </div>
    </div>
    

   
    
   
}

export function BlogCard({title, desc, author, blogId}: {title: string, desc: string, author: string, blogId: string}){

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

    const setTitle = useSetRecoilState(titleAtom)
    const setContent = useSetRecoilState(contentAtom)
    const setAuthor = useSetRecoilState(authorAtom)
    const navigate = useNavigate()


    return <div className="m-2 p-3 h-30 hover:bg-gray-100 border" 
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
        <div className="flex flex-row items-center gap-2 w-fit">
            <div className="bg-gray-500 relative inline-flex items-center justify-center overflow-hidden rounded-full w-6 h-6">
                <span className="text-white text-sm font-light">{author[0].toLocaleUpperCase()}</span>
            </div>
            <p className="text-lg font-light">{author[0].toLocaleUpperCase() + author.slice(1)}</p>
        </div>
        <br></br>
        <p className="font-semibold text-md md:text-lg w-full">{title}</p>
        <p className="font-light text-sm md:text-md italic  w-[98%] overflow-hidden text-wrap">{desc.slice(0, 150)}...</p>
        <p className="text-slate-500 mt-2">{`(${calcMinutes(desc)} minutes)`}</p>
        
        
    </div>
}

export function SideBar({setFilter}: any){

    const navigate = useNavigate()

    return <div className="bg-white border-b block fixed w-full z-20 md:px-10 px-3 py-3">

        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center w-1/2">
                <div className="flex flex-col items-start mr-10">
                    <p className="text-black px-1 headingFont text-2xl md:text-4xl">Medium</p>
                </div>
                <SearchBar setFilter={setFilter}></SearchBar>
            </div>
            
            <div className="md:flex flex-row gap-5 items-center justify-center hidden">
                <Link to={'/profile'}><button className="sidebarButton">Profile</button></Link>
                <Link to={'/blogs'}><button className="sidebarButton">Explore</button></Link>
                <Link to={'/create'}><button className="sidebarButton">Create</button></Link>
                <button className="sidebarButton" onClick={()=>{
                    localStorage.removeItem('token');
                    navigate('/')
                }}>Logout</button>
            </div>

            <div className="flex flex-row gap-5 items-center justify-center md:hidden">

                <Link to={'/profile'}><span className="material-symbols-outlined">account_circle</span></Link>
                <Link to={'/blogs'}><span className="material-symbols-outlined">Explore</span></Link>
                <Link to={'/create'}><span className="material-symbols-outlined">edit</span></Link>
               
                <button onClick={()=>{
                    localStorage.removeItem('token');
                    navigate('/')
                }}><span className="material-symbols-outlined text-red">logout</span></button>
            </div>
        </div>
        
    
    </div>
}

function SearchBar({setFilter}: any){
    return <>
            <div className="w-1/2 z-10 md:flex hidden flex-row items-center p-2 border rounded-full border-gray-500">
            <input className="w-full pl-1 placeholder:text-black placeholder:font-light rounded-full outline-none" type="text" placeholder="Search"
            onChange={(e)=>{
                setFilter(e.target.value)
            }}
            ></input>
            <span className="material-symbols-outlined font-light">search</span>
        </div>
    </>
    
}

function MobileSearchBar({setFilter}: any){
    return <>
            <div className="w-4/5 z-10 flex mb-5 md:hidden flex-row items-center m-auto p-2 border rounded-full border-gray-500">
            <input className="w-full pl-1 placeholder:text-black placeholder:font-light rounded-full outline-none" type="text" placeholder="Search"
            onChange={(e)=>{
                setFilter(e.target.value)
            }}
            ></input>
            <span className="material-symbols-outlined font-light">search</span>
        </div>
    </>
    
}


