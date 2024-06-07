import React from "react";

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='mt-5'>
            <ul className="flex items-center -space-x-px h-8 text-sm gap-2">
            {pages.map((page, index) => {
                return (
                    <li key={index}>
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={`${page == currentPage ? "active" : ""} flex p-4 bg-[#610000] rounded-lg text-white`}>
                        {page}
                    </button>
                    </li>
                );
            })}
            </ul>
        </div>
    );
};

export default Pagination;