const Pagntion = ({ handelPrevious, handelNext, pageLength, handelPageLength }: any) => {
    return (
        <nav aria-label="Page navigation example" className="mt-4">
            <ul className="flex items-center">
                <li onClick={handelPrevious}>
                    <div className="flex py-2 px-3 ml-0 text-gray-500 cursor-pointer bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 ">
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>
                </li>
                {pageLength.map((item: any, index: number) => (
                    <li onClick={() => handelPageLength(index)} key={index}>
                        <div  className={`py-2 px-3 ${item.active ? " text-gray-100 bg-gray-500  hover:bg-gray-600" : "hover:bg-gray-100 text-gray-500 cursor-pointer bg-white "} border border-gray-300  `}>{index + 1}</div>
                    </li>
                ))}
                <li onClick={handelNext}>
                    <div className="flex py-2 px-3 leading-tight cursor-pointer text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 ">
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Pagntion