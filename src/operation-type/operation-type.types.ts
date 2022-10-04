import { FC } from 'react';

import { CollectionReference } from '@firebase/firestore';

import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

namespace OperationTypeTypes {
  export interface Model {
    id: string;
    name: string;
    color: string;
    owner: string;
  }

  export class Create implements Omit<Model, 'id'> {
    constructor(name: string, color: string, owner: string) {
      this.name = name;
      this.color = color;
      this.owner = owner;
    }

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsHexColor()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    owner: string;
  }

  export interface Repository {
    getCollection(): CollectionReference;
    create(
      data: OperationTypeTypes.Create
    ): Promise<OperationTypeTypes.Model | undefined>;
    readAll(): Promise<OperationTypeTypes.Model[]>;
  }

  export interface CreateForm extends HTMLFormElement {
    nameInput: HTMLInputElement;
    colorInput: HTMLInputElement;
  }

  export type CreateFormComponent = FC;
  export type ReadAllComponent = FC;
  export type ItemComponent = FC<Model>;
}

export default OperationTypeTypes;
