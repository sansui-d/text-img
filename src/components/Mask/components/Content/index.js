import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
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
    const [angle, setAngle] = useState(0);
    const canvas = useRef(null);
    const handleAddText = () => {
        const itext = new fabric.Textbox('Lorum ipsum dolor sit amet', {
            left: 0,
            top: 0,
            width: 150,
            fontSize: 20,
            transparentCorners: false,
            borderColor: '#2d8cf0',
            cornerColor: "#2d8cf0",
            cornerStyle: 'circle',
        });
        canvas.current.add(itext).setActiveObject(itext);
    }
    const changeImg = useCallback(() => {
        fabric.Image.fromURL(
            img.src,
            (img) => {
                canvas.current.setBackgroundImage(
                    img,
                    canvas.current.renderAll.bind(canvas.current),
                    {
                        scaleX: scaleX,
                        scaleY: scaleY,
                        angle: angle
                    }
                )
            }
        )
    }, [scaleX, scaleY, angle])
    const handleClick = (type) => {
        switch (type) {
            case 'scale-up':
                break
            case 'scale-down':
                setWidth(width / 1.2)
                setHeight(height / 1.2)
                break
            case 'one-to-one':
                fabric.Image.fromURL(
                    img.src,
                    (img) => {
                        canvas.current.setBackgroundImage(
                            img,
                            canvas.current.renderAll.bind(canvas.current),
                            {
                                scaleX: canvas.current.width / img.width,
                                scaleY: canvas.current.height / img.height
                            }
                        )
                    }
                )
                break;
            case 'reset':
                break;
            case 'rotate-left':

                break;
            case 'rotate-right':

                break;
            case 'flip-horizontal':

                break;
            case 'flip-vertical':

                break;
            case 'add-text':
                handleAddText()
                break
            default:
                break;
        }
    }
    useEffect(() => {
        canvas.current = canvas.current
            || new fabric.Canvas('canvas', {
                width: 500, height: 300,
            })

        fabric.Object.prototype.cornerStyle = "circle";
        fabric.Object.prototype.cornerColor = "#2d8cf0";
        fabric.Object.prototype.borderColor = '#2d8cf0';
        fabric.Object.prototype.transparentCorners = false;
        canvas.current.hoverCursor = 'pointer';
        fabric.Image.fromURL(
            img.src,
            (i) => {
                canvas.current.setBackgroundImage(
                    i,
                    canvas.current.renderAll.bind(canvas.current),
                    {
                        top: (300 - img.height) / 2,
                        left: (500 - img.width) / 2,
                    }
                )
            }
        )
        changeImg()
    }, []);
    const handleDownload = () => {

    }
    const downloadURI = (uri, name) => {

    }
    return (
        <div className="text-gif-mask-content">
            <div className='text-gif-mask-img'>
                <canvas id="canvas" style={{
                    border: '1px solid #ccc'
                }}></canvas>
            </div>
            <div className='text-gif-mask-tool'>
                {options.map((item) => (<div className='text-gif-mask-tool-item' onClick={() => handleClick(item.type)} key={item.type}>{item.name}</div>))}
                <div className='download' onClick={handleDownload}>下载</div>
            </div>
        </div>
    );
}

export default Content;
