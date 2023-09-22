import React, { useMemo, useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
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
    {
        name: '添加文字',
        type: 'add-text',
    }
]
function Content(props) {
    const { img } = props;
    const [width, setWidth] = useState(img.width);
    const [height, setHeight] = useState(img.height);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [rotate, setRotate] = useState(0);
    const canvasEl = useRef(null);
    const imgStyles = useMemo(() => {
        return {
            transform: `scaleX(${scaleX}) scaleY(${scaleY}) rotate(${rotate}deg)`,
            width: width,
            height: height,
        }
    }, [width, height, scaleX, scaleY, rotate])
    const handleAddText = () => {

    }
    const handleClick = (type) => {
        switch (type) {
            case 'scale-up':
                setWidth(width * 1.2)
                setHeight(height * 1.2)
                break
            case 'scale-down':
                setWidth(width / 1.2)
                setHeight(height / 1.2)
                break
            case 'one-to-one':
                setWidth(img.width)
                setHeight(img.height)
                setScaleX(1)
                setScaleY(1)
                break;
            case 'reset':
                setWidth(img.width)
                setHeight(img.height)
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
            case 'add-text':
                handleAddText()
                break
            default:
                break;
        }
    }
    useEffect(() => {
        const options = {};
        const canvas = new fabric.Canvas(canvasEl.current, options);
        const image = new fabric.Image(img, {
            top: 0,
            left: 0
        })
        canvas.add(image)
        return () => {
            canvas.dispose();
        }
    }, []);
    return (
        <div className="text-gif-mask-content">
            <div className='text-gif-mask-img'>
                <canvas ref={canvasEl} width={width} height={height}></canvas>
            </div>
            <div className='text-gif-mask-tool'>
                {options.map((item) => (<div className='text-gif-mask-tool-item' onClick={() => handleClick(item.type)} key={item.type}>{item.name}</div>))}
            </div>
        </div>

    );
}

export default Content;
