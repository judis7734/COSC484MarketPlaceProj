import Image from "next/image";
import FilterSection from "../FilterSection";
import SearchBar from "../_components/SearchBar";

export default function Sidebar() {
    return ( 
        <div className="bg-blue-900 w-4/12 h-screen border rounded-lg">
            <div className="text-center p-4">
                <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
                <SearchBar/>
            </div>
            <FilterSection />
        </div>
    )
}