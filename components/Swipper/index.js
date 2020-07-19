import { useState } from 'react'


import style from './style.module.css'

export default function Swipper({ children, onPre, onNext }) {
    return (
        <div>
            {children}
            <div className={style.controlPanel}>
                <div className={style.changePage} onClick={onPre}>
                    上一页
            </div>
                <div className={style.changePage} onClick={onNext}
                    style={{ "marginLeft": "50px" }}>下一页</div>
            </div>
        </div>)
}