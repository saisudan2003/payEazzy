"use client"
export function SearchBar () {
    return (
        <form className="flex items-center max-w-sm mx-auto">   
            <label className="sr-only">Search</label>
            <div className="relative w-full">
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full ps-10 p-2.5 " placeholder="Search user name..." required />
            </div>
            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-sky-500 rounded-lg border hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-500">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>
    )        
}