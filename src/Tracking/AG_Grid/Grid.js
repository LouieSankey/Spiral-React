import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, { Component } from 'react';
import './Grid.css'
import 'react-dropdown/style.css';
import MainContext from '../../MainContext'
// import DeleteIcon from '../../Img/delete'
import SimpleEditor from './SimpleEditor'
import ActionsRenderer from './ActionsRenderer'

class Grid extends Component {

    static contextType = MainContext;


 

    state = {

        columnDefs: [
            { headerName: "Task", field: "task",  cellEditor: "simpleEditor",  },
            { headerName: "Cycle", field: "cycle",  cellEditor: "simpleEditor" },
            { headerName: "Date", field: "date",  cellEditor: "simpleEditor" },
            { headerName: "Start", field: "time",  cellEditor: "simpleEditor" },
            {
                headerName: "Edit",
                colId: "actions",
                cellRenderer: "actionsRenderer",
                editable: false,
                filter: false,
             
              }
        ],
        rowData: [
            { task: "Task 2", cycle: "34 min", date: '07/23/2020' },
        ],
    }


 
    defaultColDef = {
        editable: true,
        resizable: true,
        filter: true,
        floatingFilter: false,
        minWidth: 200,
        flex: 1,
        suppressKeyboardEvent: params => params.editing
      };


    render() {

      

        return (
            <>
            <div className="grid-container">
                <div
                    className="ag-theme-balham"
                    style={{ height: '370px', width: '100%' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.defaultColDef}
                        rowData={this.context.tasks}
                        getRowNodeId={data => data.id}
                        frameworkComponents={{simpleEditor: SimpleEditor, actionsRenderer: ActionsRenderer }}
                        editType="fullRow"
                        suppressClickEdit
                        statusBar={{
                            statusPanels: [{ statusPanel: "addRowStatusBar"}]
                        }}
                        
                        >

                    </AgGridReact>
                </div>

                </div>

            </>
        );
    }
}
export default Grid;