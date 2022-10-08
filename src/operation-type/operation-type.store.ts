import OperationTypeRepository from '@/src/operation-type/operation-type.repository';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';

import create from 'zustand';

const useOperationTypeStore = create<OperationTypeTypes.Store>()((set) => ({
  loading: false,
  operationTypes: [],

  async loadAll(): Promise<void> {
    set({ loading: true });

    const repository = new OperationTypeRepository();

    const operationTypes = await repository.readAll();

    set({ operationTypes, loading: false });
  },

  async deleteItem(id: string): Promise<void> {
    set({ loading: true });

    const repository = new OperationTypeRepository();

    const result = await repository.delete(id);

    if (result) {
      const operationTypes = await repository.readAll();

      set({ operationTypes });
    }

    set({ loading: false });
  },
}));

export default useOperationTypeStore;
