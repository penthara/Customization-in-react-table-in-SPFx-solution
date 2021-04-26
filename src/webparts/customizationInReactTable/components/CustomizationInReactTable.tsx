import * as React from 'react';
import styles from './CustomizationInReactTable.module.scss';
import { ICustomizationInReactTableProps } from './ICustomizationInReactTableProps';
import { escape } from '@microsoft/sp-lodash-subset';
import WorkProgressInfo from './WorkProgressInfo';
import {Button} from "reactstrap";

export default class CustomizationInReactTable extends React.Component<ICustomizationInReactTableProps, {}> {
  public render(): React.ReactElement<ICustomizationInReactTableProps> {
    console.log("props of root:", this.props);
    
    return (
      <div className={ styles.customizationInReactTable }>
        
        
        <WorkProgressInfo siteUrl={this.props.siteUrl}/>
      </div>
    );
  }
}
