import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaFileDownload } from 'react-icons/fa';

import DownloadSettings, { BasicSettings } from './Download.settings';

export default {
  craft: {
    displayName: 'Download',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(DownloadSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Download',
    exposed: true,
    icon: FaFileDownload,
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Blur',
        value: 'onblur',
      },
      {
        label: 'On Focus',
        value: 'onfocus',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      // todo: replace it by a fct
      accept: ['blob', 'string'],
    },
  },
  defaultProps: {
    label: 'Download File',
    iconPosition: 'left',
    style: {
      display: 'flex',
    },
  },
} as T4DComponentConfig<IDownloadProps>;

export interface IDownloadProps extends webforms.ComponentProps {
  label?: string;
  iconPosition?: string;
}
