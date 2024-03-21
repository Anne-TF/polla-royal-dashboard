import {
  PiniaPluginContext,
  SubscriptionCallbackMutation,
  StateTree,
  Store
} from 'pinia';

import normalizeOptions from './normalize';
import { pick, unPick } from './pick';

import {
  PersistedStateFactoryOptions,
  Serializer,
  StorageLike
} from './types';

function hydrateStore(
  store: Store,
  storage: StorageLike,
  serializer: Serializer,
  key: string
)
{
  try
  {
    const fromStorage = storage?.getItem(key);
    if (fromStorage)
    {
      store.$patch(serializer?.deserialize(fromStorage));
    }
  }
  catch (_error)
  {}
}

/**
 * Creates a pinia persistence plugin
 * @param factoryOptions global persistence options
 * @returns pinia plugin
 */
export function createPersistedState(
  factoryOptions: PersistedStateFactoryOptions = {}
)
{
  return (context: PiniaPluginContext) =>
  {
    const {
      options: { persist },
      store
    } = context;

    if (!persist)
    {
      return;
    }

    const persistences = (
      Array.isArray(persist)
        ? persist.map(p => normalizeOptions(p, factoryOptions))
        : [normalizeOptions(persist, factoryOptions)]
    ).map(
      ({
        storage = localStorage,
        beforeRestore = null,
        afterRestore = null,
        serializer = {
          serialize: JSON.stringify,
          deserialize: JSON.parse
        },
        key = store.$id,
        include = null,
        exclude = null
      }) => ({
        storage,
        beforeRestore,
        afterRestore,
        serializer,
        key,
        include,
        exclude
      })
    );

    persistences.forEach(p =>
    {
      const { storage, serializer, key, include, exclude, beforeRestore, afterRestore } = p;

      beforeRestore?.(context);

      hydrateStore(store, storage, serializer, key);

      afterRestore?.(context);

      store.$subscribe(
        (
          _mutation: SubscriptionCallbackMutation<StateTree>,
          state: StateTree
        ) =>
        {
          try
          {

            const toStoreInclude = Array.isArray(include) ? pick(state, include) : state;
            const toStoreExclude = Array.isArray(exclude) ? unPick(toStoreInclude, exclude) : false;

            storage.setItem(key, serializer.serialize(toStoreInclude as StateTree));

            if (toStoreExclude)
            {
              storage.setItem(key, serializer.serialize(toStoreExclude as StateTree));
            }
          }
          catch (_error)
          {}
        }
      );
    });

    store.$hydrate = ({ runHooks = true } = {}) =>
    {
      persistences.forEach(p =>
      {
        const { beforeRestore, afterRestore, storage, serializer, key } = p;

        if (runHooks)
        {
          beforeRestore?.(context);
        }

        hydrateStore(store, storage, serializer, key);

        if (runHooks)
        {
          afterRestore?.(context);
        }
      });
    };
  };
}
