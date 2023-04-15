import * as React from 'react';
import { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import { CD } from '../classes/hf_types';

export interface IHfUploadProps {
  currentDrop?: CD;
  height?: number;
}

export default class HfUpload extends React.Component<IHfUploadProps> {

  handleUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files: ", e.target.files);
    if (!e.target.files || !e.target.files[0]) {
      return;
    }
    let file = e.target.files[0]

    // 👇 Uploading the file using the fetch API to the server
    fetch('/api/hf', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("[DEBUG] data receive on HfUpload: ", data))
      .catch((err) => console.error("[ERROR] ", err));
  };

  public render() {
    return (
        <Button variant="outlined" component="label" sx={{ height:this.props.height }}>
          Upload *.zip with HF
          <input hidden accept="*.zip" type="file" onChange={this.handleUploadClick} />
        </Button>
    );
  }
}
