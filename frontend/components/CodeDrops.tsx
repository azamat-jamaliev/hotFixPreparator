import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CD } from '../classes/hf_types';

export interface ICodeDropsProps {
  height?: number;
  codeDrops?: CD[];
  onSelected: (selectedDrop: string) => void;
}
export interface ICodeDropsState {
  codeDrop?: string;
}

export default class CodeDrops extends React.Component<ICodeDropsProps, ICodeDropsState> {
  constructor(props: Readonly<ICodeDropsProps>){
    super(props);
    this.state = {}
  }    
  handleChange = (event: SelectChangeEvent) => {
    this.setState({codeDrop: event.target.value})
    this.props.onSelected(event.target.value)
  };      
  public render() {
    return (
      <Box sx={{ minWidth: 130, height:this.props.height }}>
      <FormControl sx={{ minWidth: 130, height:this.props.height }}>
        <InputLabel id="code-drop-label" sx={{ height:this.props.height }}>Code Drop</InputLabel>
        <Select sx={{ height:this.props.height }}
          labelId="code-drop-label"
          id="code-drop-select"
          value={this.state.codeDrop}
          label="Code Drop"
          onChange={this.handleChange} >
            { this.props.codeDrops?.map((val: CD, index: number, array: CD[]) =>{ return <MenuItem value={val.Name}>{val.Name}</MenuItem> }) }
        </Select>
      </FormControl>
    </Box>
    );
  }
}
