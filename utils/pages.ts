export enum Routes {
  Home = `/`,
  OperationTypes = `/operation-types`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  operationTypes: (): Routes => Routes.OperationTypes,
};
