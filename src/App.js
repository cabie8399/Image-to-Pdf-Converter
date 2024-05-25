import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row header">
          <div className='headerText'>
            <p className='title'>Convert JPG to PDF</p>
            <span>
              Click the PDF IMAGE and select images you wish to convert.
            </span>
          </div>
        </div>
        <div className="row content">
          <div className="selectPdfArea">
            <div className="pdfImg">
              <img src="./images/pdf.png" />
            </div>
            <span>Select your files</span>
          </div>
          <div className="selectPdfText">
            Drag and drop an image file (JPG, PNG, BMP, and more) to convert to PDF.
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
