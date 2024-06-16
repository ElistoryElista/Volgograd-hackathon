import type { Schema, Attribute } from '@strapi/strapi';

export interface DescriptionsDescriptions extends Schema.Component {
  collectionName: 'components_descriptions_descriptions';
  info: {
    displayName: 'descriptions';
    icon: 'brush';
    description: '';
  };
  attributes: {
    content: Attribute.Text & Attribute.Required;
    number: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
        max: 3;
      }>;
    title: Attribute.String;
  };
}

export interface InformativeBlockInformativeBlock extends Schema.Component {
  collectionName: 'components_informative_block_informative_blocks';
  info: {
    displayName: 'informative_block';
    icon: 'file';
    description: '';
  };
  attributes: {
    block_links: Attribute.Component<'link.link', true>;
    title: Attribute.String;
    content: Attribute.Text & Attribute.Required;
    images: Attribute.Media;
  };
}

export interface LinkLink extends Schema.Component {
  collectionName: 'components_link_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface ListList extends Schema.Component {
  collectionName: 'components_list_lists';
  info: {
    displayName: 'list';
    icon: 'bulletList';
  };
  attributes: {
    content: Attribute.String & Attribute.Required;
  };
}

export interface SchedulesSchedules extends Schema.Component {
  collectionName: 'components_schedules_schedules';
  info: {
    displayName: 'schedules';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    date: Attribute.Date & Attribute.Required;
    time: Attribute.Time & Attribute.Required;
    price: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    duration: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
  };
}

export interface TourScheduleTourSchedule extends Schema.Component {
  collectionName: 'components_tour_schedule_tour_schedules';
  info: {
    displayName: 'tour-schedule';
    icon: 'car';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'\u0414\u0435\u043D\u044C 1'>;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface WorkTimeWorkTime extends Schema.Component {
  collectionName: 'components_work_time_work_times';
  info: {
    displayName: 'work_time';
    icon: 'clock';
  };
  attributes: {
    start: Attribute.Time & Attribute.Required;
    end: Attribute.Time & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'descriptions.descriptions': DescriptionsDescriptions;
      'informative-block.informative-block': InformativeBlockInformativeBlock;
      'link.link': LinkLink;
      'list.list': ListList;
      'schedules.schedules': SchedulesSchedules;
      'tour-schedule.tour-schedule': TourScheduleTourSchedule;
      'work-time.work-time': WorkTimeWorkTime;
    }
  }
}
