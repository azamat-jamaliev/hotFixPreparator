import React from 'react'
import ReactDOM from 'react-dom/client'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HFManager from './components/HFManager';
import Grid from '@mui/material/Grid';

export interface IAppProps {
  counter: number;
}

export default class App extends React.Component<IAppProps, IAppProps> {
  aaSessionId = ""
  constructor(props: IAppProps){
    super(props);
    this.state = props;

    setInterval(() => { 
      fetch("/api/session",{ headers: {
        AaSessionId: this.aaSessionId
        }}).then((resp)=>{
        console.log("[DEBUG] /api/session resonse=",resp);
        this.aaSessionId = resp.headers.get("Aasessionid")??"";
        console.log("[DEBUG] /api/session resonsethis.Aasessionid=", this.aaSessionId);
      });
    }, 10000);
  }
  counterButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => { 
    let newVal = this.state.counter+1;
    // console.log("Click. new value=", newVal); 
    this.setState({counter:newVal})  }
  public render() {
    return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HotFix Preparator v0.1.2
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} position="static">
        <Grid item xs={1} border="1">
        </Grid>
        <Grid item xs={10}>
            <Button variant="contained" onClick={this.counterButtonClick}>inc</Button>
            <Typography variant="body1" gutterBottom>
              The tool helps to combine different HotFixes into one *.Zip file, also it validates overlapping of the HorFixes. Test number: {this.state.counter}
              <ul>
              <li>1. Input TMS ticket number</li>
              <li>2. Upload zip file</li>
              <li>3. verify the result & download "integrated" zip file</li>
              </ul>
            </Typography>
            
            <HFManager height={56}></HFManager>
        </Grid>
        <Grid item xs={1} border="1">
        </Grid>
      </Grid>
    </div>
    );
  }
}

const domContainer = document.querySelector('#application');
if(domContainer!=null) {
    const root = ReactDOM.createRoot(domContainer);
    root.render(<App counter={0} />);
} else {
    console.error("Cannot find '#application'");
}