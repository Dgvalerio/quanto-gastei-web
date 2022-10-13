import { toast } from 'react-toastify';

import { firebaseAuth } from '@/config/firebase';
import OperationRepository from '@/src/operation/operation.repository';
import OperationTypes from '@/src/operation/operation.types';

import Store = OperationTypes.Store;
import Model = OperationTypes.Model;

import create from 'zustand';

const useOperationStore = create<Store>()((set) => ({
  loading: false,
  operations: [],

  async loadAll(): Promise<void> {
    set({ loading: true });

    const repository = new OperationRepository();

    const operations = await repository.readAllWithRelationships();

    set({ operations, loading: false });
  },

  async deleteItem(id: string): Promise<void> {
    set({ loading: true });

    const repository = new OperationRepository();

    const result = await repository.delete(id);

    if (result) {
      const operations = await repository.readAllWithRelationships();

      set({ operations });
    }

    set({ loading: false });
  },

  async createItem(
    date: Model['date'],
    description: Model['description'],
    value: Model['value'],
    operationTypeId: Model['operationTypeId']
  ): Promise<void> {
    set({ loading: true });

    const owner = firebaseAuth.currentUser?.uid;

    if (!owner) return void toast.error('Falha ao carregar usuário!');

    const repository = new OperationRepository();

    const result = await repository.create({
      date,
      description,
      value,
      operationTypeId,
      owner,
    });

    if (result) {
      toast.success('Operação criada com sucesso!');

      const operations = await repository.readAllWithRelationships();

      set({ operations });
    }

    set({ loading: false });
  },

  async updateItem(
    id: Model['id'],
    date: Model['date'],
    description: Model['description'],
    value: Model['value'],
    operationTypeId: Model['operationTypeId']
  ): Promise<void> {
    set({ loading: true });

    const owner = firebaseAuth.currentUser?.uid;

    if (!owner) return void toast.error('Falha ao carregar usuário!');

    const repository = new OperationRepository();

    const result = await repository.update({
      id,
      date,
      description,
      value,
      operationTypeId,
      owner,
    });

    if (result) {
      toast.success('Operação atualizada com sucesso!');

      const operations = await repository.readAllWithRelationships();

      set({ operations });
    }

    set({ loading: false });
  },
}));

export default useOperationStore;
