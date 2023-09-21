import React, { useMemo, useState } from 'react';
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
    const { imgs } = props;
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [rotate, setRotate] = useState(0);
    const imgStyles = useMemo(() => {
        return {
            transform: `scaleX(${scaleX}) scaleY(${scaleY}) rotate(${rotate}deg)`,
        }
    }, [scaleX, scaleY, rotate])
    const handleClick = (type) => {
        switch (type) {
            case 'scale-up':
                if(scaleX === -0.2 || scaleY === -0.2) {
                    setScaleX(scaleX)
                    setScaleY(scaleY)
                    break
                }
                if (scaleX < 0 || scaleY < 0){
                    setScaleX(scaleX - 0.2)
                    setScaleY(scaleY - 0.2)
                    break
                }
                setScaleX(scaleX + 0.2 === 0 ? scaleX : scaleX + 0.2)
                setScaleY(scaleY + 0.2 === 0 ? scaleY : scaleY + 0.2)
                break;
            case 'scale-down':
                if (scaleX < 0 || scaleY < 0){
                    setScaleX(scaleX + 0.2)
                    setScaleY(scaleY + 0.2)
                    break
                }
                setScaleX(scaleX - 0.2 === 0 ? scaleX : scaleX - 0.2)
                setScaleY(scaleY - 0.2 === 0 ? scaleY : scaleY - 0.2)
                break;
            case 'one-to-one':
                setScaleX(1)
                setScaleY(1)
                break;
            case 'reset':
                setScaleX(1)
                setScaleY(1)
                setRotate(0)
                break;
            case 'rotate-left':
                setRotate(rotate - 90)
                break;
            case 'rotate-right':
                setRotate(rotate + 90)
                break;
            case 'flip-horizontal':
                setScaleX(-scaleX)
                break;
            case 'flip-vertical':
                setScaleY(-scaleY)
                break;
            default:
                break;
        }
    }
    return (
        <div className="text-gif-mask-content">
            <div className='text-gif-mask-img'>
                <svg className='text-gif-mask-svg' width="100%" height="100%" fill="white"
                xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <foreignObject x="0" y="0" width="100%" height="100%">
                        <div className='text-gif-mask-container'>
                            <img src={img} style={imgStyles}/>
                        </div>
                    </foreignObject>
                </svg>
            </div>
            <div className='text-gif-mask-tool'>
                {options.map((item)=>(<div className='text-gif-mask-tool-item' onClick={() => handleClick(item.type)} key={item.type}>{item.name}</div>))}
            </div>
        </div>
    );
}

export default Content;
