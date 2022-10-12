import { toast } from 'react-toastify';

import { firebaseAuth } from '@/config/firebase';
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

  async createItem(name: string, color: string): Promise<void> {
    set({ loading: true });

    const owner = firebaseAuth.currentUser?.uid;

    if (!owner) return void toast.error('Falha ao carregar usuário!');

    const repository = new OperationTypeRepository();

    const result = await repository.create({ name, color, owner });

    if (result) {
      toast.success('Tipo de operação criada com sucesso!');

      const operationTypes = await repository.readAll();

      set({ operationTypes });
    }

    set({ loading: false });
  },

  async updateItem(id: string, name: string, color: string): Promise<void> {
    set({ loading: true });

    const owner = firebaseAuth.currentUser?.uid;

    if (!owner) return void toast.error('Falha ao carregar usuário!');

    const repository = new OperationTypeRepository();

    const result = await repository.update({ id, name, color, owner });

    if (result) {
      toast.success('Tipo de operação atualizada com sucesso!');

      const operationTypes = await repository.readAll();

      set({ operationTypes });
    }

    set({ loading: false });
  },
}));

export default useOperationTypeStore;
