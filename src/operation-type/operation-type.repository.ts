import { toast } from 'react-toastify';

import { firestore } from '@/config/firebase';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
} from '@firebase/firestore';

import { validate } from 'class-validator';

export const OPERATION_TYPE_PATH = 'OperationType';

class OperationTypeRepository implements OperationTypeTypes.Repository {
  getCollection(): CollectionReference {
    return collection(firestore, OPERATION_TYPE_PATH);
  }

  getReference(path: string): DocumentReference {
    return doc(firestore, OPERATION_TYPE_PATH, path);
  }

  async create(
    data: OperationTypeTypes.Create
  ): Promise<OperationTypeTypes.Model | undefined> {
    try {
      const validationDTO = new OperationTypeTypes.Create(
        data.name,
        data.color,
        data.owner
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

      const models = await this.readAll();
      const conflict = models.find(({ name }) => name === validationDTO.name);

      if (conflict) {
        toast.error(`Já existe um tipo de operação com esse nome!`);

        return;
      }

      const documentReference = await addDoc(this.getCollection(), data);

      return { id: documentReference.id, ...data };
    } catch (e) {
      toast.error(`Falha ao criar um tipo de operação ${e}`);
    }
  }

  async readAll(): Promise<OperationTypeTypes.Model[]> {
    try {
      const querySnapshot = await getDocs(this.getCollection());

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<OperationTypeTypes.Model, 'id'>),
      }));
    } catch (e) {
      toast.error(`Falha ao listar todos os tipos de operação ${e}`);

      return [];
    }
  }

  async readOne(): Promise<OperationTypeTypes.Model> {
    return Promise.resolve({} as OperationTypeTypes.Model);
  }

  async update(): Promise<OperationTypeTypes.Model> {
    return Promise.resolve({} as OperationTypeTypes.Model);
  }

  async delete(path: string): Promise<boolean> {
    try {
      const reference = this.getReference(path);

      await deleteDoc(reference);

      return false;
    } catch (e) {
      toast.error(`Falha ao criar um tipo de operação ${e}`);

      return true;
    }
  }
}

export default OperationTypeRepository;
