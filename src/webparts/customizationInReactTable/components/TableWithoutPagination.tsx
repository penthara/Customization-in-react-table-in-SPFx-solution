import { Link } from "react-router-dom";
import * as React from "react";
import { useTable, usePagination, useSortBy  } from "react-table";

const TableWithoutPagination = ({data, columns, _onRowClick, siteUrl}) =>{
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }= useTable({columns, data},useSortBy)

    return(
      console.log("data in table component is", data),
        // apply the table props
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              row.original.Hyperlink?
              <tr {...row.getRowProps()} onClick={(e) => _onRowClick(e, row, columns)}>
                {row.cells.map(cell => {
                  return (
                    // <Link to={'https://m365x625240.sharepoint.com/sites/divyam_development/Lists/Tracker/AllItems.aspx'}>
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        background: 'light-blue',
                      }}
                     
                    >
                      {cell.render('Cell')}
                    </td>
                    //  </Link>
                  )
                })}
              </tr>
              :
              <tr {...row.getRowProps()} onClick={(e) => _onRowClick(e, row, columns)}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                      
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>

            )
          })}
        </tbody>
      </table>
    )
}

export default TableWithoutPagination;