import { filter, isEmpty, map } from 'lodash';
import React, { useState } from 'react';
import { IUnit } from '../../../stores/types/manageCompany';

const findUnitById = (units, id) => {
  for (const unit of units) {
    if (unit.id === id) {
      return unit;
    }
    if (unit.child_units) {
      const result = findUnitById(unit.child_units, id);
      if (result) return result;
    }
  }
  return null;
};

export const removeItemFromUnits = (units, id) => {
  return filter(units, unit => unit.id !== id);
};

export const addItemTree = (units: IUnit[], newUnit) => {
  const { id, name, parent_id = null } = newUnit;
  if (!parent_id) {
    return [...units, { id: id, name: name }];
  }
  return map(units, item => {
    if (item.id === parent_id) {
      item.child_units = [...(item.child_units || []), { id: id, name: name }];
    } else if (item.child_units) {
      item.child_units = addItemTree(item.child_units, newUnit);
    }
    return item;
  });
};

export const moveItemTree = (
  units: IUnit[],
  updateUnit,
  oldParentId: string,
): IUnit[] => {
  const { id, parent_id = null } = updateUnit;
  return map(units, item => {
    if (item.id === parent_id) {
      const oldParent = findUnitById(units, oldParentId);
      if (!isEmpty(oldParent)) {
        const unitMove = findUnitById(oldParent.child_units, id);
        item.child_units = [...(item.child_units || []), unitMove];
        oldParent.child_units = removeItemFromUnits(oldParent.child_units, id);
      }
    } else if (item.child_units) {
      item.child_units = moveItemTree(
        item.child_units,
        updateUnit,
        oldParentId,
      );
    }
    return item;
  });
};

export const removeItemTree = (units: IUnit[], unitId: string): IUnit[] => {
  return units.reduce((acc, item) => {
    if (item.id === unitId) {
      return acc;
    }

    if (item.child_units) {
      item.child_units = removeItemTree(item.child_units, unitId);
    }

    acc.push(item);
    return acc;
  }, [] as IUnit[]);
};

export const updateNameItemTree = (units: IUnit[], updateUnit) => {
  return map(units, item => {
    if (item.id === updateUnit.id) {
      item.name = updateUnit.name;
    } else if (item.child_units) {
      item.child_units = updateNameItemTree(item.child_units, updateUnit);
    }
    return item;
  });
};

const CompanyStructureTree = ({
  unitsState,
  handleGetUnitDetail,
  unitTreeFocus,
}) => {
  const [nodeStates, setNodeStates] = useState<{ [key: string]: boolean }>({});

  const handleClickTreeNode = (nodeId: string) => {
    setNodeStates(prevState => ({
      ...prevState,
      [nodeId]: !prevState[nodeId],
    }));
  };

  const ChildrenGroup = ({ childUnits }) => {
    return (
      <ul role="group" className="jstree-children">
        {map(childUnits, (item, idx) => {
          return (
            <li
              key={idx}
              className={`
                jstree-node 
                ${isEmpty(item.child_units) ? 'jstree-leaf' : ''} 
                ${childUnits.length === idx + 1 ? 'jstree-last' : ''} 
                ${nodeStates[item.id] ? 'jstree-open' : 'jstree-closed'}
              `}
            >
              <i
                className="jstree-icon jstree-ocl"
                onClick={() => handleClickTreeNode(item.id)}
              ></i>
              <a
                className={`jstree-anchor fw-bold ${
                  item.id === unitTreeFocus ? 'bg-secondary' : ''
                }`}
                onClick={() => handleGetUnitDetail(item.id)}
              >
                <span>{item.name}</span>
              </a>
              {!isEmpty(item.child_units) && (
                <ChildrenGroup childUnits={item.child_units} />
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="unit-tree">
      <div id="kt_docs_jstree_basic" className="jstree jstree-1 jstree-default">
        <ul className="jstree-container-ul jstree-children">
          {map(unitsState, (item, idx) => (
            <li
              key={idx}
              className={`
                jstree-node 
                ${isEmpty(item.child_units) ? 'jstree-leaf' : ''} 
                ${unitsState.length === idx + 1 ? 'jstree-last' : ''} 
                ${nodeStates[item.id] ? 'jstree-open' : 'jstree-closed'}
              `}
            >
              <i
                className="jstree-icon jstree-ocl"
                onClick={() => handleClickTreeNode(item.id)}
              ></i>
              <a
                className={`jstree-anchor fw-bold ${
                  item.id === unitTreeFocus ? 'bg-secondary' : ''
                }`}
                onClick={() => handleGetUnitDetail(item.id)}
              >
                <span>{item.name}</span>
              </a>
              {!isEmpty(item.child_units) && (
                <ChildrenGroup childUnits={item.child_units} />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul></ul>
      </div>
    </div>
  );
};

export default React.memo(CompanyStructureTree);
