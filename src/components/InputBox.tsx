export default function InputBox({placeholder, type}: LabelledInputType){
    return <div>
        <input type={type || "text"} placeholder={placeholder}></input>
    </div>
}

interface LabelledInputType {
    placeholder: string;
    type?: string;
}