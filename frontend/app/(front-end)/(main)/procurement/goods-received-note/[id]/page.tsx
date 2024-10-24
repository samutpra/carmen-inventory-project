"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import GoodsReceiveNoteComponent from '../../components/GoodsReceiveNoteComponent';
import { GoodsReceiveNoteType } from '../../type/procurementType';

const GoodsReceivedNoteByIDPage = () => {
    const params = useParams();
    const id = params.id as string;
    const mode = id === GoodsReceiveNoteType.CREATE ? GoodsReceiveNoteType.CREATE : GoodsReceiveNoteType.VIEW;

    return (
        <GoodsReceiveNoteComponent id={id} grnMode={mode} />
    );
};

export default GoodsReceivedNoteByIDPage;
