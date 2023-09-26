import React from 'react';
import Content from './components/Content';
import './index.less';

function Mask(props) {
    const { showMask, setShowMask, img } = props;
    const handleClose = () => {
        setShowMask(false)
    }
    return (
        <>
            {showMask ?
                <div className="text-gif-mask">
                    <div className='text-gif-mask-close' onClick={handleClose}>关闭</div>
                    <Content img={img} />
                </div> : null}
        </>

    );
}

export default Mask;
