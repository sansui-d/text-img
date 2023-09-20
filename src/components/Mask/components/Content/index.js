import React from 'react';
import './index.less';
import img from '../../../../../public/favicon.png';

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
            <div className='text-gif-mask-img'>
                <svg className='text-gif-mask-svg' width="100%" height="100%" fill="white"
                xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <foreignObject x="0" y="0" width="100%" height="100%">
                        <div className='text-gif-mask-container'>
                            <img x="0" y="0" width={139} height={128} src={img} />
                        </div>      
                    </foreignObject>
                </svg>
            </div>
            <div className='text-gif-mask-tool'>
                {options.map((item)=>(<div className='text-gif-mask-tool-item' key={item.type}>{item.name}</div>))}
            </div>
        </div>
    );
}

export default Content;
