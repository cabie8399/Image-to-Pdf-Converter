import React, { useState } from 'react';
import embedImages from './utils/imgToPdf';
import './App.css';

function App() {
  // eslint-disable-next-line no-unused-vars
  let fileBytes;
  // let classText = 'btn btn-primary disabled';

  const [fileText, setfileText] = useState('Select your files');

  const selectImages = async () => {
    const dataBuffer = [];
    const pickerOpts = {
      types: [
        {
          description: 'Images',
          accept: {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: true,
    };
    async function getFile() {
      try {
        const fileHandle = await window.showOpenFilePicker(pickerOpts);
        setfileText(`Total : ${fileHandle.length} Files`);
        for await (const i of fileHandle) {
          const fileData = await i.getFile();
          const buffer = await fileData.arrayBuffer();
          dataBuffer.push(buffer);
        }
      } catch (e) {
        console.log(e);
        return e;
      }
      // return dataBuffer;
    }
    await getFile();
    fileBytes = embedImages(dataBuffer);
    // convertBtnStatus('enabled');
  };

  const convert = (fileBytes) => {
    const blob = new Blob([fileBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = 'file.pdf';
    link.download = fileName;
    link.click();
    clearAllFiles();
  };

  const clearAllFiles = () => {
    fileBytes = null;
    setfileText('Select your files');
    // convertBtnStatus('disabled');
  };

  // const convertBtnStatus = (status) => {
  //   if (status === 'enabled') {
  //     classText = 'btn btn-primary';
  //   }
  //   classText = 'btn btn-primary disabled';
  // };

  return (
    <div className="App">
      <div className="container">
        <div className="row header">
          <div className='headerText'>
            <p className='title'>Convert Images to PDF</p>
            <span>
              Click the IMAGE BELOW and select images you wish to convert.
            </span>
          </div>
        </div>
        <div className="row content">
          <div className="selectPdfArea" onClick={selectImages}>
            <div className="pdfImg">
              <img src="./images/gallery.png" />
            </div>
            <span>{fileText}</span>
          </div>
          <div className="selectPdfText">
            Only JPG and PNG are supported.
          </div>
          <div className="clearPdfBtn">
            <button type="button" className="btn btn-danger" onClick={clearAllFiles}>Clear All</button>
          </div>
        </div>
        <div className="row footer">
          <div className="footerBtn">
            <button type="button" className='btn btn-primary' onClick={convert}>Convert</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
