import React from 'react';
import Nav from './components/Nav';
import Content from './components/Content';
import './index.less';

function Mask(props) {
    const { img } = props;
    return (
        <div className="text-gif-mask">
            <Nav />
            <Content />
            {/* <img src={img}></img> */}
        </div>
    );
}

export default Mask;
