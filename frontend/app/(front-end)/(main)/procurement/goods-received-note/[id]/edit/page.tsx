"use client";

import React from 'react';
import { GoodsReceiveNoteType } from '../../../type/procurementType';
import GoodsReceiveNoteComponent from '../../components/GoodsReceiveNoteComponent';

interface Props {
    params: {
        id: string;
    };
}

const GoodsReceiveNoteEditPage: React.FC<Props> = ({ params }) => {
    const { id } = params;
    return (
        <GoodsReceiveNoteComponent id={id} grnMode={GoodsReceiveNoteType.EDIT} />
    );
}

export default GoodsReceiveNoteEditPage;
