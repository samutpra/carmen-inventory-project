import React from 'react'
import { FormAction } from '@/lib/types';

interface Props {
    id?: string;
    mvMode?: FormAction;
}


const ManageVendorComponent: React.FC<Props> = ({ id, mvMode }) => {
    return (
        <div>
            <p>id {id}</p>
            <p>mvMode {mvMode}</p>
        </div>
    )
}

export default ManageVendorComponent