import config, { IDownloadProps } from './Download.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Download.build';
import Render from './Download.render';

const Download: T4DComponent<IDownloadProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Download.craft = config.craft;
Download.info = config.info;
Download.defaultProps = config.defaultProps;

export default Download;
