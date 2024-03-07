import { ChangeEvent } from "react";

export default function InputBoxLabelled({label, placeholder, type, icon, onChange}: LabelledInputType){
    return <div className="w-4/5">
        <div className="flex flex-col my-1 w-full">
            <div className="flex flex-row gap-2 mb-1">
                <span className="material-symbols-outlined">{icon}</span>
                <label className="font-normal">{label}</label>
            </div>
            
            <input type={type || "text"} placeholder={placeholder} className="w-full border-1 border border-black outline-black rounded-full p-3"
                    onChange={onChange}
            ></input>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    icon?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}