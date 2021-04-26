import * as React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,Button, Modal, ModalHeader, ModalBody, ModalFooter 
} from "reactstrap";

export const columns =[
   {
        Header: ()=>{
          return null
        },
        columnId:0,
        accessor: "demo",
        Cell: ({ row })=>{
          const data = row.original;
          console.log("row original data is", data)
         return(
           data.Progress=="Not started"
           ? <img src={data.siteUrl+"/Shared%20Documents/notstarted.jpg"} alt="not started" height="40px" width="40px" style={{marginLeft: "9px"}} />
           :data.Progress=="Completed"
           ? <img src={data.siteUrl+"/Shared%20Documents/completed.png"} alt="completed" height="40px" width="40px" style={{marginLeft: "9px"}}/>
           :data.Progress=="In progress" 
           ?<img src={data.siteUrl+"/Shared%20Documents/inprogress.png"} alt="in progress" height="40px" width="40px" style={{marginLeft: "9px"}}/>
           :null
         )
        }
      },
      {
        Header: 'Item',
        columnId:1,
        accessor: 'Title', // accessor is the "key" in the data
      },
      {
        Header: 'Description',
        columnId:2,
        accessor: 'Description',
        Cell: ({row})=>{
          const data = row.original;
          const showDescriptionData =(Description)=>{
            alert(Description);
          }
          return(
            <div onClick={()=>showDescriptionData(data.Description)}>{data.Description}</div>
          )
        }
      },
      {
        Header: 'Category',
        columnId:3,
        accessor: 'Category',
      },
      {
        Header: 'Progerss',
        columnId:4,
        accessor: 'Progress',
      },
     
      {
        Header: 'Priority',
        columnId:5,
        accessor: 'Priority',
      },
      {
        Header: 'Start Date',
        columnId:6,
        accessor: 'StartDate',
      },
      {
        Header: 'Due Date',
        columnId:7,
        accessor: 'DueDate',
      },
      {
        Header: () => {
          return null;
        },
        accessor: "modal",
        columnId:8,
        Cell : ({row})=>{
          const [dropdownOpen, setDropdownOpen] = React.useState(false);
          const toggle = () => setDropdownOpen(!dropdownOpen);
          const [displaydata,setDisplayData] = React.useState(false);
          const [modal, setModal] = React.useState(false);
          const modaltoggle = () =>{
            setModal(!modal);
        }
          const data = row.original;
          const showrowdata = ()=>{
            setDisplayData(!displaydata);
          }

          return (
            <>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="icon-toggle">
                  <img
                    src={data.siteUrl + "/Shared%20Documents/ellipsis.png"}
                    alt="elipses"
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={showrowdata}>Display Row Data</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {displaydata ? (
                <Modal isOpen={modal} toggle={modaltoggle}>
                  <ModalHeader toggle={toggle}>Row modal</ModalHeader>
                  <ModalBody>
                    <Row>Title: {data.Title}</Row>
                    <Row>Description: {data.Description}</Row>
                    <Row>Priority: {data.Priority}</Row>
                    <Row>Progress: {data.Progress}</Row>
                    <Row>StartDate: {data.StartDate}</Row>
                    <Row>DueDate: {data.DueDate}</Row>
                    <Row>Category: {data.Category}</Row>
                  </ModalBody>
                </Modal>
              ) : null}
            </>
          );
        }
      }
    ]