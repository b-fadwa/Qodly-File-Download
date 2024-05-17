import { useEnhancedEditor, useLayout, useRenderer, selectResolver } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { IDownloadProps } from './Download.config';
import { Element } from '@ws-ui/craftjs-core';
import { useSources } from './useSources';

const Download: FC<IDownloadProps> = ({
  label,
  iconPosition,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any>(null);
  const [fileName, setFileName] = useState<string>('');
  const {
    sources: { datasource: ds, currentElement: ce },
  } = useSources({ acceptIteratorSel: true });

  const { getClassName } = useLayout();

  const { resolver } = useEnhancedEditor(selectResolver);

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      let v = await ds.getValue<any>();
      if (!v) return;
      try {
        v = JSON.parse(v);
      } catch (error) {}

      let src = null;
      if (typeof v === 'object') {
        const deferred = v.__deferred;
        if (deferred != null && typeof deferred === 'object') {
          const uri = deferred.uri;
          if (uri != null) src = uri;
        }
      } else if (typeof v === 'string') {
        src = v;
      }
      if (src != null) {
        setValue(src);
      }

      const val = await ce.getValue<string>(); //in case the name was not given
      setFileName(val || 'File');
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds, ce]);

  const download = () => {
    const fetchDocument = async (url: any) => {
      try {
        const response = await axios.get(url, {
          responseType: 'blob',
        });
        const blobUrl = URL.createObjectURL(response.data);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
      } catch {
        // todo
      }
    };

    fetchDocument(value);
  };

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
      onClick={download}
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
