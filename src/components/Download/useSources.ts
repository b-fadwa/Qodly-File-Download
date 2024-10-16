import { useNode } from '@ws-ui/craftjs-core';
import { useEffect } from 'react';
import {
  useWebformPath,
  splitDatasourceStr,
  useIteratorDatasourceGetter,
  TIteratorDatasourceType,
} from '@ws-ui/webform-editor';

type UseSourcesOptions = Partial<{
  datasourceChange: () => void;
  currentElementChange: () => void;
  acceptIteratorSel?: boolean;
}>;

type UseSourcesType = (options?: UseSourcesOptions) => {
  sources: {
    datasource: datasources.DataSource;
    currentElement: datasources.DataSource;
  };
  actions: {
    setDatasourceValue: () => Promise<any>;
    setCurrentElementValue: () => Promise<any>;
    fetchDatasourceValue: () => Promise<any>;
    fetchCurrentElementValue: () => Promise<any>;
  };
};

type UseSourcesReturnType = ReturnType<UseSourcesType>;

/**
 * @exposed @hook
 *
 * A hook that facilitates managing datasources and current elements associated with a web form. It provides methods for setting, fetching, and listening to changes in datasource values.
 * @param options - `UseSourcesOptions` An object allowing configuration of the hook behavior. Includes options such as [`datasourceChange`](#datasourcechange), [`currentElementChange`](#currentelementchange) and [`acceptIteratorSel`](#acceptiteratorsel).
 * @returns {UseSourcesReturnType} - An object containing datasources, current elements, and methods for manipulating their values.
 *
 * :::info
 * The `useSources` function returns an object with the following structure:
 * - `sources`: An object containing `datasource` and `currentElement`, representing the current values of datasources and current elements.
 * - `actions`: An object containing methods for manipulating datasource values, including [`setDatasourceValue`](#actionssetdatasourcevalue), [`setCurrentElementValue`](#actionssetcurrentelementvalue), [`fetchDatasourceValue`](#actionsfetchdatasourcevalue), and [`fetchCurrentElementValue`](#actionsfetchcurrentelementvalue).
 * :::
 */

interface IUseIteratorDatasourceProps {
  type: TIteratorDatasourceType;
  prop?: string;
}

function useIteratorDatasource({ type, prop = 'datasource' }: IUseIteratorDatasourceProps) {
  const { datasource } = useNode((node) => ({
    datasource: node.data.props[prop] || '',
  }));
  const getter = useIteratorDatasourceGetter();

  // should not memoize the return value (fixes docs#2464)
  return getter(datasource, type);
}

export function useSources(options?: UseSourcesOptions) {
  const path = useWebformPath();
  const { datasource, currentElement } = useNode((node) => ({
    datasource: splitDatasourceStr(node.data.props.datasource),
    currentElement: splitDatasourceStr(node.data.props.currentElement),
  }));
  const iteratorDs = useIteratorDatasource({
    type: options?.acceptIteratorSel ? 'entitysel' : 'entity',
  });
  const iteratorCurrentDs = useIteratorDatasource({
    type: 'entity',
    prop: 'currentElement',
  });

  const ds = iteratorDs
    ? iteratorDs
    : datasource[0]
      ? window.DataSource.getSource(datasource[0].id, datasource[0].namespace || path)
      : undefined;

  const currentDs = iteratorCurrentDs
    ? iteratorCurrentDs
    : currentElement[0]
      ? window.DataSource.getSource(currentElement[0].id, currentElement[0].namespace || path)
      : undefined;

  const handleDatasourceChange = () => {
    options && options.datasourceChange && options.datasourceChange();
  };

  const handleCurrentDatasourceChange = () => {
    options && options.datasourceChange && options.datasourceChange();
  };

  useEffect(() => {
    ds?.addListener('changed', handleDatasourceChange);
    currentDs?.addListener('changed', handleCurrentDatasourceChange);

    return () => {
      ds?.removeListener('changed', handleDatasourceChange);
      currentDs?.removeListener('changed', handleCurrentDatasourceChange);
    };
  }, [options?.datasourceChange, options?.currentElementChange]);

  return {
    sources: {
      datasource: ds,
      currentElement: currentDs,
    },
    actions: {
      setDatasourceValue() {},
      setCurrentElementValue() {},
      fetchDatasourceValue() {},
      fetchCurrentElementValue() {},
    },
  } as UseSourcesReturnType;
}
