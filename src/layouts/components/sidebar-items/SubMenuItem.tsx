import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { publicMenus } from '../../../routes/routeData';
import { some } from 'lodash';
import { connect } from 'react-redux';

const SubMenuItem = ({ permissions }) => {
  const currentPath = useLocation().pathname;
  const handlerToggleMenu = event => {
    const parentElement = event.currentTarget.parentNode;
    parentElement.classList.contains('show')
      ? parentElement.classList.remove('show')
      : parentElement.classList.add('show');
  };
  function checkPermission(item) {
    let rerult = false;
    switch (item.path) {
      case '/role-permission/role':
        permissions.find(per => per.name === 'get-list-roles')
          ? (rerult = true)
          : (rerult = false);
        break;
      case '/accounts':
        permissions.find(per => per.name === 'get-list-user')
          ? (rerult = true)
          : (rerult = false);
        break;
      case '/manage_profile':
        permissions.find(per => per.name === 'get-list-employee')
          ? (rerult = true)
          : (rerult = false);
        break;
      case '/asset':
        permissions.find(per => per.name === 'get-list-asset')
          ? (rerult = true)
          : (rerult = false);
        break;
      default:
        rerult = true;
    }
    return rerult;
  }
  return (
    <>
      {publicMenus.map((item, index) => {
        if (item.children) {
          let isActive = false;
          {
            item.children.map((itemChild: { path: string }) => {
              if (item.path + itemChild.path == currentPath) {
                isActive = true;
              }
            });
          }
          if (!checkPermission(item)) {
            return false;
          } else {
            return (
              <div
                key={index}
                data-kt-menu-trigger="click"
                className={`menu-item menu-accordion`}
              >
                <span
                  className={`menu-link ${
                    isActive ? 'sidebar-have-child-active' : ''
                  }`}
                  onClick={event => handlerToggleMenu(event)}
                >
                  <span className="menu-icon">
                    <i className={`ki-outline ${item.icon} fs-2`}></i>
                  </span>
                  <span className="menu-title">{item.name}</span>
                  <span className="menu-arrow"></span>
                </span>
                <div
                  className={`menu-sub menu-sub-accordion have-children-${index}`}
                >
                  {item.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      data-kt-menu-trigger="click"
                      className="menu-item show menu-accordion"
                    >
                      <span
                        className={`menu-link ${
                          currentPath === `${item.path}${child.path}` ||
                          (currentPath.includes(item.path) &&
                            some(child.includes, key =>
                              currentPath.includes(key),
                            ))
                            ? 'active menu-link-active'
                            : ''
                        }`}
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">
                          <Link
                            to={`${item.path}${child.path}`}
                            className="menu-title"
                          >
                            {child.name}
                          </Link>
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        } else {
          if (!checkPermission(item)) {
            return false;
          } else {
            return (
              <div
                key={index}
                data-kt-menu-trigger="click"
                className="menu-item menu-accordion"
              >
                <span
                  key={index}
                  className={`menu-link ${
                    currentPath === `${item.path}` ||
                    (currentPath.includes(item.path) &&
                      some(item.includes, key =>
                        currentPath.includes(`${item.path}${key}`),
                      ))
                      ? 'active menu-link-active'
                      : ''
                  }`}
                >
                  <span className="menu-icon">
                    <i className={`ki-outline ${item.icon} fs-2`}></i>
                  </span>
                  <span className="menu-title">
                    <Link to={item.path} className="menu-title">
                      {item.name}
                    </Link>
                  </span>
                  {/*<span className="menu-arrow"></span>*/}
                </span>
              </div>
            );
          }
        }
      })}
    </>
  );
};
const mapStateToProps = ({ authenticate }) => ({
  permissions: authenticate.permissions,
});

export default connect(mapStateToProps)(SubMenuItem);
