import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const NewsPage = (props: Props) => {
  const {newsId} = useParams()

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">NewsPage {newsId}</div>
  )
}

export default NewsPage