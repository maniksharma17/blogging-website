
export function Skeleton(){
    return <div role="status" className="md:w-5/12 w-screen animate-pulse md:m-auto mb-10 ml-5">
        <div className="h-4 bg-gray-200 rounded-full md:w-[350px] w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-full md:w-[550px] w-3/4 mb-2.5"></div>
        <div className="h-20 bg-gray-200 rounded-xl md:w-[550px] w-10/12 mb-2.5"></div>
        <div className="h-4 bg-gray-200 rounded-xl md:w-[300px] w-1/3 mb-2.5"></div>
        <span className="sr-only">Loading...</span>
    </div>
}