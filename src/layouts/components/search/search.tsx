import React, { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  SEARCH_TYPE,
} from '../../../constants/constant';
import { get, isArray, isEmpty, unionBy } from 'lodash';
import { useSearchQuery } from '../../../hooks/_searchQuery';
import useDebounce from '../../../utils/userDebounce';
import { toast } from 'react-toastify';
import BottomLoading from '../../commons/loading/BottomLoading';
import { useNavigate } from 'react-router-dom';

const SEARCH_ROUTER = {
  roles: '/role-permission/role',
  assets: '/asset/detail',
  employees: '/manage_profile',
};

function SearchForm() {
  const ref = useRef<HTMLDivElement | null>(null);
  const initPagination = {
    page: DEFAULT_PAGE,
    totalRecord: null,
    perPage: DEFAULT_PER_PAGE,
    paginationFlag: true,
  };
  const [searching, setSearching] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [pagination, setPagination] = useState(initPagination);
  const debouncedSearch = useDebounce(searchText, 1000);
  const navigate = useNavigate();

  const {
    isLoading,
    isError: isErrorQuerySearch,
    error: errorQuerySearch,
    data: responseQuerySearch,
    isSuccess: isSuccessQuerySearch,
  } = useSearchQuery({
    keyword: debouncedSearch,
    currentPage: pagination.page,
    perPage: pagination.perPage,
  });

  useEffect(() => {
    setSearchResults({});
    setPagination({
      page: 1,
      totalRecord: null,
      perPage: DEFAULT_PER_PAGE,
      paginationFlag: true,
    });
  }, [debouncedSearch]);

  useEffect(() => {
    if (isSuccessQuerySearch) {
      const { data: result, ...paginationData } = responseQuerySearch.data;
      setPagination({
        page: paginationData.meta.pagination.currentPage,
        totalRecord: paginationData.meta.pagination.total,
        perPage: paginationData.meta.pagination.perPage,
        paginationFlag:
          paginationData.meta.pagination.currentPage <
          paginationData.meta.pagination.totalPage,
      });
      setSearchResults(prevResults => {
        const mergedResults = { ...prevResults };
        Object.keys(result).forEach(key => {
          if (
            mergedResults[key] &&
            isArray(mergedResults[key]) &&
            isArray(result[key])
          ) {
            mergedResults[key] = unionBy(mergedResults[key], result[key], 'id');
          } else {
            mergedResults[key] = result[key];
          }
        });

        return mergedResults;
      });
      setSearching(false);
      setShow(true);
    } else {
      // setSearchResults([]);
      // setSearching(false);
      // setShow(false);
    }
  }, [responseQuerySearch]);

  useEffect(() => {
    if (isErrorQuerySearch) {
      setSearchResults([]);
      setSearching(false);
      setShow(false);
      toast.error(get(errorQuerySearch, 'message', 'Server Error'), {
        toastId: 1,
      });
    }
  }, [isErrorQuerySearch]);

  const handleScroll = e => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop - 5 <= element.clientHeight) {
      const data = responseQuerySearch?.data?.data;
      if (isEmpty(data)) {
        return;
      } else {
        let count = 0;
        Object.keys(data).forEach(key => {
          count += data[key].length;
        });
        if (count < DEFAULT_PER_PAGE) {
          return;
        }
      }
      setPagination(prevState => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  const handleClickOutSide = () => {
    setShow(false);
  };

  const handleClickInSide = () => {
    !isEmpty(searchResults) && setShow(true);
  };

  // if (searchResults) {
  //   console.log('result search: ', searchResults);
  // }

  // useEffect(() => {
  //   if (loading) {
  //     setPagination(prevState => ({
  //       ...prevState,
  //       page: prevState.page + 1,
  //     }));
  //   }
  // }, [loading]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutSide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  function handleInputOnchange(e) {
    const { value } = e.target;
    setPagination(initPagination);
    setSearchText(value);
  }
  return (
    <div
      className="app-navbar-item d-flex align-items-stretch flex-lg-grow-1 app-navbar"
      ref={ref}
    >
      <div
        id="kt_header_search"
        className="header-search d-flex align-items-center w-lg-200px"
        data-kt-search-keypress="true"
        data-kt-search-min-length="2"
        data-kt-search-enter="enter"
        data-kt-search-layout="menu"
        data-kt-search-responsive="true"
        data-kt-menu-trigger="auto"
        data-kt-menu-permanent="true"
        data-kt-menu-placement="bottom-start"
      >
        <form
          data-kt-search-element="form"
          className="d-lg-block w-100 position-relative mb-lg-0"
          autoComplete="off"
        >
          <input type="hidden" />

          <i className="ki-outline ki-magnifier search-icon fs-2 text-gray-500 position-absolute top-50 translate-middle-y ms-5"></i>

          <input
            type="text"
            className="search-input form-control form-control rounded-1 ps-13"
            // name="search"
            placeholder="Search..."
            data-kt-search-element="input"
            value={searchText}
            onChange={handleInputOnchange}
            onClick={handleClickInSide}
          />

          <span
            className="search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
            data-kt-search-element="spinner"
          >
            <span className="spinner-border h-15px w-15px align-middle text-gray-400"></span>
          </span>

          <span
            className="search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-4"
            data-kt-search-element="clear"
          >
            <i className="ki-outline ki-cross fs-2 fs-lg-1 me-0"></i>
          </span>
        </form>
        {searching && (
          <span className="search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 me-5">
            <span className="spinner-border h-15px w-15px align-middle text-gray-400"></span>
          </span>
        )}
        {!!searchText.length && show && (
          <div
            data-kt-search-element="content"
            className="menu menu-sub menu-sub-dropdown py-7 px-7 overflow-hidden w-300px w-md-350px show"
            data-kt-menu="true"
            style={{
              zIndex: 107,
              position: 'fixed',
              inset: '0px auto auto 0px',
              margin: '0px',
              transform: 'translate(310px, 89px)',
            }}
          >
            <div data-kt-search-element="wrapper">
              {!isEmpty(searchResults) && (
                <div data-kt-search-element="results" className="">
                  <div
                    className="scroll-y mh-200px mh-lg-350px"
                    onScroll={handleScroll}
                  >
                    {Object.keys(searchResults).map((type, index) => (
                      <div key={index}>
                        <h3
                          className="fs-5 text-muted m-0 pb-5"
                          data-kt-search-element="category-title"
                        >
                          {SEARCH_TYPE[type]}
                        </h3>
                        {searchResults[type].map(item => (
                          <div
                            key={item.id}
                            onClick={() =>
                              navigate(`${SEARCH_ROUTER[type]}/${item.id}`)
                            }
                          >
                            <a
                              href=""
                              className="d-flex text-dark text-hover-primary align-items-center mb-5"
                            >
                              <div className="symbol symbol-40px me-4">
                                <img
                                  src="assets/media/avatars/300-6.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="d-flex flex-column justify-content-start fw-semibold">
                                <span className="fs-6 fw-semibold">
                                  {item.name}
                                </span>
                                <span className="fs-7 fw-semibold text-muted">
                                  {item.code}
                                </span>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <BottomLoading isShow={isLoading}></BottomLoading>
                </div>
              )}
              {searchText.length > 0 &&
                Object.keys(searchResults).length === 0 && (
                  <div data-kt-search-element="empty" className="text-center ">
                    <div className="pt-10 pb-10">
                      <i className="ki-outline ki-search-list fs-4x opacity-50"></i>
                    </div>
                    <div className="pb-15 fw-semibold">
                      <h3 className="text-gray-600 fs-5 mb-2">
                        No result found
                      </h3>
                      <div className="text-muted fs-7">
                        Please try again with a different query
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
