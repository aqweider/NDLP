interface ProminentInitiativesProps {
  id: number;
  title: string;
  imageSrc: any;
  points: Array<PointProps>;
}
interface Committee {
  id: number;
  imageSrc: ImageProps;
  name: string;
  role: string;
}
interface AdvantageProps {
  id: number;
  title: string;
  description: string;
  imageSrc: ImageProps;
}
interface Partner {
  id: string;
  imageSrc: any;
  modalLogo: any;
  name: string;
  info: string;
  websiteUrl: string;
}
interface EnablerProps {
  id: number;
  name: string;
  imageSrc: ImageProps;
  background: ImageProps;
  fields: Array<EnablerFieldProps>;
}
interface EnablerFieldProps {
  id: number;
  name: string;
  description: string;
  content?: Array<EnablerContentProps>;
}

interface EnablerContentProps {
  id: number;
  name: string;
  text?: string;
  list: string[];
  textDone: string;
  link: { name: string; value: strinmg }[];
}
interface InvestorJourneyProps {
  id: number;
  parameter?: string;
  local: Array<InvestorsJourney>;
}

interface InvestorsJourney {
  id: number;
  name: string;
  nameIn: string;
  condition: string;
  content?: Array<JourneyContentProps>;
  tab: string;
}

interface JourneyContentProps {
  nameIn?: string;
  name: string;
  text: string;
  list: string[];
  textDone: string;
  link: {
    name: string;
    value: string;
  }[];
}

interface valuePropositionProps {
  id: string;
  title: string;
}

interface specificEnablementProps {
  id: string;
  title: string;
  description: string;
}

interface FieldItemProps {
  id: number;
  pdf: string;
  valueProposition: Array<valuePropositionProps>;
  specificEnablement: Array<specificEnablementProps>;
}

interface FieldProps {
  id: number;
  name: string;
  imageSrc: string;
  bgImageSrc: string;
  parentId: number;
}

interface SectorProps {
  id: number;
  name: string;
  description: string;
  color: string;
  imageSrc: string;
  fields: Array<FieldProps>;
}

interface VisionProgramProps {
  id: number;
  name: string;
  desc: string;
  imageSrc: any;
}

interface UserInfo {
  phone: number;
  name: string;
}

interface MarketInsightProps {
  id: string;
  name: string;
  parameter: string;
  imageSrc?: any;
  sector: number[];
  tabs?: {
    id?: string;
    name?: string;
    img?: string;
    content?: { id?: string | undifuned; title?: string; summary?: string }[];
  }[];
}
