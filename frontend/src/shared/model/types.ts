export type TLink = {
  id: number;
  title: string;
  url: string;
};

export type TRichText = {
  type: string;
  children: { text: string }[];
};

export type TResImage = {
  id: number;
  url: string;
  formats: {
    small?: { url: string };
    large?: { url: string };
    medium?: { url: string };
    thumbnail: { url: string };
  };
};

export type TSchedule = {
  duration?: number;
  id: number;
  date: string;
  time: string;
  price: number;
};

export type TImage = {
  id: number;
  url: string;
};

export type TSeat = {
  id: number;
  seat_number: number;
  row: number;
};

export type THall = { id: number; seats: TSeat[]; title: string };

export type TEvent = {
  id: number;
  short_description?: string;
  title: string;
  description: string;
  schedules: TSchedule[];
  organizational_phone: string;
  hall?: THall;
  place?: TPlace;
  type: string;
  preview_image: TResImage;
  tickets: TTicket[];
};

export type TTicket = {
  id: number;
  total_price: number;
  persons_count: number;
  seats: TSeat[];
  event: TEvent;
  is_paid: boolean;
  is_used: boolean;
  linkPay: string;
  schedule_id: number;
};

export type TPlace = {
  id: number;
  title: string;
  images: TResImage[];
  short_title?: string;
  description: string;
  rating: number;
  address: string;
  organizational_phone: string;
  email: string;
  site: string;
  audio_guide: { url: string };
  tags: { id: number; title: string }[];
  type?: { color: string; title: string; icon: TResImage };
  working_hours: TWorking_hours;
  working_hours_weekends: TWorking_hours;
  average_price: number;
  preview_image: TResImage;
  longitude: number;
  latitude: number;
  icon: TResImage;
  image_url?: string;
};

export type TInformationBlock = {
  id: number;
  title?: string;
  content: string;
  images?: TResImage[];
  block_links?: TLink[];
};

export type TWorking_hours = { id: number; start: string; end: string };

export type TReadyRoute = {
  id: number;
  title: string;
  description: string;
  preview_image: TResImage;
  places: TPlace[];
  isVisuallyImpaired: boolean;
  isHearingImpaired: boolean;
  isRestrictedInMovement: boolean;
  car: boolean;
  type?: string;
};

export type TExcursion = {
  id: number;
  title: string;
  description: string;
  organizational_phone: string;
  email: string;
  site: string;
  schedules: TSchedule[];
  description_list: { id: number; content: string }[];
  duration: number;
};

type TScheduleDescription = {
  id: number;
  title: string;
  description: string;
};

export type TTour = {
  id: number;
  title: string;
  description: string;
  organizational_phone: string;
  email: string;
  site: string;
  schedules: TSchedule[];
  schedule_descriptions: TScheduleDescription[];
};

export type TValhallaPoint = {
  lat: number;
  lon: number;
};
