export default function AuthPageLogo(){
    return <div className="relative bg-black h-[100vh] w-1/2 float-right xl:block hidden">
        <p className="text-white font-bold text-[130px] absolute right-[8%] top-[20px] m-auto z-10 headingFont -rotate-6 -skew-x-6">Medium</p>
        <p className="font-light bg-white text-black text-3xl absolute right-[8%] top-[180px] border-b border-black border-3 -rotate-6 -skew-x-6">Where good ideas find you.</p>
        <p className="font-light border border-white p-2 text-xl absolute right-[18%] w-3/4 top-[320px] headingFont text-white">“The ability of writers to imagine what is not the self, to familiarize the strange and mystify the familiar, is the test of their power."</p>
        <p className="font-light border border-white p-2 text-xl absolute right-[5%] w-2/3 top-[450px] headingFont  text-white"> “The writer is an explorer. Every step is an advance into a new land.”</p>
        <p className="font-light border border-white p-2 text-xl absolute right-[25%] w-2/3 top-[550px] headingFont text-white"> “That’s what you’re looking for as a writer when you’re working. You’re looking for your own freedom.”</p>
        <p className="font-light border border-white p-2 text-xl absolute right-[5%] w-2/3 top-[680px] headingFont text-white"> “Imagination is the beginning of creation. You imagine what you desire, you will what you imagine and at last you create what you will.” </p>
 
    </div>
}

export function AuthPageLogoResponsive(){
    return <div className="flex flex-col bg-white gap-2 p-2 border-b w-full float-top xl:hidden">
        <p className="text-4xl mt-2 headingFont ml-5">Medium.</p>
    </div>
}