import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useGetFSMEdgesQuery, useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useCreateFSMEdgeMutation, useDeleteFSMEdgeMutation, useUpdateFSMEdgeMutation } from 'apps/fsm/redux/slices/fsm/EdgeSlice';
import EdgeEditorButton from 'commons/components/molecules/EdgeEditorButton';

type IndexPropsType = {}

const Edges: FC<IndexPropsType> = ({ }) => {
  const { fsmId } = useParams()
  const newEdgeInitialValue = {
    tail: '',
    head: '',
    is_visible: true,
    is_back_enabled: true,
  }
  const [newEdge, setNewEdge] = useState(newEdgeInitialValue);
  const { data: fsmStates = [] } = useGetFSMStatesQuery({ fsmId });
  const { data: fsmEdges = [] } = useGetFSMEdgesQuery({ fsmId });
  const [createFSMEdge, createFSMEdgeResult] = useCreateFSMEdgeMutation();

  const handleCreateFSMEdge = () => {
    if (!newEdge.head || !newEdge.tail) {
      return;
    }
    createFSMEdge(newEdge as any);
  }

  useEffect(() => {
    if (createFSMEdgeResult.isSuccess) {
      setNewEdge(newEdgeInitialValue);
    }
  }, [createFSMEdgeResult])

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' className='my-other-step'>شروع</TableCell>
              <TableCell align='center'>پایان</TableCell>
              <TableCell align='center'>قابل مشاهده</TableCell>
              <TableCell align='center'>دو طرفه</TableCell>
              <TableCell align='center'>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>
                <FormControl fullWidth size='small' variant="outlined">
                  <InputLabel>شروع</InputLabel>
                  <Select
                    value={newEdge.tail}
                    onChange={(e) => {
                      setNewEdge({
                        ...newEdge,
                        tail: e.target.value,
                      })
                    }}
                    label='شروع'>
                    {fsmStates.map((state) => (
                      <MenuItem key={state.id} value={state.id}>{state.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl >
              </TableCell>
              <TableCell align='center'>
                <FormControl fullWidth size='small' variant="outlined">
                  <InputLabel>پایان</InputLabel>
                  <Select
                    value={newEdge.head}
                    onChange={(e) => {
                      setNewEdge({
                        ...newEdge,
                        head: e.target.value,
                      })
                    }}
                    label='پایان'>
                    {fsmStates.map((state) => (
                      <MenuItem key={state.id} value={state.id}>{state.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl >
              </TableCell>
              <TableCell align='center'>
                <Checkbox
                  checked={newEdge.is_visible}
                  onChange={() => {
                    setNewEdge({
                      ...newEdge,
                      is_visible: !newEdge.is_visible,
                    })
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell align='center'>
                <Checkbox
                  checked={newEdge.is_back_enabled}
                  onChange={() => {
                    setNewEdge({
                      ...newEdge,
                      is_back_enabled: !newEdge.is_back_enabled,
                    })
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell align='center'>
                <Button
                  onClick={handleCreateFSMEdge}
                  variant='contained' color='primary'>
                  {'ایجاد'}
                </Button>
              </TableCell>
            </TableRow>
            {fsmEdges?.map((edge, index) =>
              <TableRow key={index}>
                <TableCell align='center'>
                  {fsmStates.find(fsmState => fsmState.id === edge.tail)?.title}
                </TableCell>
                <TableCell align='center'>
                  {fsmStates.find(fsmState => fsmState.id === edge.head)?.title}
                </TableCell>
                <TableCell align='center'>
                  {edge.is_visible ? '✅' : '❌'}
                </TableCell>
                <TableCell align='center'>
                  {edge.is_back_enabled ? '✅' : '❌'}
                </TableCell>
                <TableCell align='center'>
                  <EdgeEditorButton id={edge.id} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Edges;
