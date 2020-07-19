import { useState, useCallback, useRef, useEffect } from 'react'

import style from './style.module.css'

export default function SearchBox({ onSearch, onChange, keywords, initValue }) {
    const [value, setValue] = useState('')
    const [active, setActive] = useState(false)
    const inputEl = useRef(null)

    useEffect(() => {
        if (initValue) {
            setValue(initValue)
            setActive(true)
        }
    }, [])

    const onType = useCallback((e) => {
        setValue(e.target.value)
        // cant't search empty string
        if (e.target.value) {
            onChange(e.target.value)
        }
    }, [onChange])

    const onKeydown = useCallback((e) => {
        if (e.which == 13) {
            onSearch(inputEl.current.value)
            e.preventDefault()
        }
    }, [onSearch])

    const onClickSearchIcon = useCallback(() => {
        onSearch(inputEl.current.value)
    }, [onSearch])
    const onClickKeyword = useCallback((keyword) => {
        onSearch(keyword)
    })


    return (
        <div>
            <div
                className={style.inputContent}
                style={{ border: (active ? "2px solid rgb(255,153,0)" : "2px solid #000000") }}
            >
                <input type="search"
                    value={value}
                    onChange={onType}
                    onKeyDown={onKeydown}
                    onClick={() => setActive(true)}
                    ref={inputEl}
                    className={style.inputBox}

                    placeholder="搜你想看"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off">
                </input>
                <i className={style.searchIcon} onClick={onClickSearchIcon}></i>
            </div>
            <div className={style.keywordList}>
                {
                    keywords.map((ele, index) => {
                        return (<div className={style.keyword} key={index} onClick={onClickKeyword.bind(this, ele.keyword)}>{ele.keyword}</div>)
                    })
                }
            </div>
        </div>
    )
}