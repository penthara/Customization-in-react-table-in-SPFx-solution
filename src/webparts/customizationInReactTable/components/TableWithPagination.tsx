import * as React from "react";
import TableWithoutPagination from "./TableWithoutPagination";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const TableWithPagination = ({data, columns, _onRowClick, pageSize,siteUrl}) =>{
    const [currentpage, setCurrentpage] = React.useState(1);

    const indexoflastItem = currentpage*pageSize;
    const indexoffirstItem = indexoflastItem-pageSize;
    const currentData = data.slice(indexoffirstItem,indexoflastItem);
    const totalPages = Math.ceil(data.length/pageSize);
    const pageCount = [];

    for(let i=1;i<=totalPages;i++){
        pageCount[i]=i;
      }

      const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentpage(index);
        };
        const handlePreviousClick=()=>{
            setCurrentpage(currentpage-1);
          }
          const handleFirstClick=()=>{
            setCurrentpage(1);
          }
          const handleNextClick=()=>{
            setCurrentpage(currentpage+1)
          }
          const handleLastClick=()=>{
            setCurrentpage(totalPages)
          }
    return (
      <>
       
        <TableWithoutPagination
          data={currentData}
          columns={columns}
          _onRowClick={_onRowClick}
          siteUrl = {siteUrl}
        />
        <Pagination aria-label="Page navigation example" style={{paddingLeft: "20px"}}>
          <PaginationItem>
            <PaginationLink onClick={handleFirstClick} first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={handlePreviousClick} previous href="#" />
          </PaginationItem>
          {pageCount.map(
            (page, i) => (
              console.log("page number : ", i),
              (
                <PaginationItem active={i === currentpage} key={i}>
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, i)}
                    href="#"
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              )
            )
          )}
          <PaginationItem>
            <PaginationLink onClick={handleNextClick} next href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={handleLastClick} last href="#" />
          </PaginationItem>
        </Pagination>
      </>
    );
}
export default TableWithPagination;