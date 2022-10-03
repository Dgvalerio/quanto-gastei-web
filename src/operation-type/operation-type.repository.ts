import { toast } from 'react-toastify';

import { firestore } from '@/config/firebase';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';
import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
} from '@firebase/firestore';

import { validate } from 'class-validator';

export const OPERATION_TYPE_PATH = 'OperationType';

class OperationTypeRepository implements OperationTypeTypes.Repository {
  getCollection(): CollectionReference {
    return collection(firestore, OPERATION_TYPE_PATH);
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

      const documentReference = await addDoc(this.getCollection(), data);

      // todo: verificar se o nome já foi utilizado

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
}

export default OperationTypeRepository;
