import React, {FunctionComponent, ReactNode, useEffect, useRef, useState} from "react"
import {css, cx} from 'emotion'
import throttle from "lodash/throttle";

type Props = {
    children?:ReactNode,
}

const TragBox:FunctionComponent<Props>=({
    children
})=>{
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const boxRef = useRef(null);
    const [left,setLeft]=useState(vw - 60)
    const [top,setTop]=useState(vh - 140)
    const [boxW,setBoxW]=useState(0);
    const [boxH,setBoxH]=useState(0);
    const [moving,setMoving]=useState(false);

    const handleTouchStart=()=>{
        setMoving(true);
    }
    const handleTouchMove = (e:any,boxW:number,boxH:number) => {
        // if (!moving) return;
        e.stopPropagation();
        e.preventDefault();
        const point = e.touches && e.touches[0];
        const { clientX, clientY } = point;
        handlerPoing(clientX, clientY, boxW, boxH);
    };
    const handlerPoing=(x:number, y:number, boxW:number , boxH:number) => {
        x -= boxW;
        y -= boxH;
        if (x <= 0) {
            x = 0;
        } else if (x >= vw - boxW * 2) {
            x = vw - boxW * 2;
        }
        if (y <= 100) {
            y = 100;
        } else if (y >= vh - boxH * 2) {
            y = vh - boxH * 2;
        }
        setLeft(x);
        setTop(y);
    }
    const handleEnd=({ changedTouches }:any) =>{
            setMoving(false);
            const point = changedTouches && changedTouches[0];
            const { clientX = 0 } = point || {};
            const left = clientX <= vw / 2 ? 0 : vw - boxW * 2;
            setLeft(left);
    }
    
    useEffect(()=>{
        const boxEl:any=boxRef.current;
        setBoxW(boxEl.clientWidth/2);
        setBoxH(boxEl.clientHeight/2);
        boxEl.addEventListener('touchmove', (e:any)=>handleTouchMove(e,boxEl.clientWidth/2,boxEl.clientHeight/2), { passive: false })
        setLeft(vw-boxEl.clientWidth);
    },[])

    return(
        <div className={css`
            position: fixed;
            left:${left}px;
            top:${top}px;
            border-radius:8px;
            transition-duration:${ moving ?0:300}ms ;
            touch-action: none;
        `}
            ref={boxRef}
            onTouchStart={handleTouchStart}
            // onTouchMove={(e)=>handleTouchMove(e,boxW,boxH)}
            onTouchEnd={handleEnd}
            onTouchCancel={handleEnd}
        >
            {children&&children}
        </div>
    )
} 

export default TragBox;

