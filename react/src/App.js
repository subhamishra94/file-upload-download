import React, { useEffect, useState, useCallback } from 'react'
import { Provider, defaultTheme, Button } from '@adobe/react-spectrum';
import FileList from './components/FileList';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/file-list', {
      method: 'GET',
    }).then((response) => {
      response.json().then((data) => {
        setFileList(data.files);
      });
    });
  }, [])

  const handleOnFileChange = (evt) => {
    setSelectedFile(evt.target.files[0]);
  }

  const handleOnUpload = useCallback((ev) => {
    const data = new FormData();
    data.append('file', selectedFile);
    data.append('filename', selectedFile.name);

    fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((data) => {
        setFileList(data.files);
      });
    });
  }, [selectedFile]);

  return (
    <Provider theme={defaultTheme}>
      <div className="App">
        <input type="file" multiple={false} onChange={handleOnFileChange} />
        <Button onPress={handleOnUpload}>Upload</Button>
        <FileList files={fileList} />
      </div>
    </Provider>
  );
}

export default App;
