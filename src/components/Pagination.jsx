import React , {useState} from "react";

const Pagination = ({itemsPerPage,totalItems , paginate}) => {

    const pageNumbers = []
    const [currentPage,setCurrentPage] = useState(1)

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

  return (
    <>
      <div class="hint-text">
        <b>{totalItems}</b> entries
      </div>
      <ul class="pagination">

        { pageNumbers.map(n =>  
            <li class={n == currentPage ? 'active page-item' : 'page-item'}>
            <a onClick={() => {setCurrentPage(n); paginate(n)}} key={n} class="page-link">
              {n}
            </a>
          </li>
            ) }
      </ul>
    </>
  );
};

export default Pagination;
