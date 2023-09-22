import React from 'react';
import Mask from '../components/Mask';
import './App.less';

function App() {
  const [img, setImg] = React.useState(null);
  const [showMask, setShowMask] = React.useState(false);
  const handleChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result
        img.onload = () => {
          setImg(img)
          setShowMask(true)
        }
      };
    }
  }
  return (
    <div className="text-img">
      <label htmlFor={123} className='qr-upload-label'>上传图片</label>
      <input
        type="file"
        id={123}
        hidden={true}
        accept=".jpg, .jpeg, .png"
        onClick={(e) => e.target.value = null}
        onChange={(e) => handleChange(e)}
      />
      <Mask img={img} showMask={showMask} setShowMask={setShowMask} />
    </div>
  );
}

export default App;
