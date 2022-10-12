import { FC } from 'react';

import OperationTypeTypes from '@/src/operation-type/operation-type.types';
import { CollectionReference, DocumentReference } from '@firebase/firestore';

import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

namespace OperationTypes {
  export interface Model {
    id: string;
    date: Date;
    description: string;
    value: number;
    owner: string;
    operationTypeId: OperationTypeTypes.Model['id'];
  }

  export interface ModelWithRelationships extends Model {
    operationType: OperationTypeTypes.Model;
  }

  export class Create implements Omit<Model, 'id'> {
    constructor(
      date: Model['date'],
      description: Model['description'],
      value: Model['value'],
      owner: Model['owner'],
      operationTypeId: Model['operationTypeId']
    ) {
      this.date = date;
      this.description = description;
      this.value = value;
      this.owner = owner;
      this.operationTypeId = operationTypeId;
    }

    @IsDate()
    @IsNotEmpty()
    date: Model['date'];

    @IsString()
    @IsNotEmpty()
    description: Model['description'];

    @IsNumber()
    @IsNotEmpty()
    value: Model['value'];

    @IsString()
    @IsNotEmpty()
    owner: Model['owner'];

    @IsString()
    @IsNotEmpty()
    operationTypeId: Model['operationTypeId'];
  }

  export class Update implements Partial<Model> {
    constructor(id: Model['id'], data: Partial<Omit<Model, 'id'>>) {
      this.id = id;
      this.date = data.date;
      this.description = data.description;
      this.value = data.value;
      this.owner = data.owner;
      this.operationTypeId = data.operationTypeId;
    }

    @IsString()
    @IsNotEmpty()
    id: Model['id'];

    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    date?: Model['date'];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: Model['description'];

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    value?: Model['value'];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    owner?: Model['owner'];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    operationTypeId?: Model['operationTypeId'];
  }

  export interface Repository {
    getCollection(): CollectionReference;
    getReference(path: Model['id']): DocumentReference;
    create(data: Create): Promise<Model | undefined>;
    readAll(): Promise<Model[]>;
    readOne(): Promise<Model | undefined>;
    update(data: Update): Promise<Model | undefined>;
    delete(path: Model['id']): Promise<boolean>;
  }

  export interface Store {
    loading: boolean;
    operations: Model[];
    createItem(
      date: Model['date'],
      description: Model['description'],
      value: Model['value'],
      operationTypeId: Model['operationTypeId']
    ): Promise<void>;
    updateItem(
      id: Model['id'],
      date: Model['date'],
      description: Model['description'],
      value: Model['value'],
      operationTypeId: Model['operationTypeId']
    ): Promise<void>;
    loadAll(): Promise<void>;
    deleteItem(id: Model['id']): Promise<void>;
  }

  export interface CreateForm extends HTMLFormElement {
    dateInput: Model['date'];
    descriptionInput: Model['description'];
    valueInput: Model['value'];
    operationTypeIdInput: Model['operationTypeId'];
  }

  export type CreateFormComponent = FC;
  export type ReadAllComponent = FC;
  export type ItemComponent = FC<Model>;
}

export default OperationTypes;
