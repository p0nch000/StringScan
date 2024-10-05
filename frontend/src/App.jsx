import React, { useState } from 'react';
import { Upload } from 'lucide-react';

function App() {
  const [firstFile, setFirstFile] = useState(null);
  const [secondFile, setSecondFile] = useState(null);

  const handleFileUpload = (event, fileNumber) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      if (fileNumber === 1) {
        setFirstFile(file);
      } else {
        setSecondFile(file);
      }
    } else {
      alert('Por favor, seleccione un archivo .txt');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600 tracking-tight">
          String<span className="text-gray-800">Scan</span>
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadButton
              number={1}
              file={firstFile}
              onUpload={(e) => handleFileUpload(e, 1)}
            />
            <FileUploadButton
              number={2}
              file={secondFile}
              onUpload={(e) => handleFileUpload(e, 2)}
            />
          </div>
        </div>
        {/* Espacio para contenido adicional */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          {/* Aquí puedes agregar más funcionalidades */}
          <p className="text-gray-600 text-center">Funcionalidades adicionales irán aquí.</p>
        </div>
      </div>
    </div>
  );
}

function FileUploadButton({ number, file, onUpload }) {
  return (
    <div className="text-center">
      <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-md border-2 border-blue-300 cursor-pointer hover:bg-blue-50 transition duration-300 ease-in-out">
        <Upload className="w-8 h-8 mb-2" />
        <span className="mt-2 text-sm font-medium">
          {file ? file.name : `Cargar Archivo ${number} (.txt)`}
        </span>
        <input type='file' className="hidden" onChange={onUpload} accept=".txt" />
      </label>
    </div>
  );
}

export default App;