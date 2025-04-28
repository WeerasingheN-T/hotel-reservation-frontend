import React, { useState } from "react";

function usePagination(data, itemsPerPage){

    const[currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage -1) * itemsPerPage;
        const end = begin + itemsPerPage;

        return data.slice(begin,end);
    }

    function jump(page) {
        const pageNumber = Math.max(1, Math.min(page,maxPage));
        setCurrentPage(pageNumber);
    }

    return { currentData, currentPage, maxPage, jump }
}

export default usePagination;