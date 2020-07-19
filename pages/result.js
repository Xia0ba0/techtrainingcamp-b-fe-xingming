import { useCallback, useState } from 'react'
import Router from 'next/router'

import search from '../apis/search'

import SearchBox from '../components/SearchBox'
import Swipper from '../components/Swipper'

import style from '../style/result.module.css'

export default function ({ data, keyword, offset }) {
    const [keywords] = useState([])

    const onSearch = useCallback(value => {
        Router.push(`/result?keyword=${encodeURI(value)}&offset=0`)
    })

    // when recommented keywords is not needed
    // do nothing
    const refreshKeywords = useCallback(value => {}, [])

    const onPre = useCallback(() => {
        const offset_pre = parseInt(offset) - parseInt(data.data.length)
        if (offset_pre >= 0) {
            Router.push(`/result?keyword=${encodeURI(keyword)}&offset=${offset_pre}`)
        }
    }, [offset])

    const onNext = useCallback(() => {
        const offset_next = parseInt(offset) + parseInt(data.data.length)
        Router.push(`/result?keyword=${encodeURI(keyword)}&offset=${offset_next}`)
    }, [offset])

    return (
        <div className={style.page}>
            <div className={style.searchArea}>
                <div className={style.yetAnotherLogo}>
                    <img src="/logo.png" className={style.logoImage}></img>
                </div>
                <div className={style.yetAnotherSearchBox}>
                    <SearchBox
                        onSearch={onSearch}
                        onChange={refreshKeywords}
                        keywords={keywords}
                        initValue={keyword}></SearchBox>
                </div>
            </div>
            <div className={style.resultArea}>
                <div className={style.reminder}>
                    <span className={style.textLogoFront}>Search</span>
                    <span className={style.textLogoBack}>Hub</span>
                    <span>为您找到{data.total}条搜索结果</span>
                </div>
                <div className={style.result}>
                    <Swipper onPre={onPre} onNext={onNext}>
                        {data.data.map((record, index) => (
                            <div className={style.card} key={index}>
                                <div className={style.cardTitle}>
                                    <a href={record.link_url} target="view_window">{record.title}</a>
                                </div>
                                <div className={style.cardDescription}>
                                    {record.description}
                                </div>
                                <div className={style.cardTail}>
                                    {record.create_time_string}
                                    <div className={style.tagGroup}>
                                        {record.tags.map((tag, index) =>
                                            (
                                                <span className={style.tag} key={index}>{tag}</span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Swipper>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    const { keyword, offset } = query
    const keyword_decoded = decodeURI(keyword)
    const data = await search(keyword_decoded, offset)

    return {
        props: {
            data: data,
            keyword: keyword_decoded,
            offset: offset
        }
    }
}