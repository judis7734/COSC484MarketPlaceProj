import Image from "next/image";
import FilterSection from "../FilterSection";

export default function SearchBar() {
    return ( 
        <div className= "px-4">
            <form action="">
                <input type="text" id="search" name="search" className="w-full border-solid border-2" />
             </form>
        </div>
    )
}