import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useGetFSMStatesQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import {
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
  useGetAttributeQuery,
  useUpdateAttributeMutation,
} from "apps/website-display/redux/features/object/AttributeSlice";
import { useFSMContext } from "commons/hooks/useFSMContext";
import { FSMStateType } from "commons/types/models";
import { TransitionType } from "commons/types/object/attribute";
import React, { useEffect, useState } from "react";

interface Props {
  objectId: number;
  transitionId?: number;
}

function TransitionForm({ objectId, transitionId }: Props) {
  const { fsmId } = useFSMContext();
  const { data: fsmStates } = useGetFSMStatesQuery({ fsmId });

  const [order, setOrder] = useState<number | "">("");
  const [isBackward, setIsBackward] = useState(false);
  const [selectedState, setSelectedState] = useState<FSMStateType | null>(null);

  const { data: initialData, isFetching } = useGetAttributeQuery(transitionId!, {
    skip: !transitionId,
  });
  const transition = initialData as TransitionType | undefined;

  useEffect(() => {
    if (transition) {
      setOrder(transition.order ?? "");
      setIsBackward(transition.is_backward || false);
      const st = fsmStates.find((s) => parseInt(s.id) === transition.destination_state_id) || null;
      setSelectedState(st);
    }
  }, [transition, fsmStates]);

  const [createAttr, createState] = useCreateAttributeMutation();
  const [updateAttr, updateState] = useUpdateAttributeMutation();
  const [deleteAttr, deleteState] = useDeleteAttributeMutation();

  const handleSubmit = async () => {
    const payload = {
      objectId,
      type: "Transition",
      title: `Transition to state ${selectedState.id}`,
      order: order === "" ? undefined : Number(order),
      is_backward: isBackward,
      destination_state_id:
        isBackward || selectedState.id === ""
          ? undefined
          : Number(selectedState.id),
    };

    try {
      if (transitionId) {
        await updateAttr({ id: transitionId, body: payload }).unwrap();
      } else {
        await createAttr(payload as any).unwrap();
      }
    } catch (_) {
    }
  };

  const handleDelete = async () => {
    if (!transitionId) return;
    const ok = window.confirm("آیا از حذف این ترنزیشن مطمئنید؟");
    if (!ok) return;
    try {
      await deleteAttr({ id: transitionId, objectId }).unwrap();
      setOrder("");
      setIsBackward(false);
      setSelectedState(null);
    } catch (_) {
    }
  };

  const loading =
    createState.isLoading ||
    updateState.isLoading ||
    deleteState.isLoading ||
    isFetching;
  const success =
    createState.isSuccess || updateState.isSuccess || deleteState.isSuccess;
  const error =
    createState.error || updateState.error || deleteState.error;

  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        {transitionId ? "ویرایش ترنزیشن:" : "ایجاد ترنزیشن:"}
      </Typography>

      <Stack spacing={1}>
        <TextField
          label="ترتیب اجرا"
          type="number"
          value={order}
          onChange={(e) =>
            setOrder(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

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
            getOptionLabel={(option) => option.title ?? `State ${option.id}`}
            value={selectedState}
            onChange={(_, newValue) => {
              setSelectedState(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="گام مقصد" placeholder="یک گام را انتخاب کنید" required />
            )}
            sx={{ minWidth: 250 }}
            disableClearable
          />
        )}

        {success && (
          <Typography color="success.main">
            عملیات با موفقیت انجام شد.
          </Typography>
        )}
        {error && (
          <Typography color="error.main">
            {(error as any)?.data?.detail || "خطایی رخ داد."}
          </Typography>
        )}

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading && !deleteState.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "ثبت"
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
                "حذف ترنزیشن"
              )}
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TransitionForm;