export type Dependency = {
  from: string;
} & DependencyToken;

export type DependencyToken = {
  token: string;
  isType?: boolean;
};
