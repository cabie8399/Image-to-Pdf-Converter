import React, { useState } from 'react';
import embedImages from './utils/imgToPdf';
import './App.css';

function App() {
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
        // 读文件数据
        // const buffer = await fileData.arrayBuffer();
        // 转成Blod url地址
        // let src = URL.createObjectURL(new Blob([buffer]));
        // 在页面中显示
        // output.insertAdjacentHTML('beforeend', `<img src="${src}">`);
      } catch (e) {
        console.log(e);
      }
      // return dataBuffer;
    }
    await getFile();
    embedImages(dataBuffer);
  };

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
            <button type="button" className="btn btn-danger">Clear All</button>
          </div>
        </div>
        <div className="row footer">
          <div className="footerBtn">
            <button type="button" className="btn btn-primary">Convert</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
