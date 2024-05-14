import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { isEmpty, map } from 'lodash';

const DiagramComponent = ({ data }) => {
  const [nodeStates, setNodeStates] = useState<{ [key: string]: boolean }>({});

  const handleClickTreeNode = (nodeId: string) => {
    setNodeStates(prevState => ({
      ...prevState,
      [nodeId]: !prevState[nodeId],
    }));
  };

  const DiagramItem = ({ data }) => {
    return (
      <>
        {map(data, (item, idx) => {
          if (!isEmpty(item?.child_units)) {
            return (
              <TreeNode
                className={nodeStates[item.id] ? 'hide-node' : ''}
                key={idx}
                label={
                  <div
                    className={`position-relative d-inline-block bg-success border border-success rounded text-white mw-250px min-w-150px min-h-60px p-2`}
                  >
                    <span className={'box-name-content'}>{item.name}</span>
                    <div
                      className="position-absolute fs-8 text-dark mt-2 cursor-pointer bottom-0 end-0 p-1"
                      onClick={() => handleClickTreeNode(item.id)}
                    >
                      <div>
                        <span>{item.child_units.length}</span>&nbsp;
                        <i
                          className={`fa fa-chevron-${
                            nodeStates[item.id] ? 'up' : 'down'
                          } fs-8 text-dark`}
                        ></i>
                      </div>
                    </div>
                  </div>
                }
              >
                {!isEmpty(item?.child_units) ? (
                  <DiagramItem data={item.child_units} />
                ) : (
                  ''
                )}
              </TreeNode>
            );
          }
          return (
            <TreeNode
              key={idx}
              label={
                <div className="d-inline-block bg-success border border-success rounded text-white m-w-250px min-w-150px min-h-60px p-2 box-name-content">
                  {item.name}
                </div>
              }
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      {!isEmpty(data) && (
        <Tree label="" lineBorderRadius={''}>
          <DiagramItem data={data} />
        </Tree>
      )}
    </>
  );
};

export default DiagramComponent;
