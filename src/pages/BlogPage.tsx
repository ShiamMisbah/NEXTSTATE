import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const BlogPage = (props: Props) => {
    const {slug} = useParams()

  return (
    <div className = "bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">BlogPage {slug}</div>
  )
}

export default BlogPage