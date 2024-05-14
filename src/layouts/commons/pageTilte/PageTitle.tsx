import React from 'react';
import { Link } from 'react-router-dom';
import { IPageTitle } from '../../../stores/types';
import { map } from 'lodash';

type IPageTitleComponent = {
  pageTitle: IPageTitle;
  character?: string;
};

const PageTitle: React.FC<IPageTitleComponent> = ({ pageTitle, character }) => {
  return (
    <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
      <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">
        {pageTitle.label}
      </h1>
      <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0">
        {map(pageTitle.links, (link, idx) => (
          <li key={idx} className="breadcrumb-item text-muted">
            <Link to={link.path}>{link.name}</Link> &nbsp; {character ?? '-'}
          </li>
        ))}
        <li className="breadcrumb-item text-muted">{pageTitle.label}</li>
      </ul>
    </div>
  );
};

export default PageTitle;
