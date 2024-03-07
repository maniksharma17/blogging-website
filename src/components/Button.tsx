
export default function AuthPageButton({label, onClick} : {label: string, onClick: (e: any) => void;}){
    return <>
        <button className="bg-black text-white rounded-full h-14 font-light w-3/4 text-3xl hover:font-semibold hover:opacity-80 transition-all"
            onClick={onClick}
            onClickCapture={(e: any)=>{
                e.target.style.background = 'gray'

                setTimeout(()=>{
                    e.target.style.background = 'black'
                }, 2000)
            }}  
        >{label}</button>
    </>
}