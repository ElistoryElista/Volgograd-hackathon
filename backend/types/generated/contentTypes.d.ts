import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    phone: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 12;
      }>;
    pincode: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 4;
      }>;
    resetPasswordPincode: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 4;
        maxLength: 4;
      }>;
    tickets: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::ticket.ticket'
    >;
    favorite_places: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::place.place'
    >;
    avatar: Attribute.Media;
    trip_places: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::place.place'
    >;
    home: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::place.place'
    >;
    support_services: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::support-service.support-service'
    >;
    date_birth: Attribute.Date;
    isVisuallyImpaired: Attribute.Boolean;
    isHearingImpaired: Attribute.Boolean;
    isRestrictedInMovement: Attribute.Boolean;
    ready_routes: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::ready-route.ready-route'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiApplicationsExcursionApplicationsExcursion
  extends Schema.CollectionType {
  collectionName: 'applications_excursions';
  info: {
    singularName: 'applications-excursion';
    pluralName: 'applications-excursions';
    displayName: 'ApplicationsExcursion';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    schedule: Attribute.Component<'schedules.schedules'> & Attribute.Required;
    excursion_id: Attribute.Relation<
      'api::applications-excursion.applications-excursion',
      'manyToOne',
      'api::excursion.excursion'
    >;
    total_price: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    customers_count: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::applications-excursion.applications-excursion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::applications-excursion.applications-excursion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiApplicationsHotelApplicationsHotel
  extends Schema.CollectionType {
  collectionName: 'applications_hotels';
  info: {
    singularName: 'applications-hotel';
    pluralName: 'applications-hotels';
    displayName: 'ApplicationsHotel';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    approximate_total_price: Attribute.Float &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    place_id: Attribute.Relation<
      'api::applications-hotel.applications-hotel',
      'oneToOne',
      'api::place.place'
    >;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    customers_count: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    start_date: Attribute.Date & Attribute.Required;
    start_time: Attribute.Time & Attribute.Required;
    end_date: Attribute.Date & Attribute.Required;
    end_time: Attribute.Time & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::applications-hotel.applications-hotel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::applications-hotel.applications-hotel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiApplicationsTourApplicationsTour
  extends Schema.CollectionType {
  collectionName: 'applications_tours';
  info: {
    singularName: 'applications-tour';
    pluralName: 'applications-tours';
    displayName: 'ApplicationsTour';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    tour_id: Attribute.Relation<
      'api::applications-tour.applications-tour',
      'manyToOne',
      'api::tour.tour'
    >;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    total_price: Attribute.Float & Attribute.Required;
    customers_count: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }> &
      Attribute.DefaultTo<1>;
    schedule: Attribute.Component<'schedules.schedules'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::applications-tour.applications-tour',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::applications-tour.applications-tour',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    sub_title: Attribute.String;
    preview_image: Attribute.Media & Attribute.Required;
    reading_users: Attribute.Relation<
      'api::article.article',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    blocks: Attribute.Component<'informative-block.informative-block', true> &
      Attribute.Required;
    article_links: Attribute.Component<'link.link', true>;
    view_counter: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    place: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'api::place.place'
    >;
    preview_image: Attribute.Media & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    schedules: Attribute.Component<'schedules.schedules', true>;
    hall: Attribute.Relation<'api::event.event', 'oneToOne', 'api::hall.hall'>;
    tickets: Attribute.Relation<
      'api::event.event',
      'oneToMany',
      'api::ticket.ticket'
    >;
    type: Attribute.Enumeration<
      [
        '\u043A\u0438\u043D\u043E',
        '\u0442\u0435\u0430\u0442\u0440',
        '\u0432\u044B\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0435',
        '\u0432\u0441\u0442\u0440\u0435\u0447\u0430',
        '\u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A'
      ]
    > &
      Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    date_delition: Attribute.DateTime & Attribute.Required;
    short_description: Attribute.String;
    is_payment_enabled: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    website_link: Attribute.Component<'link.link'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExcursionExcursion extends Schema.CollectionType {
  collectionName: 'excursions';
  info: {
    singularName: 'excursion';
    pluralName: 'excursions';
    displayName: 'Excursion';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    schedules: Attribute.Component<'schedules.schedules', true>;
    preview_image: Attribute.Media & Attribute.Required;
    images: Attribute.Media;
    description: Attribute.Text & Attribute.Required;
    organizational_phone: Attribute.String;
    site: Attribute.String;
    applications_excursions: Attribute.Relation<
      'api::excursion.excursion',
      'oneToMany',
      'api::applications-excursion.applications-excursion'
    >;
    duration: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    description_list: Attribute.Component<'list.list', true> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::excursion.excursion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::excursion.excursion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeedbackFeedback extends Schema.CollectionType {
  collectionName: 'feedbacks';
  info: {
    singularName: 'feedback';
    pluralName: 'feedbacks';
    displayName: 'Feedback';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    descriptions: Attribute.Text;
    images: Attribute.Media;
    rating: Attribute.Integer &
      Attribute.SetMinMax<{
        max: 5;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGuideGuide extends Schema.CollectionType {
  collectionName: 'guides';
  info: {
    singularName: 'guide';
    pluralName: 'guides';
    displayName: 'Guide';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    links: Attribute.Component<'link.link', true>;
    description: Attribute.Text;
    avatar: Attribute.Media;
    date_accreditation: Attribute.Date & Attribute.Required;
    price: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::guide.guide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::guide.guide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHallHall extends Schema.CollectionType {
  collectionName: 'halls';
  info: {
    singularName: 'hall';
    pluralName: 'halls';
    displayName: 'Hall';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    seats: Attribute.Relation<'api::hall.hall', 'oneToMany', 'api::seat.seat'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::hall.hall', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::hall.hall', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiHomeSlideHomeSlide extends Schema.CollectionType {
  collectionName: 'home_slides';
  info: {
    singularName: 'home-slide';
    pluralName: 'home-slides';
    displayName: 'HomeSlide';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    button: Attribute.Component<'link.link'>;
    description: Attribute.String;
    backgroundImage: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-slide.home-slide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-slide.home-slide',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIncidentIncident extends Schema.CollectionType {
  collectionName: 'incidents';
  info: {
    singularName: 'incident';
    pluralName: 'incidents';
    displayName: 'Incident';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    descriptions: Attribute.Text & Attribute.Required;
    latitude: Attribute.Float & Attribute.Required;
    longitude: Attribute.Float & Attribute.Required;
    images: Attribute.Media;
    type: Attribute.Enumeration<
      [
        '\u0440\u0435\u043C\u043E\u043D\u0442\u043D\u044B\u0435 \u0440\u0430\u0431\u043E\u0442\u044B',
        '\u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441\u0432\u0435\u0442\u043E\u0444\u043E\u0440',
        '\u043D\u0435 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F',
        '\u043D\u0435\u0442 \u043F\u0440\u043E\u0435\u0437\u0434\u0430/\u043F\u0440\u043E\u0445\u043E\u0434\u0430',
        '\u0432\u044B\u0441\u043E\u043A\u0430\u044F \u043F\u0440\u0435\u0433\u0440\u0430\u0434\u0430',
        '\u043A\u0440\u0443\u0442\u043E\u0439 \u0441\u043A\u043B\u043E\u043D',
        '\u043F\u0440\u043E\u0431\u043A\u0430'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'\u043D\u0435 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F'>;
    when_delete: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::incident.incident',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::incident.incident',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlacePlace extends Schema.CollectionType {
  collectionName: 'places';
  info: {
    singularName: 'place';
    pluralName: 'places';
    displayName: 'Place';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    longitude: Attribute.Float & Attribute.Required;
    latitude: Attribute.Float & Attribute.Required;
    address: Attribute.Text & Attribute.Required;
    organizational_phone: Attribute.String;
    email: Attribute.Email;
    images: Attribute.Media;
    description: Attribute.Text;
    category: Attribute.Relation<
      'api::place.place',
      'manyToOne',
      'api::place-category.place-category'
    >;
    type: Attribute.Relation<
      'api::place.place',
      'manyToOne',
      'api::place-type.place-type'
    >;
    tags: Attribute.Relation<
      'api::place.place',
      'manyToMany',
      'api::place-tag.place-tag'
    >;
    site: Attribute.Text;
    icon: Attribute.Media;
    rating: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 5;
      }> &
      Attribute.DefaultTo<4>;
    audio_guide: Attribute.Media;
    average_price: Attribute.Float &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    short_title: Attribute.String;
    image_url: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::place.place',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::place.place',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlaceCategoryPlaceCategory extends Schema.CollectionType {
  collectionName: 'place_categories';
  info: {
    singularName: 'place-category';
    pluralName: 'place-categories';
    displayName: 'PlaceCategory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    place_types: Attribute.Relation<
      'api::place-category.place-category',
      'oneToMany',
      'api::place-type.place-type'
    >;
    place_tags: Attribute.Relation<
      'api::place-category.place-category',
      'manyToMany',
      'api::place-tag.place-tag'
    >;
    places: Attribute.Relation<
      'api::place-category.place-category',
      'oneToMany',
      'api::place.place'
    >;
    slug: Attribute.UID<'api::place-category.place-category', 'title'> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::place-category.place-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::place-category.place-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlaceTagPlaceTag extends Schema.CollectionType {
  collectionName: 'place_tags';
  info: {
    singularName: 'place-tag';
    pluralName: 'place-tags';
    displayName: 'PlaceTag';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    place_categories: Attribute.Relation<
      'api::place-tag.place-tag',
      'manyToMany',
      'api::place-category.place-category'
    >;
    places: Attribute.Relation<
      'api::place-tag.place-tag',
      'manyToMany',
      'api::place.place'
    >;
    slug: Attribute.UID<'api::place-tag.place-tag', 'title'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::place-tag.place-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::place-tag.place-tag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlaceTypePlaceType extends Schema.CollectionType {
  collectionName: 'place_types';
  info: {
    singularName: 'place-type';
    pluralName: 'place-types';
    displayName: 'PlaceType';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    icon: Attribute.Media & Attribute.Required;
    places: Attribute.Relation<
      'api::place-type.place-type',
      'oneToMany',
      'api::place.place'
    >;
    place_category: Attribute.Relation<
      'api::place-type.place-type',
      'manyToOne',
      'api::place-category.place-category'
    >;
    color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::place-type.place-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::place-type.place-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReadyRouteReadyRoute extends Schema.CollectionType {
  collectionName: 'ready_routes';
  info: {
    singularName: 'ready-route';
    pluralName: 'ready-routes';
    displayName: 'ReadyRoute';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    places: Attribute.Relation<
      'api::ready-route.ready-route',
      'oneToMany',
      'api::place.place'
    >;
    preview_image: Attribute.Media;
    isVisuallyImpaired: Attribute.Boolean;
    isHearingImpaired: Attribute.Boolean & Attribute.DefaultTo<false>;
    isRestrictedInMovement: Attribute.Boolean;
    car: Attribute.Boolean & Attribute.DefaultTo<true>;
    type: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ready-route.ready-route',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ready-route.ready-route',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRouteRoute extends Schema.CollectionType {
  collectionName: 'routes';
  info: {
    singularName: 'route';
    pluralName: 'routes';
    displayName: 'route';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    route_link: Attribute.Text;
    type: Attribute.String & Attribute.Required;
    duration: Attribute.Integer & Attribute.Required;
    places: Attribute.Relation<
      'api::route.route',
      'oneToMany',
      'api::place.place'
    >;
    polyline: Attribute.Text & Attribute.Required;
    number: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 11;
        max: 33;
      }>;
    descriptions: Attribute.Component<'descriptions.descriptions', true> &
      Attribute.Required;
    center_latitude: Attribute.Float;
    center_longitude: Attribute.Float;
    zoom: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::route.route',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::route.route',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSeatSeat extends Schema.CollectionType {
  collectionName: 'seats';
  info: {
    singularName: 'seat';
    pluralName: 'seats';
    displayName: 'Seat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    row: Attribute.Integer & Attribute.Required;
    hall: Attribute.Relation<'api::seat.seat', 'manyToOne', 'api::hall.hall'>;
    seat_number: Attribute.Integer & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::seat.seat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::seat.seat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiStaticStatic extends Schema.SingleType {
  collectionName: 'statics';
  info: {
    singularName: 'static';
    pluralName: 'statics';
    displayName: 'static';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: Attribute.Email;
    phone: Attribute.String;
    privacy_policy: Attribute.Component<
      'informative-block.informative-block',
      true
    > &
      Attribute.Required;
    mobile_app_link_android: Attribute.String;
    mobile_app_link_apple: Attribute.String;
    use_conditions_service: Attribute.Component<
      'informative-block.informative-block',
      true
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::static.static',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::static.static',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupportServiceSupportService extends Schema.CollectionType {
  collectionName: 'support_services';
  info: {
    singularName: 'support-service';
    pluralName: 'support-services';
    displayName: 'SupportService';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    images: Attribute.Media;
    user: Attribute.Relation<
      'api::support-service.support-service',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    phone: Attribute.String & Attribute.Required;
    email: Attribute.Email;
    descriptions: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::support-service.support-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::support-service.support-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTicketTicket extends Schema.CollectionType {
  collectionName: 'tickets';
  info: {
    singularName: 'ticket';
    pluralName: 'tickets';
    displayName: 'Ticket';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seats: Attribute.Relation<
      'api::ticket.ticket',
      'oneToMany',
      'api::seat.seat'
    >;
    users_permissions_user: Attribute.Relation<
      'api::ticket.ticket',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    event: Attribute.Relation<
      'api::ticket.ticket',
      'manyToOne',
      'api::event.event'
    >;
    total_price: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    is_paid: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    is_used: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    link_pay: Attribute.Text & Attribute.Required;
    schedule_id: Attribute.Integer;
    persons_count: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
        max: 5;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ticket.ticket',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTourTour extends Schema.CollectionType {
  collectionName: 'tours';
  info: {
    singularName: 'tour';
    pluralName: 'tours';
    displayName: 'Tour';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    preview_image: Attribute.Media & Attribute.Required;
    images: Attribute.Media & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    organizational_phone: Attribute.String;
    schedules: Attribute.Component<'schedules.schedules', true>;
    schedule_descriptions: Attribute.Component<
      'tour-schedule.tour-schedule',
      true
    > &
      Attribute.Required;
    site: Attribute.String;
    applications_tours: Attribute.Relation<
      'api::tour.tour',
      'oneToMany',
      'api::applications-tour.applications-tour'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::tour.tour', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::tour.tour', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::applications-excursion.applications-excursion': ApiApplicationsExcursionApplicationsExcursion;
      'api::applications-hotel.applications-hotel': ApiApplicationsHotelApplicationsHotel;
      'api::applications-tour.applications-tour': ApiApplicationsTourApplicationsTour;
      'api::article.article': ApiArticleArticle;
      'api::event.event': ApiEventEvent;
      'api::excursion.excursion': ApiExcursionExcursion;
      'api::feedback.feedback': ApiFeedbackFeedback;
      'api::guide.guide': ApiGuideGuide;
      'api::hall.hall': ApiHallHall;
      'api::home-slide.home-slide': ApiHomeSlideHomeSlide;
      'api::incident.incident': ApiIncidentIncident;
      'api::place.place': ApiPlacePlace;
      'api::place-category.place-category': ApiPlaceCategoryPlaceCategory;
      'api::place-tag.place-tag': ApiPlaceTagPlaceTag;
      'api::place-type.place-type': ApiPlaceTypePlaceType;
      'api::ready-route.ready-route': ApiReadyRouteReadyRoute;
      'api::route.route': ApiRouteRoute;
      'api::seat.seat': ApiSeatSeat;
      'api::static.static': ApiStaticStatic;
      'api::support-service.support-service': ApiSupportServiceSupportService;
      'api::ticket.ticket': ApiTicketTicket;
      'api::tour.tour': ApiTourTour;
    }
  }
}
