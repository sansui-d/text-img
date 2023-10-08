import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import { TwitterPicker } from 'react-color';
import './index.less';

const options = [
    {
        name: '还原',
        type: 'reset',
    },
    {
        name: '添加文字',
        type: 'add-text',
    },
    {
        name: '文字颜色',
        type: 'color',
    },
    {
        name: '下载',
        type: 'download',
    }
]
function Content(props) {
    const { img } = props;
    const [width, setWidth] = useState(img.width);
    const [height, setHeight] = useState(img.height);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [angle, setAngle] = useState(0);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const maskRef = useState(null);
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
                        scaleX: img.width > 800 ? canvas.current.width / img.width : 1,
                        scaleY: img.height > 600 ? canvas.current.height / img.height : 1
                    }
                )
            }
        )
    }, [scaleX, scaleY, angle])
    const handleShowColorPicker = () => {
        setShowColorPicker(true)
    }
    const handleChangeColor = (color) => {
        const activeTxt = canvas.current.getActiveObjects();
        if (!activeTxt) return
        activeTxt.forEach((item) => {
            item.set('fill', color)
        })


        canvas.current.renderAll()
        setShowColorPicker(false)
    }
    const handleClick = (type) => {
        switch (type) {
            case 'reset':
                canvas.current.setViewportTransform([1, 0, 0, 1, 0, 0]);
                break;
            case 'add-text':
                handleAddText()
                break;
            case 'color':
                handleShowColorPicker()
                break;
            case 'download':
                handleDownload()
                break
            default:
                break;
        }
    }
    const handleKeydown = (e) => {
        if (e.key === 'Backspace') {
            const activeTxt = canvas.current.getActiveObjects();
            if (!activeTxt) return

            activeTxt.map((item) => {
                canvas.current.remove(item)
            })
            canvas.current.discardActiveObject()
            canvas.current.renderAll()
        }
    }
    useEffect(() => {
        canvas.current = canvas.current
            || new fabric.Canvas('canvas', {
                width: img.width > 800 ? 800 : img.width, height: img.height > 600 ? 600 : img.height,
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
                        // top: (300 - img.height) / 2,
                        // left: (500 - img.width) / 2,
                    }
                )
            }
        )
        canvas.current.on('mouse:wheel', opt => {
            const delta = opt.e.deltaY // 滚轮，向上滚一下是 -100，向下滚一下是 100
            let zoom = canvas.current.getZoom() // 获取画布当前缩放值
            zoom *= 0.999 ** delta
            if (zoom > 20) zoom = 20 // 限制最大缩放级别
            if (zoom < 0.01) zoom = 0.01 // 限制最小缩放级别

            // 以鼠标所在位置为原点缩放
            canvas.current.zoomToPoint(
                { // 关键点
                    x: opt.e.offsetX,
                    y: opt.e.offsetY
                },
                zoom // 传入修改后的缩放级别
            )
        })
        canvas.current.on('mouse:down', opt => { // 鼠标按下时触发
            let evt = opt.e
            if (evt.altKey === true) { // 是否按住alt
                canvas.current.isDragging = true // isDragging 是自定义的，开启移动状态
                canvas.current.lastPosX = evt.clientX // lastPosX 是自定义的
                canvas.current.lastPosY = evt.clientY // lastPosY 是自定义的
            }
        })

        canvas.current.on('mouse:move', opt => { // 鼠标移动时触发
            if (canvas.current.isDragging) {
                let evt = opt.e
                let vpt = canvas.current.viewportTransform // 聚焦视图的转换
                vpt[4] += evt.clientX - canvas.current.lastPosX
                vpt[5] += evt.clientY - canvas.current.lastPosY
                canvas.current.requestRenderAll() // 重新渲染
                canvas.current.lastPosX = evt.clientX
                canvas.current.lastPosY = evt.clientY
            }
        })

        canvas.current.on('mouse:up', opt => { // 鼠标松开时触发
            canvas.current.setViewportTransform(canvas.current.viewportTransform) // 设置此画布实例的视口转换  
            canvas.current.isDragging = false // 关闭移动状态
        })
        changeImg()
        document.addEventListener('keydown', handleKeydown)
    }, []);
    const handleDownload = () => {

    }
    const downloadURI = (uri, name) => {

    }
    return (
        <div className="text-gif-mask-content">
            <div className='text-gif-mask-img' ref={maskRef}>
                <canvas id="canvas" style={{
                    border: '1px solid #ccc'
                }}></canvas>
            </div>
            <div className='text-gif-mask-tool'>
                {options.map((item) => (
                    <div
                        className='text-gif-mask-tool-item'
                        onClick={() => handleClick(item.type)}
                        key={item.type}
                    >{item.name}{item.type === 'color' && showColorPicker &&
                        <div className='text-gif-mask-tool-item-color-picker'>
                            <TwitterPicker onChangeComplete={(color) => { handleChangeColor && handleChangeColor(color.hex) }} />
                        </div>}
                    </div>))}
            </div>
        </div>
    );
}

export default Content;
