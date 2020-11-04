import React, {FunctionComponent, ReactNode, useEffect, useRef, useState} from "react"
import {css, cx} from 'emotion'
import {createPortal} from 'react-dom'

type Props = {
    open: boolean;
    onClose: () => void;
    zIndex?: number;
    children: ReactNode;
    duration?: number;
    width?: number;
}
const SearchModal: FunctionComponent<Props> = (
    {
        open,
        width = 720,
        onClose,
        zIndex = 1000,
        children,
        duration = 250,
    }) => {

    const [hidden, setHidden] = useState(!open);
    const wrapperRef = useRef(null);
    const [isEnd, setIsEnd] = useState(true);

    useEffect(() => {
        const root: any = wrapperRef.current;

        //处理滚动穿透
        function handleWheel(e: any) {
            e.stopPropagation();
            const hasVerticalScroll = e.deltaY !== 0

            if (hasVerticalScroll) {
                let target = e.target;
                let allowScroll = false;
                while (target !== root) {
                    const allowScrollUp = e.deltaY < 0 && target.scrollTop > 0;
                    const allowScrollDown =
                        e.deltaY > 0 &&
                        target.scrollTop < target.scrollHeight - target.clientHeight;
                    allowScroll = allowScrollUp || allowScrollDown;
                    if (allowScroll) break;
                    target = target.parentNode
                }
                if (!allowScroll) {
                    e.preventDefault()
                }
            }
        }

        root.addEventListener('wheel', handleWheel);
        return () => root.removeEventListener('wheel', handleWheel)
    }, []);

    useEffect(() => {
        let timer: any;
        if (open && hidden) {
            setHidden(false)
        } else if (!open && !hidden) {
            timer = setTimeout(() => {
                setHidden(true)
            }, duration)
        }
        return () => clearTimeout(timer)
    }, [open, hidden, duration]);

    useEffect(() => {
        if (open) {
            setIsEnd(false)
        }
    }, [open]);
    const modal = (
        <div
            ref={wrapperRef}
            className={css`
        background: rgba(31, 35, 41, 0.4);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: ${zIndex};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 0;
        box-sizing: border-box;
        opacity: ${open ? 1 : 0};
        pointer-events: ${open ? 'initial' : 'none'};
        transition: opacity ${duration}ms;
      `}
        >
            <div
                className={
                    open
                        ? cx(
                        css`
                  opacity: 1;
                  transform: scale(1);
                  transition: transform ${duration}ms;
                  height: 100%;
                  width: ${width}px;
                  background: #fff;
                  border-radius: 4px;
                  position: relative;
                `,
                        )
                        : cx(
                        css`
                  opacity: 0;
                  transition: opacity ${duration}ms;
                  height: 100%;
                  width: 720px;
                  background: #fff;
                  border-radius: 4px;
                  position: relative;
                `,
                        {
                            [css`
                    transform: scale(0.5);
                  `]: isEnd,
                        },
                        )
                }
                onTransitionEnd={() => {
                    if (!open) {
                        setIsEnd(true)
                    }
                }}
            >
                <div
                    onClick={onClose}
                    className={css`
            cursor: pointer;
            width: 20px;
            height: 20px;
            &:hover {
              color: #4e83fd;
            }
            color: #646a73;
            position: absolute;
            top: 18px;
            right: 32px;
          `}
                >
                    x
                </div>
                {!hidden && children}
            </div>
        </div>
    );
    return createPortal(modal, window.document.body)
};

export default SearchModal

