import { useCallback, useState } from 'react'
import Router from 'next/router'

import getKeywords from '../apis/getKeywords'

import debounce from '../utils/debounce'

import SearchBox from '../components/SearchBox'

import style from '../style/index.module.css'

export default function () {
  const [keywords, setKeywords] = useState([])

  const onSearch = useCallback(value => {
    Router.push(`/result?keyword=${encodeURI(value)}&offset=0`)
  }, [])

  const refreshKeywords = useCallback(value => {
    // debounce the refresh at a interval of 500ms
    const debounced = debounce(async () => {
      const res = await getKeywords(value).then(res => res.data)
      setKeywords(res)
    }, 500)

    debounced()
  }, [])

  return (
    <div className={style.page}>
      <div className={style.searchArea}>
        <div className={style.logoContainer}>
          <img src="/logo.png" className={style.logo}></img>
        </div>
        <div className={style.searchBoxContainer}>
          <SearchBox onSearch={onSearch} onChange={refreshKeywords} keywords={keywords}></SearchBox>
        </div>
      </div>
    </div>
  )

}
/*
export async function getServerSideProps() {
  const data = await search('vue')

  return {props:{
    data
  }}
}
*/