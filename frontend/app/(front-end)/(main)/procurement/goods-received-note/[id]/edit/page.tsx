"use client";

import React from 'react';
import GoodsReceiveNoteComponent from '../../../components/GoodsReceiveNoteComponent';
import { GoodsReceiveNoteType } from '../../../type/procurementType';

interface Props {
    params: {
        id: string;
    };
}

const GoodsReceiveNoteEditPage: React.FC<Props> = ({ params }) => {
    const { id } = params;
    return (
        <GoodsReceiveNoteComponent id={id} mode={GoodsReceiveNoteType.EDIT} />
    );
}

export default GoodsReceiveNoteEditPage;
