import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web } from 'sp-pnp-js';
import Table from "./TableWithoutPagination";
import {columns} from "./TableColumn";
import * as moment from 'moment';
import TableWithPagination from "./TableWithPagination";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Row,Col } from 'reactstrap';

const WorkProgressInfo = (props) =>{
    console.log("props in child component", props)
    const [tableitems, setTableitems] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [rowdata, setRowdata] = React.useState(null);
    const [showtable, setShowTable] =React.useState(false);
    const [showpagetable, setShowpagetable] = React.useState(false);
    const toggle = () =>{
        setModal(!modal);
    }
    
    const getTableData = (items) =>{
        const data: any = [];
        items.map((item)=>{
            data.push({
                Title: item.Title,
                Description: item.Description,
                Category: item.Category[0],
                Priority: item.Priority,
                Progress: item.Progress,
                StartDate: moment(
                    item.StartDate
                  ).format("MM/DD/YYYY hh:mm A"),
                DueDate: moment(
                    item.DueDate
                  ).format("MM/DD/YYYY hh:mm A"),
                Hyperlink: true,
                siteUrl: props.siteUrl
                
            })
        })
        setTableitems(data);
        console.log("table data is ", data)
    }
    React.useEffect(()=>{
        let web = new Web(props.siteUrl);
        web.lists.getByTitle("Tracker").items.get().then((items)=>{
            console.log("tracker list items are", items)
            getTableData(items);
        })
    },[])

    const onRowclick = (e, row, col) =>{
        console.log("row is clicked!!!", row);
        setModal(true);
        setRowdata(row.original)

    }
    
    return (
      <>
        {console.log("table data in render", tableitems)}
        <Button onClick={() =>{
         setShowpagetable(false)
         setShowTable(true)
         }}>
          Table Without Pagination
        </Button>
        <Button onClick={() => {
            setShowTable(false)
            setShowpagetable(true)
        }}>
          Table With Pagination
        </Button>

        {showtable ? (
          <Table
            data={tableitems}
            columns={columns}
            _onRowClick={onRowclick}
            siteUrl={props.siteUrl}
          />
        ) : null}

        {showpagetable ? (
          <TableWithPagination
            data={tableitems}
            columns={columns}
            _onRowClick={onRowclick}
            siteUrl={props.siteUrl}
            pageSize={4}
          />
        ) : null}

        {rowdata != null ? (
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Row Data</ModalHeader>
            <ModalBody>
              <Row>
                  Title: {rowdata.Title}
              </Row>
              <Row>
                  Description: {rowdata.Description}
              </Row>
              <Row>
              Priority: {rowdata.Priority}
              </Row>
              <Row>
              Progress: {rowdata.Progress}
              </Row>
              <Row>
              StartDate: {rowdata.StartDate}
              </Row>
              <Row>
              DueDate: {rowdata.DueDate}
              </Row>
              <Row>
              Category: {rowdata.Category}
              </Row>
            </ModalBody>
          </Modal>
        ) : null}
      </>
    );
}

export default WorkProgressInfo;