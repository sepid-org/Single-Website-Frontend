import React, { useEffect, useRef } from 'react';
import { useState, useCallback } from 'react';
import { Button, Container, Grid } from '@mui/material';
import '@xyflow/react/dist/style.css';
import AddIcon from '@mui/icons-material/Add';
//import CreateFSMDialog from '../dialogs/CreateFSMDialog';
import { MarkerType, useViewport } from '@xyflow/react';
import { ReactFlow, Controls, Background, applyNodeChanges, addEdge, ReactFlowProvider, useReactFlow} from '@xyflow/react';
import { CourseMapNodeInfo } from 'commons/types/global';
import StateNodeEditMode from 'commons/components/molecules/StateNodeEditMode';
import { FloatingConnectionLine, FloatingCustomEdge } from 'commons/components/molecules/FloatingEdge';
import CreateNewStateDialog from '../dialogs/CreateNewStateDialog';

const sampleNodes: CourseMapNodeInfo[] = [
    {
        data: {label: "این استیت اوله", isFirstNode: true,},
        id: "1",
        position: {x: 0, y: 0},
        type: "stateNode",
        draggable: true
    },
    {
        data: {label: "این یک استیت است", isFirstNode: false,},
        id: "2",
        position: {x: 300, y: 0},
        type: "stateNode",
        draggable: true
    },
    {
        data: {label: " kjugilougpihiqoiejhf09q47rihاستیت رندوم", isFirstNode: false,},
        id: "3",
        position: {x: 500, y: 0},
        type: "stateNode",
        draggable: true
    }
];

const nodeTypes = { stateNode: StateNodeEditMode };
const edgeTypes = {floating: FloatingCustomEdge};

export default function CourseMapEditorProvider(){
    return(
        <ReactFlowProvider>
            <CourseMapEditor />
        </ReactFlowProvider>
    );
}

function CourseMapEditor(){

    const [nodes, setNodes] = useState(sampleNodes);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //change values of width and height to 100%
    return(
        <Container 
            sx={{ 
                width: "100vw",
                height: "100vh",
            }}
            maxWidth={false}
        >
            <FlowCanva nodes={nodes} setNodes={setNodes}/>
        <Grid 
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={"row-reverse"}
        >
            <Grid item xs={3}>
                <Button
                    sx={{width: "100%"}}
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                    گام جدید
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button 
                    sx={{width: "100%"}}
                    variant="contained"
                >
                    ذخیره
                </Button>
            </Grid>
        </Grid>
        <CreateNewStateDialog 
            open={open}
            onClose={handleClose}
            nodes={nodes}
            setNodes={setNodes}
        />
      </Container>
    );
}


function FlowCanva({nodes, setNodes}){
    
    const [edges, setEdges] = useState([]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );

    const onConnect = useCallback(
        ((connection) => {
            const doubleEdge = edges.filter((edge) => {
                return edge.source === connection.source && edge.target === connection.target;
            });
            if(doubleEdge.length > 0){
                return;
            }
            const source = connection.target;
            const target = connection.source;
            let visited = [];
            let toExplore = [source];
            while(toExplore.length > 0){
                const sourceEdges = edges.filter((edge) => {
                    return edge.source === toExplore[0];
                });
                for(let edge of sourceEdges){
                    if(!visited.includes(edge.target)){
                        visited.push(edge.target);
                        toExplore.push(edge.target);
                    }
                }
                toExplore.shift();
            }
            if(!visited.includes(target)){
                const newEdge = {...connection,  type: 'floating', markerEnd: { type: MarkerType.Arrow, color: "black" }};
                console.log(newEdge);
                setEdges((eds) => addEdge(newEdge, eds));
            }
        }),
        [edges,setEdges],
    );

    const isOverlapping = (node1, node2) => {
        const node1element = document.getElementById(node1.id);
        const node2element = document.getElementById(node2.id);
        return (
            node1.position.x < node2.position.x + node2element.offsetWidth &&
            node1.position.x + node1element.offsetWidth > node2.position.x &&
            node1.position.y < node2.position.y + node2element.offsetHeight &&
            node1.position.y + node1element.offsetHeight > node2.position.y
        );
    };
    const avoidOverlap = (newNode, nodes) => {
        let adjustedNode = { ...newNode };
      
        for (const node of nodes) {
            if (node.id != newNode.id && isOverlapping(newNode, node)) {
                adjustedNode.position = dragStartPosition.current;
            }
        }
        return adjustedNode;
    };
    const onNodeDragStop = useCallback(
        (event, node) => {
          const newNodes = nodes.map((n) => (n.id === node.id ? avoidOverlap(node, nodes) : n));
          setNodes(newNodes);
        },
        [nodes]
    );

    const dragStartPosition = useRef(0);
    const onNodeDragStart = useCallback((event, node) => {
        dragStartPosition.current = node.position;
    }, []);

    const onEdgeContextMenu = (event, edge) => {
        event.preventDefault();
        if (window.confirm('آیا می‌خواهید یال را خذف کنید؟')) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
    };


    const { fitView } = useReactFlow();
    const containerRef = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                fitView();
            }
        };
  
        window.addEventListener('resize', handleResize);
        handleResize();
  
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [fitView]);


    return(
        <Container 
                sx={{height: "90%", width: "100%"}} 
                maxWidth={false}
                ref={containerRef}
            >
                <ReactFlow 
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes} 
                    onNodesChange={onNodesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onNodeDragStart={onNodeDragStart}
                    onEdgeContextMenu={onEdgeContextMenu}
                    connectionLineComponent={FloatingConnectionLine}
                >
                <Background />
                <Controls />
                </ReactFlow>
            </Container>
    );
}