import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useFSMContext } from 'commons/hooks/useFSMContext';
import { FSMStateType } from 'commons/types/models';
import { TransitionType } from 'commons/types/object/attribute';

import { useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import {
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributeQuery,
  useUpdateAttributeMutation,
} from 'apps/website-display/redux/features/object/AttributeSlice';
import ConditionForm from './Condition';
import ConditionItem from './ConditionItem';


interface Props {
  objectId: number;
  transitionId?: number;
  onSuccess?: () => void;
}


export default function TransitionForm({
  objectId,
  transitionId,
  onSuccess,
}: Props) {
  /* ---------- داده‌های پایه ---------- */
  const { fsmId } = useFSMContext();
  const { data: fsmStates = [] } = useGetFSMStatesQuery({ fsmId });

  /* ---------- استیت فرم ترنزیشن ---------- */
  const [order, setOrder] = useState<number | ''>('');
  const [isBackward, setIsBackward] = useState(false);
  const [selectedState, setSelectedState] = useState<FSMStateType | null>(null);

  /* ---------- کوئری گرفتن ترنزیشن ---------- */
  const {
    data: initialData,
    isFetching,
    refetch,
  } = useGetAttributeQuery(transitionId!, { skip: !transitionId });

  const transition = initialData as TransitionType | undefined;

  /* ---------- پر کردن فرم هنگام ویرایش ---------- */
  useEffect(() => {
    if (!transition) return;
    setOrder(transition.order ?? '');
    setIsBackward(Boolean(transition.is_backward));
    const st =
      fsmStates.find(
        (s) => Number(s.id) === transition.destination_state_id,
      ) || null;
    setSelectedState(st);
  }, [transition, fsmStates]);

  /* ---------- تاکسونومی شرط‌ها ---------- */
  const conditionAttributes =
    transition?.attributes?.filter((a) => a.type === 'Condition') || [];

  /* ---------- mutationها ---------- */
  const [createAttr, createState] = useCreateAttributeMutation();
  const [updateAttr, updateState] = useUpdateAttributeMutation();
  const [deleteAttr, deleteState] = useDeleteAttributeMutation();

  /* ---------- سابمیت ---------- */
  const handleSubmit = async () => {
    const payload = {
      objectId,
      type: 'Transition',
      title: selectedState?.id
        ? `Transition to state ${selectedState.id}`
        : 'Backward Transition',
      order: order === '' ? undefined : Number(order),
      is_backward: isBackward,
      destination_state_id:
        isBackward || !selectedState?.id
          ? undefined
          : Number(selectedState.id),
    };

    try {
      if (transitionId) {
        await updateAttr({ id: transitionId, body: payload }).unwrap();
      } else {
        await createAttr(payload as any).unwrap();
      }
      refetch();
      onSuccess?.();
    } catch {
      /* silent */
    }
  };

  /* ---------- حذف ---------- */
  const handleDelete = async () => {
    if (!transitionId) return;
    if (!window.confirm('آیا از حذف این ترنزیشن مطمئنید؟')) return;

    try {
      await deleteAttr({ id: transitionId, objectId }).unwrap();
      setOrder('');
      setIsBackward(false);
      setSelectedState(null);
      onSuccess?.();
    } catch {
      /* silent */
    }
  };

  const handleDeleteCondition = async (condId: number) => {
    if (!window.confirm('حذف این شرط؟')) return;
    try {
      await deleteAttr({ id: condId, objectId }).unwrap();
      refetch();
    } catch {/* silent */ }
  };

  /* ---------- وضعیت UI ---------- */
  const loading =
    isFetching ||
    createState.isLoading ||
    updateState.isLoading ||
    deleteState.isLoading;

  const success =
    createState.isSuccess || updateState.isSuccess || deleteState.isSuccess;
  const error =
    createState.error || updateState.error || deleteState.error;

  /* ---------- دیالوگ شرط ---------- */
  const [condDialogOpen, setCondDialogOpen] = useState(false);
  const [editingCondId, setEditingCondId] = useState<number | undefined>();

  const openAddCondition = () => {
    setEditingCondId(undefined);
    setCondDialogOpen(true);
  };

  const openEditCondition = (id: number) => {
    setEditingCondId(id);
    setCondDialogOpen(true);
  };

  const closeCondDialog = () => setCondDialogOpen(false);

  /* ---------- رندر ---------- */
  return (
    <Stack spacing={2}>
      {/* فیلدهای ترنزیشن */}
      <FormControlLabel
        control={
          <Checkbox
            checked={isBackward}
            onChange={(e) => setIsBackward(e.target.checked)}
          />
        }
        label="بازگشت به عقب؟"
      />

      {!isBackward && (
        <Autocomplete
          options={fsmStates}
          disableClearable
          sx={{ minWidth: 250 }}
          getOptionLabel={(o) => o.title ?? `State ${o.id}`}
          value={selectedState}
          onChange={(_, v) => setSelectedState(v)}
          renderInput={(params) => (
            <TextField {...params} label="گام مقصد" required />
          )}
        />
      )}

      <TextField
        label="ترتیب اجرا"
        type="number"
        value={order}
        onChange={(e) =>
          setOrder(e.target.value === '' ? '' : Number(e.target.value))
        }
      />

      {/* پیام‌ها */}
      {success && (
        <Typography color="success.main">عملیات با موفقیت انجام شد.</Typography>
      )}
      {error && (
        <Typography color="error.main">
          {(error as any)?.data?.detail || 'خطایی رخ داد.'}
        </Typography>
      )}

      {/* دکمه‌های ثبت / حذف */}
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading && !deleteState.isLoading ? (
            <CircularProgress size={24} />
          ) : (
            'ثبت'
          )}
        </Button>

        {transitionId && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            disabled={deleteState.isLoading}
          >
            {deleteState.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              'حذف ترنزیشن'
            )}
          </Button>
        )}
      </Stack>

      {/* ───────── شرط‌ها ───────── */}
      {transitionId && (
        <Stack spacing={1}>
          <Typography variant="subtitle1">شرط‌های این ترنزیشن</Typography>

          {conditionAttributes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              شرطی تعریف نشده است.
            </Typography>
          ) : (
            <Paper variant="outlined">
              <List dense disablePadding>
                {conditionAttributes
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((c) => (
                    <ConditionItem
                      key={c.id}
                      cond={c}
                      onEdit={(id) => openEditCondition(id)}
                      onDelete={handleDeleteCondition}
                    />
                  ))}
              </List>
            </Paper>
          )}

          <Button size="small" variant="outlined" onClick={openAddCondition}>
            افزودن شرط
          </Button>
        </Stack>
      )}

      {/* ───────── دیالوگ شرط ───────── */}
      <Dialog open={condDialogOpen} onClose={closeCondDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCondId ? 'ویرایش شرط' : 'افزودن شرط'}
          <IconButton
            aria-label="close"
            onClick={closeCondDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <ConditionForm
            parentAttributeId={transitionId}      // نکتهٔ اصلی
            conditionId={editingCondId}
            onSuccess={() => {
              closeCondDialog();
              refetch();       // به‌روزرسانی لیست شرط‌ها
            }}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}