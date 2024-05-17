import {
  EComponentKind,
  T4DComponentConfig,
  getDataTransferSourceID,
  isAttributePayload,
  isDatasourcePayload,
} from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { FaFileDownload } from 'react-icons/fa';
import { cloneDeep } from 'lodash';
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
      set: (nodeId, query, payload) => {
        const new_props: webforms.ComponentProps = cloneDeep(query.node(nodeId).get().data.props);
        
        const updateProps = (sourceId:string) => {
          if (new_props.datasource == null) {
            new_props.datasource = sourceId;
          } else {
            new_props.currentElement = sourceId;
          }
        };

        payload.forEach((item) => {     
          if (isDatasourcePayload(item) && item.source.dataType === 'string') {
            updateProps(getDataTransferSourceID(item));
          } else if (isAttributePayload(item)) {
            const sourceId = getDataTransferSourceID(item);
            if (item.attribute.type === 'blob' || item.attribute.type === 'string') {
              updateProps(sourceId);
            }
          }
        });
        return {
          [nodeId]: new_props,
        };
      },
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
