import React from 'react';
import './index.less';

const options = [
    {
        name: '放大',
        type: 'scale-up',
    },
    {
        name: '缩小',
        type: 'scale-down',
    },
    {
        name: '1:1',
        type: 'one-to-one',
    },
    {
        name: '还原',
        type: 'reset',
    },
    {
        name: '左旋转',
        type: 'rotate-left',
    },
    {
        name: '右旋转',
        type: 'rotate-right',
    },
    {
        name: '水平旋转',
        type: 'flip-horizontal',
    },
    {
        name: '垂直旋转',
        type: 'flip-vertical',
    },
]
function Content(props) {
    const {  } = props;
    return (
        <div className="text-gif-mask-content"> 
            <div className='text-gif-mask-tool'>
                {options.map((item)=>(<div key={item.type}>{item.name}</div>))}
            </div>
        </div>
    );
}

export default Content;
