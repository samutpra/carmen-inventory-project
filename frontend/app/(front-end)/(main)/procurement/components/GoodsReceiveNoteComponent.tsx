import React from 'react'

type Props = {
    id?: string
    mode?: string | null
}

const GoodsReceiveNoteComponent: React.FC<Props> = ({ id, mode }) => {
    return (
        <div>GoodsReceiveNoteComponent with {id} and mode {mode}</div>
    )
}

export default GoodsReceiveNoteComponent