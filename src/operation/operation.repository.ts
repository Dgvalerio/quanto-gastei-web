import { toast } from 'react-toastify';

import { firestore } from '@/config/firebase';
import OperationTypes from '@/src/operation/operation.types';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  updateDoc,
} from '@firebase/firestore';

import { validate } from 'class-validator';

export const OPERATION_PATH = 'Operation';

class OperationRepository implements OperationTypes.Repository {
  getCollection(): CollectionReference {
    return collection(firestore, OPERATION_PATH);
  }

  getReference(path: string): DocumentReference {
    return doc(firestore, OPERATION_PATH, path);
  }

  async create(
    data: OperationTypes.Create
  ): Promise<OperationTypes.Model | undefined> {
    try {
      const validationDTO = new OperationTypes.Create(
        data.date,
        data.description,
        data.value,
        data.owner,
        data.operationTypeId
      );

      const errors = await validate(validationDTO);

      if (errors && errors.length > 0) {
        errors.map(
          (error) =>
            error.constraints &&
            Object.entries(error.constraints).map(([, value]) =>
              toast.error(`${error.property}: ${value}`)
            )
        );

        return;
      }

      const documentReference = await addDoc(this.getCollection(), data);

      return { id: documentReference.id, ...data };
    } catch (e) {
      toast.error(`Falha ao criar uma operação ${e}`);
    }
  }

  async readAll(): Promise<OperationTypes.Model[]> {
    try {
      const querySnapshot = await getDocs(this.getCollection());

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<OperationTypes.Model, 'id'>),
      }));
    } catch (e) {
      toast.error(`Falha ao listar todos os tipos de operação ${e}`);

      return [];
    }
  }

  async readOne(): Promise<OperationTypes.Model | undefined> {
    return Promise.resolve({} as OperationTypes.Model);
  }

  async update({
    id,
    ...data
  }: OperationTypes.Update): Promise<OperationTypes.Model | undefined> {
    try {
      const validationDTO = new OperationTypes.Update(id, data);

      const errors = await validate(validationDTO);

      if (errors && errors.length > 0) {
        errors.map(
          (error) =>
            error.constraints &&
            Object.entries(error.constraints).map(([, value]) =>
              toast.error(`${error.property}: ${value}`)
            )
        );

        return;
      }

      await updateDoc(this.getReference(id), data);

      return await this.readOne();
    } catch (e) {
      toast.error(`Falha ao atualizar uma operação ${e}`);
    }
  }

  async delete(path: string): Promise<boolean> {
    try {
      const reference = this.getReference(path);

      await deleteDoc(reference);

      return true;
    } catch (e) {
      toast.error(`Falha ao criar uma operação ${e}`);

      return false;
    }
  }
}

export default OperationRepository;
