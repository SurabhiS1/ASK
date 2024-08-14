import React, { useState } from 'react';

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('pdf', file);

      // Send formData to the backend 
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
     
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        return response.json();
      })
      
        .then((data) => {
          console.log('Extracted Text:', data.text);
          setExtractedText(data.text);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
    <form onSubmit={handleSubmit}>
      <label htmlFor="pdfUpload">Upload PDF:</label>
      <input type="file" id="pdfUpload" accept=".pdf" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
    {extractedText && (
     <div style={{
        width: '80%',
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxHeight: '100px',
        overflowY: 'scroll',
        textAlign: 'left',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
      }}>
        {extractedText.split('\n').join('\n')}
      </div>
    )}
     </div>
  );
};

export default PdfUpload;

//<div>
  //      <h3>Extracted Text:</h3>
   //     <p>{extractedText}</p>
   //   </div>