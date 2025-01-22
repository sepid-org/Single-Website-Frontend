import { AcademicStudentshipType, SchoolStudentshipType, UserInfoType } from "./profile";
import { WidgetType } from "./widgets/widget";
import { ObjectType } from "./object/object";

export type PlayerRequestType = any;

export type FileType = {
  id: string;
  file: string;
};

export type ProgramContactInfoType = {
  phone_number: string;
  eitaa_link: string;
  bale_link: string;
  instagram_link: string;
  shad_link: string;
  telegram_link: string;
  rubika_link: string;
}

type AudienceTypeType = "All" | "Student" | "Academic";
type ProgramParticipationType = "Team" | "Individual";
type ProgramTypeType = 'Campaign' | 'Event' | 'Class' | 'Course' | 'Game';

export type ProgramType = {
  type: ProgramTypeType;
  slug: string;
  is_free: boolean;
  site_help_paper_id: string;
  FAQs_paper_id: string;
  show_scores: boolean;
  program_contact_info: ProgramContactInfoType;
  is_visible: boolean;
  accessible_after_closure: boolean;
  cover_page: string;
  creator: string;
  description: string;
  end_date: string | null;
  participation_type: ProgramParticipationType;
  id: string;
  is_active: boolean;
  is_approved: boolean;
  maximum_participant: number | null;
  name: string;
  initial_participants_count: number;
  final_participants_count: number;
  registration_form: string;
  start_date: string | null;
  team_size: number;
  is_public: boolean;
}

export type AnswerSheetTypeType = 'General' | 'RegistrationReceipt' | 'StateAnswerSheet';

export type InvitationType = any
export type CertificateType = any;
export type TeamType = {
  chat_room: string;
  id: string;
  members: RegistrationReceiptType[]
  name: string;
  registration_form: string;
  team_head: string;
};
export type AnswerType = any;

export type AnswerSheetType = {
  id: number;
  answer_sheet_type: AnswerSheetTypeType;
  answers: AnswerType[];
  created_at: string;
  updated_at: string;
}

export type RegistrationReceiptTypes = 'Waiting' | 'Rejected' | 'Accepted';

export type RegistrationReceiptType = AnswerSheetType & {
  form: string
  profile_image: string;
  is_paid: boolean;
  user: UserInfoType;
  school_studentship?: SchoolStudentshipType;
  academic_studentship?: AcademicStudentshipType;
  is_participating: boolean;
  certificate: CertificateType;
  team: TeamType | string;
  status: RegistrationReceiptTypes;
}

type StateTemplateTypes = 'normal' | 'board';
type PaperTypes = 'RegistrationForm';
type AcceptingStatusTypes = 'AutoAccept' | 'Manual';
type AudienceTypes = 'Student' | 'Academic' | 'All';
type FSMLearningTypes = 'Supervised' | 'Unsupervised';
type FSMPTypes = 'Individual' | 'Team' | 'Hybrid';

export type FSMType = ObjectType & {
  players_count: number;
  is_mentor: boolean;
  id: number;
  name: string;
  first_state: string;
  description: string;
  fsm_learning_type: FSMLearningTypes | '';
  fsm_p_type: FSMPTypes | '';
  program_slug: string;
  cover_page: string;
  is_active: boolean;
  is_visible: boolean;
  card_type: 'vertical1' | 'horizontal1';
  show_roadmap: boolean;
  participant_limit: number;
  duration: number;
};

type GenderPartitionType = 'OnlyMale' | 'OnlyFemale' | 'BothPartitioned' | 'BothNonPartitioned';

export type FormType = {
  audience_type: AudienceTypes;
  start_date: string;
  end_date: string;
}

export type RegistrationFormType = FormType & {
  accepting_status: AcceptingStatusTypes;
  gender_partition_status: GenderPartitionType;
  certificate_templates: any;
  certificates_ready: boolean;
  conditions: any;
  creator: string;
  duration: string;
  program: string;
  fsm: FSMType;
  has_certificate: boolean;
  id: string;
  is_exam: boolean;
  max_grade: number;
  min_grade: number;
  paper_type: PaperTypes;
  widgets: WidgetType[];
}
export type Article = any
export type Problem = any
export type Submission = any
export type SubmissionIsLoading = boolean
export type PaperType = ObjectType & {
  id: string;
  paper_type: string;
  widgets: WidgetType[]
}
export type FSMStateType = ObjectType & {
  papers: string[];
  name: string;
  fsm: string;
  inward_edges: FSMEdgeType[];
  outward_edges: FSMEdgeType[];
  template: StateTemplateTypes;
  show_appbar: boolean;
  is_end: boolean;
  type: string;
  draggable: boolean;
  data: Object;
};
export type Answer = any
export type WorkshopEdge = any
export type Token = any

export type UserPublicInfoType = {
  user_id: string;
  bio: string;
  gender: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export type LogoType = {
  mobile_image: string;
  desktop_image: string;
}

export type PartyType = {
  displayName: string;
  logo: LogoType;
};

export type InstituteType = {
  id: string;
  name: string;
  institute_type: 'School' | 'University' | 'Other';
  address?: string;
  province?: string;
  city?: string;
  postal_code?: number;
  phone_number?: string;
  contact_info?: string;
  description?: string;
  created_at?: string;
  is_approved?: boolean;
  owner?: string;
  creator?: string;
  admins?: string[];
}

export type SchoolType = InstituteType & {
  school_type: 'Elementary' | 'JuniorHigh' | 'High' | 'SchoolOfArt';
  gender_type: 'Male' | 'Female';
  principal_name?: string;
  principal_phone?: string;
}

export type UniversityType = InstituteType & {

}


export type MerchandiseType = {
  id: string;
  name: string;
  price: number;
  discounted_price: number;
  is_active: boolean;
  is_deleted: boolean;
}

export type DiscountCodeType = {
  id: string;
  code: string;
  value: number;
  expiration_date?: string;
  remaining: number;
  user?: UserPublicInfoType;
  merchandises: MerchandiseType[];
  discount_code_limit?: number;
}

export type VoucherType = any;

export type PurchaseType = {
  amount: number;
  authority?: string;
  callback_domain: string;
  created_at: string;
  discount_code: string;
  id: string;
  merchandise: string;
  payment_link: string;
  ref_id?: string;
  status: 'Started' | 'Success' | 'Repetitious' | 'Failed';
  uniq_code: string;
  user: string;
  voucher?: VoucherType;
}

export type PlayerType = {
  id: string;
  current_state: string;
  started_at: string;
  user?: string;
  last_visit?: string;
}

export type FSMStateMinimalType = {
  id: string;
  title: string;
}

export type FSMEdgeType = {
  tail: string;
  head: string;
  id: string;
  has_transition_lock?: boolean;
  is_visible: boolean;
  is_back_enabled?: boolean;
}

export type CurrencyType = any;

export type ProgramUserPermissions = {
  is_manager: boolean;
}

export type UserFSMStatusType = {
  fsm_id: number;
  is_user_mentor: boolean;
  finished_players_count: number;
  has_active_player: boolean;
  is_enabled_for_user: boolean;
}

export type PublicResourceType = ObjectType & {
  id: number;
  type: string;
  has_spent_on_object: boolean;
}

export type ResourceType = ObjectType & {
  id: number;
  type: string;
  content: JSON;
}