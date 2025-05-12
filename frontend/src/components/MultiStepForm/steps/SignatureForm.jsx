import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

const SignatureForm = ({ formData, setFormData }) => {
  const sigCanvas = useRef();

  const clear = () => {
    sigCanvas.current.clear();
    setFormData({ ...formData, signature: '' });
  };

  const save = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setFormData({ ...formData, signature: dataURL });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Signature</h2>
      <div className="border rounded mb-4">
        <SignaturePad
          ref={sigCanvas}
          canvasProps={{
            className: 'w-full h-40 bg-white border rounded',
          }}
        />
      </div>
      <div className="flex gap-2 mb-4">
        <button type="button" onClick={clear} className="px-4 py-2 bg-red-500 text-white rounded">Clear</button>
        <button type="button" onClick={save} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
      </div>
      {formData.signature && (
        <div>
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <img src={formData.signature} alt="Signature Preview" className="border rounded" />
        </div>
      )}
    </div>
  );
};

export default SignatureForm;
