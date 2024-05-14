export type IPageTitle = {
  label: string;
  links: ILinkPageTitle[];
};
export type ILinkPageTitle = {
  name: string;
  path: string;
};

export type IFileInfo = {
  id?: string;
  preview?: string;
  path: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  originalURL?: string;
};
