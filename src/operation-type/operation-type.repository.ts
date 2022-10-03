import { toast } from 'react-toastify';

import { firestore } from '@/config/firebase';
import OperationTypeTypes from '@/src/operation-type/operation-type.types';
import { addDoc, collection } from '@firebase/firestore';

import { validate } from 'class-validator';

export const OPERATION_TYPE_PATH = 'OperationType';

class OperationTypeRepository implements OperationTypeTypes.Repository {
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

      const collectionReference = collection(firestore, OPERATION_TYPE_PATH);
      const documentReference = await addDoc(collectionReference, data);

      // todo: verificar se o nome já foi utilizado

      return { id: documentReference.id, ...data };
    } catch (e) {
      toast.error(`Falha ao criar um tipo de operação ${e}`);
    }
  }
}

export default OperationTypeRepository;
