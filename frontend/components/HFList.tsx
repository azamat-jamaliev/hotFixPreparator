import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { HF } from '../classes/hf_types';

export interface IHFListProps {
  HFList?: HF[];
}
export interface IHFListState {
  checked?: string[];
}

export default class HFList extends React.Component<IHFListProps, IHFListState> {
  constructor(props: Readonly<IHFListProps>){
    super(props);
    this.state = {checked:[]}
  }    
  handleToggle = (value: string) => () => {
    console.log("DEBUG: selected value=", value)
    const currentIndex = this.state.checked?.indexOf(value);
    let newState = Object.create(this.state)

    if (currentIndex === -1) {
      newState.checked?.push(value);
    } else {
      newState.checked?.splice(currentIndex, 1);
    }
    this.setState(newState)
  };
  handleSelectAll = () => {
    console.log("DEBUG: selected all")
    let newState = Object.create(this.state)
    if (newState.checked?.length > 0 ) {
      newState.checked = [];
    } else {
      this.props.HFList?.map((hf:HF)=>{
        newState.checked?.push(hf.Name);
      })
    }
    this.setState(newState)
  };  
  public render() {
    return (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem disablePadding>
            <ListItemButton role={undefined} onClick={this.handleSelectAll} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start" checked={this.state.checked?.length==this.props.HFList?.length}
                  tabIndex={-1} disableRipple
                  inputProps={{ 'aria-labelledby': "checkbox-list-label-select-all-hfs" }}
                />
              </ListItemIcon>
              <ListItemText primary={`HFs:`}/>
            </ListItemButton>
          </ListItem>        
      {this.props.HFList?.map((hf) => {
        const labelId = `checkbox-list-label-${hf.Name}`;
        return (
          <ListItem
            key={hf.Name}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={this.handleToggle(hf.Name)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start" checked={this.state.checked?.indexOf(hf.Name) !== -1}
                  tabIndex={-1} disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`HF ${hf.Name} Release: ${hf.ReleaseDate}`} 
              secondary={`includes files: ${hf.Content.join(" | ")}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    );
  }
}
