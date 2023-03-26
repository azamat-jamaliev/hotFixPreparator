import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CodeDrops from './CodeDrops';
import { CD } from '../classes/hf_types';
import HFList from './HFList';

export interface IHFManagerProps {
  height?: number;
}
export interface IHFManagerState {
  currentDrop?: CD;
  height?: number;
  codeDrops? : CD[];
}

export default class HFManager extends React.Component<IHFManagerProps, IHFManagerState> {
    constructor(props: IHFManagerProps){
        super(props);
        this.state = {};
      }    
  componentDidMount = () => {
    fetch("/api/test/hf").then((response) => response.json())
      .then((data) => {
        console.log("DEBUG: received from api/hf", data)
        var newSt = Object.create(this.state);
        newSt.codeDrops = data;
        this.setState(newSt);
        console.log("DEBUG: newSt.codeDrops=", newSt.codeDrops)
      });
  }
  codeDropWasSelected = (selectedDrop: string) => {
    console.log("DEBUG: codeDropWasSelected selectedDrop=", selectedDrop);
    var newSt = Object.create(this.state);
    newSt.currentDrop = this.state.codeDrops?.find((codeDrop: CD) => {if(codeDrop.Name==selectedDrop) return codeDrop;})
    // newSt.currentDrop = selectedDrop;
    console.log("DEBUG: newSt.currentDrop=", newSt.currentDrop);
    this.setState(newSt);    
  }
  public render() {
    return (
      <div>
      <Stack direction="row" alignItems="center" spacing={2}>
        <CodeDrops height={this.props.height} codeDrops={this.state.codeDrops} 
          onSelected={this.codeDropWasSelected}
        />
        <TextField id="standard-basic" label="HF TMS ticket number" variant="outlined" sx={{ height:this.props.height }} />
        <Button variant="outlined" component="label" sx={{ height:this.props.height }}>
          Upload *.zip with HF
          <input hidden accept="image/*" multiple type="file" />
        </Button>
    </Stack>
    <HFList HFList={this.state.currentDrop?.Content}></HFList>
    </div>
    );
  }
}
