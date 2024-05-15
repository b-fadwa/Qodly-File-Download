import { useEnhancedNode, useLayout } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { Element } from '@ws-ui/craftjs-core';
import { useEnhancedEditor, selectResolver } from '@ws-ui/webform-editor';

import { IDownloadProps } from './Download.config';

const Download: FC<IDownloadProps> = ({
  iconPosition,
  label,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const { getClassName } = useLayout();

  const { resolver } = useEnhancedEditor(selectResolver);

  return (
    <button
      ref={connect}
      className={cn(
        'fd-component flex items-center justify-center gap-1',
        classNames,
        className,
        getClassName('fd-button'),
      )}
      style={style}
    >
      <span
        className={cn([
          'flex items-center',
          {
            'flex-row-reverse': iconPosition === 'right',
            'flex-col': iconPosition === 'top',
            'flex-col-reverse': iconPosition === 'bottom',
          },
        ])}
      >
        <span
          className={cn([
            {
              hidden: iconPosition === 'hidden',
              'mb-1': iconPosition === 'top',
              'mt-1': iconPosition === 'bottom',
              'ml-1': iconPosition === 'right',
              'mr-1': iconPosition === 'left',
            },
          ])}
        >
          <Element is={resolver.Icon} id="icon" />
        </span>
        {label}
      </span>
    </button>
  );
};

export default Download;
