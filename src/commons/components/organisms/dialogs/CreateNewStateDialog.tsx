import React, { useState } from "react";
import { CourseMapNodeInfo } from "commons/types/global";
import { useViewport } from "@xyflow/react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';


interface createNewStateProps{
    open: boolean,
    onClose: () => void,
    nodes: CourseMapNodeInfo[],
    setNodes: React.Dispatch<React.SetStateAction<CourseMapNodeInfo[]>>,
}


const CreateNewStateDialog: React.FC<createNewStateProps> = ({onClose, open, nodes, setNodes}) => {
    const handleClose = () => {
        onClose();
    };
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const {x, y, zoom} = useViewport();
    const addNewNode = () => {
        setNodes([
            ...nodes,
            {
                data: {
                label: inputValue, 
                isFirstNode: false
                },
                id: (nodes.length + 1).toString(),
                position: {
                    x: -x / zoom,
                    y: -y / zoom
                },
                type: "stateNode",
                draggable: true
            }
        ]);
        onClose();
    }
    return(
        <Dialog
            open = {open}
        >
            <DialogTitle>ایجاد گام جدید</DialogTitle>
            <DialogContent>
                <TextField 
                    onChange={handleInputChange}
                    label="نام گام"
                />
                <Button onClick={addNewNode}>ایجاد</Button>
                <Button onClick={handleClose}>انصراف</Button>
            </DialogContent>
        </Dialog>
    );
}

export default CreateNewStateDialog;