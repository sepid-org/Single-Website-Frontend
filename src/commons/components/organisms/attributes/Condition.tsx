// src/components/ConditionForm.tsx
import React, { useEffect, useState } from 'react';
import {
  Button, Checkbox, CircularProgress, FormControl, FormControlLabel,
  InputLabel, MenuItem, Select, Stack, TextField, Typography,
} from '@mui/material';
import {
  useCreateAttributeMutation, useDeleteAttributeMutation,
  useGetAttributeQuery, useUpdateAttributeMutation,
} from 'apps/website-display/redux/features/object/AttributeSlice';
import { ConditionAttributeType } from 'commons/types/object/attribute';


interface Props {
  objectId?: number;
  parentAttributeId?: number;
  conditionId?: number;
  onSuccess?: () => void;
}

type ConditionKey =
  | 'expected_correct_choices_in_last_answer_count'
  | 'expected_choices'
  | 'expected_choices_in_last_answer'
  | 'completed_fsms'
  | 'expected_last_answer_text';


export default function ConditionForm({
  objectId,
  parentAttributeId,
  conditionId,
  onSuccess,
}: Props) {

  /* ---------- state ها (همان قبلی) ---------- */
  const [order, setOrder] = useState<number | ''>('');
  const [conditionKey, setConditionKey] =
    useState<ConditionKey>('expected_correct_choices_in_last_answer_count');
  const [numberValue, setNumberValue] = useState<number | ''>('');
  const [idList, setIdList] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [isNot, setIsNot] = useState(false);

  /* ---------- API hooks ---------- */
  const { data: initialData, isFetching } = useGetAttributeQuery(conditionId!, {
    skip: !conditionId,
  });
  const condition = initialData as ConditionAttributeType | undefined;

  const [createAttr, createState] = useCreateAttributeMutation();
  const [updateAttr, updateState] = useUpdateAttributeMutation();
  const [deleteAttr, deleteState] = useDeleteAttributeMutation();

  /* ---------- پر کردن هنگام ویرایش ---------- */
  useEffect(() => {
    if (!condition) return;
    setOrder(condition.order ?? '');

    const v = (condition.value ?? {}) as { not?: boolean } & Record<string, any>;
    const key = (Object.keys(v).find((k) =>
      ['expected_correct_choices_in_last_answer_count',
        'expected_choices', 'expected_choices_in_last_answer',
        'completed_fsms', 'expected_last_answer_text'].includes(k),
    ) || 'expected_correct_choices_in_last_answer_count') as ConditionKey;

    setConditionKey(key);
    if (key === 'expected_last_answer_text') {
      setTextValue(v[key] ?? '');
    } else if (key === 'expected_correct_choices_in_last_answer_count') {
      setNumberValue(v[key] ?? '');
    } else {
      setIdList((v[key] || []).join(', '));
    }
    setIsNot(Boolean(v.not));
  }, [condition]);

  /* ---------- value ---------- */
  const buildValue = () => {
    const val: Record<string, any> = {};
    switch (conditionKey) {
      case 'expected_correct_choices_in_last_answer_count':
        val[conditionKey] = numberValue === '' ? 0 : Number(numberValue);
        break;
      case 'expected_choices':
      case 'expected_choices_in_last_answer':
      case 'completed_fsms':
        val[conditionKey] = idList.split(',')
          .map((s) => s.trim()).filter(Boolean).map(Number);
        break;
      case 'expected_last_answer_text':
        val[conditionKey] = textValue.trim();
        break;
    }
    if (isNot) val.not = true;
    return val;
  };

  /* ---------- submit ---------- */
  const handleSubmit = async () => {
    const payload = {
      objectId,                    // ممکن است undefined باشد
      parentAttributeId,           // یا این استفاده می‌شود
      type: 'Condition',
      title: 'Condition',
      order: order === '' ? undefined : Number(order),
      value: buildValue(),
    };

    try {
      if (conditionId) {
        await updateAttr({ id: conditionId, body: payload }).unwrap();
      } else {
        await createAttr(payload as any).unwrap();
      }
      onSuccess?.();
    } catch { }
  };

  /* ---------- delete ---------- */
  const handleDelete = async () => {
    if (!conditionId) return;
    if (!window.confirm('حذف شرط؟')) return;
    try {
      await deleteAttr({ id: conditionId, objectId: objectId ?? 0 }).unwrap();
      onSuccess?.();
    } catch { }
  };

  /* ---------- UI ---------- */
  const loading =
    isFetching ||
    createState.isLoading ||
    updateState.isLoading ||
    deleteState.isLoading;
  const success =
    createState.isSuccess || updateState.isSuccess || deleteState.isSuccess;
  const error =
    createState.error || updateState.error || deleteState.error;

  return (
    <Stack spacing={2}>
      <Typography variant="h6">
        {conditionId ? 'ویرایش شرط' : 'ایجاد شرط'}
      </Typography>

      {/* ترتیب */}
      <TextField
        label="ترتیب اجرا"
        type="number"
        size="small"
        value={order}
        onChange={(e) =>
          setOrder(e.target.value === '' ? '' : Number(e.target.value))
        }
      />

      {/* نوع شرط */}
      <FormControl fullWidth size="small">
        <InputLabel id="cond-key">نوع شرط</InputLabel>
        <Select
          labelId="cond-key"
          label="نوع شرط"
          value={conditionKey}
          onChange={(e) => setConditionKey(e.target.value as ConditionKey)}
        >
          <MenuItem value="expected_last_answer_text">
            متن آخرین پاسخ برابر باشد …
          </MenuItem>
          <MenuItem value="expected_correct_choices_in_last_answer_count">
            تعداد پاسخ درست در آخرین جواب
          </MenuItem>
          <MenuItem value="expected_choices">شامل آیتم‌های مشخص</MenuItem>
          <MenuItem value="expected_choices_in_last_answer">
            آیتم‌های مشخص در آخرین جواب
          </MenuItem>
          <MenuItem value="completed_fsms">اتمام چند FSM خاص</MenuItem>
        </Select>
      </FormControl>

      {/* ورودی‌های شرط */}
      {conditionKey ===
        'expected_correct_choices_in_last_answer_count' && (
          <TextField
            label="تعداد مورد انتظار"
            type="number"
            size="small"
            value={numberValue}
            onChange={(e) =>
              setNumberValue(
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
          />
        )}

      {['expected_choices',
        'expected_choices_in_last_answer',
        'completed_fsms'].includes(conditionKey) && (
          <TextField
            label="IDها را با کاما جدا کنید"
            size="small"
            value={idList}
            onChange={(e) => setIdList(e.target.value)}
          />
        )}

      {conditionKey === 'expected_last_answer_text' && (
        <TextField
          label="متن مورد انتظار"
          size="small"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      )}

      <FormControlLabel
        control={
          <Checkbox checked={isNot} onChange={(e) => setIsNot(e.target.checked)} />
        }
        label="نقیض شرط (not)"
      />

      {success && <Typography color="success.main">انجام شد.</Typography>}
      {error && <Typography color="error.main">
        {(error as any)?.data?.detail || 'خطایی رخ داد.'}
      </Typography>}

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading && !deleteState.isLoading ? (
            <CircularProgress size={24} />
          ) : 'ثبت'}
        </Button>
        {conditionId && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            disabled={deleteState.isLoading}
          >
            {deleteState.isLoading ? <CircularProgress size={24} /> : 'حذف'}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}