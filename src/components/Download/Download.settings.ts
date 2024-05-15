import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';
import {
  FdAlignContentEnd,
  FdAlignContentStart,
  FdFlexEnd,
  FdFlexStart,
  FdHidden,
} from '@ws-ui/icons';

export const DEFAULT_BUTTON_TEXT = 'Button';

const commonSettings: TSetting[] = [
  {
    key: 'label',
    label: 'Label',
    defaultValue: 'Download',
    type: ESetting.TEXT_FIELD,
  },
  {
    key: 'iconPosition',
    label: 'Icon Position',
    type: ESetting.RADIOGROUP,
    defaultValue: 'hidden',
    options: [
      { value: 'top', icon: FdFlexStart },
      { value: 'bottom', icon: FdFlexEnd },
      { value: 'left', icon: FdAlignContentStart },
      { value: 'right', icon: FdAlignContentEnd },
      { value: 'hidden', icon: FdHidden },
    ],
  },
];

const dataAccessSettings: TSetting[] = [
  {
    key: 'datasource',
    label: 'Data Source',
    type: ESetting.DS_AUTO_SUGGEST,
  },
  {
    key: 'currentElement',
    label: 'File Name',
    type: ESetting.DS_AUTO_SUGGEST,
  },
  {
    key: 'serverSideRef',
    label: 'Server Side',
    type: ESetting.TEXT_FIELD,
    validateOnEnter: true,
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  {
    key: 'dataAccess',
    label: 'Data Access',
    type: ESetting.GROUP,
    components: dataAccessSettings,
  },
  ...load(DEFAULT_SETTINGS).filter('dataAccess'),
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
