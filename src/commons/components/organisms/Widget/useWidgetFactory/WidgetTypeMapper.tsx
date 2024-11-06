import { FC } from 'react';
import BigAnswerProblemWidget, { BigAnswerQuestionEditWidget } from '../questions/BigAnswerProblemWidget';
import ImageWidget, { ImageEditWidget } from '../contents/ImageWidget';
import IframeWidget, { IframeEditWidget } from '../contents/IframeWidget';
import MultiChoiceQuestionWidget, { MultiChoiceQuestionEditWidget } from '../questions/MultiChoiceQuestion';
import SmallAnswerProblemWidget, { SmallAnswerProblemEditWidget } from '../questions/SmallAnswerProblemWidget';
import TextWidget, { TextEditWidget } from '../contents/TextWidget';
import UploadFileProblemWidget, { UploadFileProblemEditWidget } from '../questions/UploadFileProblemWidget';
import VideoWidget, { VideoEditWidget } from '../contents/VideoWidget';
import AudioWidget, { AudioEditWidget } from '../contents/AudioWidget';
import DetailBoxWidget, { DetailBoxEditDialog } from '../contents/DetailBoxWidget';
import {
  useSubmitShortAnswerMutation,
  useSubmitLongAnswerMutation,
  useSubmitMultiChoiceAnswerMutation,
  useSubmitUploadFileAnswerMutation,
} from 'commons/redux/apis/cms/response/Answer';
import Placeholder, { EditablePlaceholder } from '../contents/Placeholder';
import ButtonWidget from '../others/ButtonWidget';
import ButtonWidgetEditor from '../others/ButtonWidget/edit';

// Define types for widget configuration
interface WidgetConfig {
  WidgetComponent: FC<any>;
  EditWidgetDialog: FC<any>;
  label: string;
  backendType: string;
  useSubmitAnswerMutation?: () => any;
}

type WidgetRegistryType = {
  [key: string]: WidgetConfig;
}

const WIDGET_REGISTRY: WidgetRegistryType = {
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerProblemWidget,
    EditWidgetDialog: SmallAnswerProblemEditWidget,
    label: 'سوال کوتاه‌پاسخ',
    backendType: 'SmallAnswerProblem',
    useSubmitAnswerMutation: useSubmitShortAnswerMutation,
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerProblemWidget,
    EditWidgetDialog: BigAnswerQuestionEditWidget,
    label: 'سوال تشریحی',
    backendType: 'BigAnswerProblem',
    useSubmitAnswerMutation: useSubmitLongAnswerMutation,
  },
  MultiChoiceProblem: {
    WidgetComponent: MultiChoiceQuestionWidget,
    EditWidgetDialog: MultiChoiceQuestionEditWidget,
    label: 'سوال چند‌گزینه‌ای',
    backendType: 'MultiChoiceProblem',
    useSubmitAnswerMutation: useSubmitMultiChoiceAnswerMutation,
  },
  UploadFileProblem: {
    WidgetComponent: UploadFileProblemWidget,
    EditWidgetDialog: UploadFileProblemEditWidget,
    label: 'ارسال فایل',
    backendType: 'UploadFileProblem',
    useSubmitAnswerMutation: useSubmitUploadFileAnswerMutation,
  },
  TextWidget: {
    WidgetComponent: TextWidget,
    EditWidgetDialog: TextEditWidget,
    label: 'متن',
    backendType: 'TextWidget',
  },
  Placeholder: {
    WidgetComponent: Placeholder,
    EditWidgetDialog: EditablePlaceholder,
    label: 'جانگهدار',
    backendType: 'Placeholder',
  },
  DetailBoxWidget: {
    WidgetComponent: DetailBoxWidget,
    EditWidgetDialog: DetailBoxEditDialog,
    label: 'نکته',
    backendType: 'DetailBoxWidget',
  },
  Image: {
    WidgetComponent: ImageWidget,
    EditWidgetDialog: ImageEditWidget,
    label: 'تصویر',
    backendType: 'Image',
  },
  Video: {
    WidgetComponent: VideoWidget,
    EditWidgetDialog: VideoEditWidget,
    label: 'فیلم',
    backendType: 'Video',
  },
  Audio: {
    WidgetComponent: AudioWidget,
    EditWidgetDialog: AudioEditWidget,
    label: 'صوت',
    backendType: 'Audio',
  },
  Iframe: {
    WidgetComponent: IframeWidget,
    EditWidgetDialog: IframeEditWidget,
    label: 'بازی',
    backendType: 'Iframe',
  },
  ButtonWidget: {
    WidgetComponent: ButtonWidget,
    EditWidgetDialog: ButtonWidgetEditor,
    label: 'دکمه',
    backendType: 'ButtonWidget',
  },
};

export type { WidgetConfig, WidgetRegistryType };
export default WIDGET_REGISTRY;