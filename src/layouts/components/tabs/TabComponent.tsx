import React from 'react';
import { map } from 'lodash';

type ITab = { id: string | number; label: string }[];
type ITabComponent = {
  tabs: ITab;
  currentTab: number;
  onChangeCurrentTab: (idx: number) => void;
};

const TabComponent: React.FC<ITabComponent> = ({
  tabs,
  currentTab = 0,
  onChangeCurrentTab,
}) => {
  return (
    <ul
      className="nav nav-stretch fs-5 fw-semibold nav-line-tabs border-transparent"
      role="tablist"
    >
      {map(tabs, (tab, idx) => (
        <li className="nav-item" role="presentation" key={tab.id}>
          <a
            className={
              currentTab === idx
                ? 'nav-link text-active-gray-800 active'
                : 'nav-link text-active-gray-800'
            }
            role="tab"
            href="#"
            aria-selected="false"
            tabIndex={-1}
            onClick={() => onChangeCurrentTab(idx)}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TabComponent;
