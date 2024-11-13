import Header from "../components/Header"

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
        <Header/>
        <div className="bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Basic Browsing Page with Card Designs</h1>
  
        <input
          placeholder="Search"
          type="text"
          name="text"
          className="w-full h-10 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 mb-6"
        />
  
        <div className="flex gap-12" id="container">
          <div className="card bg-white p-4 rounded-2xl shadow-lg w-60 h-80">
            <div className="card-image bg-gray-400 w-full h-60 rounded-lg mb-4"></div>
            <div className="category text-xs uppercase font-semibold text-green-500 mb-2">item-category</div>
            <div className="item font-semibold text-gray-700 text-lg">
              Item name <span className="price text-blue-500">$$$</span>
              <div className="author text-sm text-gray-500 font-normal mt-2">
                Posted by <span className="name font-semibold">C_Name</span>{' '}
                <span className="posted-date text-xs">X days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}