import { useRecoilValue } from "recoil"
import { authorAtom, contentAtom, titleAtom } from "../atoms/atom"
import { Link } from "react-router-dom"

export default function BlogPage(){

    const title: string = useRecoilValue(titleAtom)
    const content: string = useRecoilValue(contentAtom)
    const author: string = useRecoilValue(authorAtom)
    

    return <>
        <NavBar></NavBar>
        <Link to={'/blogs'}><div className="absolute top-20 mr-5 cursor-pointer right-2 text-2xl font-thin  text-black border-1 border-black border rounded-full inline-flex items-center justify-center w-9 h-9 overflow-hidden">X</div></Link>
        <div className="m-5 mt-0">
        <div className="flex flex-row gap-3 items-center md:px-20">
            <div className="bg-black mt-20 inline-flex relative p-3 w-8 h-8 items-center justify-center rounded-full">
                <span className="text-white">{author[0]}</span>
            </div>
            <div className="text-xl mt-20 font-light">{author}</div>
        </div>
        <p className="text-4xl headingFont my-5 whitespace-pre-wrap md:px-20">{title}</p>
        <p className="text-justify w-[95%] whitespace-pre-wrap text-wrap overflow-hidden md:px-20">{content}</p>
    </div>
</>
}

function NavBar(){
    return <div className="bg-white border-b block z-40 fixed w-full md:px-10 px-3 md:h-16 p-3">

        <div className="flex flex-row items-center justify-between">

            <p className="text-black headingFont text-2xl md:text-4xl">Medium</p>
            
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