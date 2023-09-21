import React from 'react';
import Content from './components/Content';
import './index.less';

function Mask(props) {
    const { imgs } = props;
    const handleClose = () => {

    }
    return (
        <div className="text-gif-mask">
            <div className='text-gif-mask-close' onClick={handleClose}>关闭</div>
            <Content imgs={imgs}/>
            {/* <img src={img}></img> */}
        </div>
    );
}

export default Mask;
