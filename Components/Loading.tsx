import React from 'react'

type Props = {
  style?: any;
}

export default function Loading({
  style = {}
}: Props) {
  return (
    <div style={style}>Loading...</div>
  )
}