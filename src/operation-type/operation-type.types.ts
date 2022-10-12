import { FC } from 'react';

import { CollectionReference, DocumentReference } from '@firebase/firestore';

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
    name: Model['name'];

    @IsHexColor()
    @IsNotEmpty()
    color: Model['color'];

    @IsString()
    @IsNotEmpty()
    owner: Model['owner'];
  }

  export class Update implements Partial<Model> {
    constructor(id: Model['id'], data: Partial<Omit<Model, 'id'>>) {
      this.id = id;
      this.name = data.name;
      this.color = data.color;
      this.owner = data.owner;
    }

    @IsString()
    @IsNotEmpty()
    id: Model['id'];

    @IsString()
    @IsNotEmpty()
    name?: Model['name'];

    @IsHexColor()
    @IsNotEmpty()
    color?: Model['color'];

    @IsString()
    @IsNotEmpty()
    owner?: Model['owner'];
  }

  export interface Repository {
    getCollection(): CollectionReference;
    getReference(path: string): DocumentReference;
    create(
      data: OperationTypeTypes.Create
    ): Promise<OperationTypeTypes.Model | undefined>;
    readAll(): Promise<OperationTypeTypes.Model[]>;
    readOne(): Promise<OperationTypeTypes.Model | undefined>;
    update(
      data: OperationTypeTypes.Update
    ): Promise<OperationTypeTypes.Model | undefined>;
    delete(path: string): Promise<boolean>;
  }

  export interface Store {
    loading: boolean;
    operationTypes: OperationTypeTypes.Model[];
    createItem(name: string, color: string): Promise<void>;
    updateItem(id: string, name: string, color: string): Promise<void>;
    loadAll(): Promise<void>;
    deleteItem(id: string): Promise<void>;
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
