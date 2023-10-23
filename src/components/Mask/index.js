import React from 'react';
import Content from './components/Content';
import { closeIcon } from '@components/Svg'
import './index.less';

function Mask(props) {
    const { showMask, setShowMask, img } = props;
    const handleClose = () => {
        setShowMask(false)
    }
    return (
        <>
            {showMask ?
                <div className="text-img-mask">
                    <div className='text-img-mask-close' onClick={handleClose}>{closeIcon}</div>
                    <Content img={img} onClose={handleClose} />
                </div> : null}
        </>
    );
}

export default Mask;
