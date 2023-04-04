import React from "react";
import { Link } from "react-router-dom";

const Tasks = () => {
  return (
    <div id="wrapper">
      <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-warning p-0">
        <div className="container-fluid d-flex flex-column p-0">
          <Link
            to="/dashboard"
            className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          >
            <div className="sidebar-brand-icon rotate-n-15"></div>
            <div className="sidebar-brand-text mx-3">
              <span>Solar epc</span>
            </div>
          </Link>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light" id="accordionSidebar">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link active">
                <i className="fas fa-list"></i>
                <span>Projects</span>
              </Link>
            </li>
          </ul>
          <div className="text-center d-none d-md-inline">
            <button
              className="btn rounded-circle border-0"
              id="sidebarToggle"
              type="button"
            ></button>
          </div>
        </div>
      </nav>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
            <div className="container-fluid">
              <button
                className="btn btn-link d-md-none rounded-circle me-3"
                id="sidebarToggleTop"
                type="button"
              >
                <i className="fas fa-bars"></i>
              </button>
              <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input
                    className="bg-light form-control border-0 small type-text"
                    type="text"
                    placeholder="Search for ..."
                  />
                  <button className="btn btn-warning py-0" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              <ul className="navbar-nav flex-nowrap ms-auto">
                <li className="nav-item dropdown d-sm-none no-arrow">
                  <a
                    className="dropdown-toggle nav-link"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <i className="fas fa-search"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="me-auto navbar-search w-100">
                      <div className="input-group">
                        <input
                          className="bg-light form-control border-0 small type-text"
                          type="text"
                          placeholder="Search for ..."
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-warning py-0"
                            type="button"
                          >
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <div className="d-none d-sm-block topbar-divider"></div>
                <li className="nav-item dropdown no-arrow">
                  <div className="nav-item dropdown no-arrow">
                    <a
                      className="dropdown-toggle nav-link"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      href="/"
                    >
                      <span className="d-none d-lg-inline me-2 text-gray-600 small">
                        Valerie Luna
                      </span>
                    </a>
                    <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                      <a className="dropdown-item" href="/">
                        <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Profile
                      </a>
                      <a className="dropdown-item" href="/">
                        <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Settings
                      </a>
                      <a className="dropdown-item" href="/">
                        <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Activity log
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="/">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                        &nbsp;Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid">
            <h3 className="text-dark mb-4">
              <Link
                to="/newTask"
                className="btn btn-warning pull-right"
                role="buton"
              >
                <i className="fa fa-plus"></i>&nbsp;New Task
              </Link>
              Tasks
            </h3>
            <div className="card shadow">
              <div className="card-header py-3">
                <p className="text-warning m-0 fw-bold">Tasks Info</p>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 text-nowrap">
                    <div
                      id="dataTable_length"
                      className="dataTables_length"
                      aria-controls="dataTable"
                    >
                      <label className="form-label">
                        Show&nbsp;
                        <select className="d-inline-block form-select form-select-sm">
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                        &nbsp;
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="text-md-end dataTables_filter"
                      id="dataTable_filter"
                    >
                      <label className="form-label">
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          aria-controls="dataTable"
                          placeholder="Search"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="table-responsive table mt-2"
                  id="dataTable"
                  role="grid"
                  aria-describedby="dataTable_info"
                >
                  <table className="table my-0" id="dataTable">
                    <thead>
                      <tr>
                        <th>Task Name</th>
                        <th>Task Assign</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Task 1</td>
                        <td>Angelica Ramos</td>
                        <td>Completed</td>
                        <td>2</td>
                        <td>2023/11/28</td>
                        <td>
                          <Link to="/taskInfo">
                            <i className="fa fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>Task 2</td>
                        <td>Ashton Cox</td>
                        <td>In Progress</td>
                        <td>3</td>
                        <td>2022/10/09</td>
                        <td>
                          <Link to="/taskInfo">
                            <i className="fa fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <strong>Task Name</strong>
                        </td>
                        <td>
                          <strong>Task Assign</strong>
                        </td>
                        <td>
                          <strong>Status</strong>
                        </td>
                        <td>
                          <strong>Priority</strong>
                        </td>
                        <td>
                          <strong>Due date</strong>
                        </td>
                        <td>
                          <strong>Actions</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="row">
                  <div className="col-md-6 align-self-center">
                    <p
                      id="dataTable_info"
                      className="dataTables_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 2 of 27
                    </p>
                  </div>
                  <div className="col-md-6">
                    <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                      <ul className="pagination">
                        <li className="page-item disabled">
                          <a
                            className="page-link"
                            aria-label="Previous"
                            href="/"
                          >
                            <span aria-hidden="true">«</span>
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link bg-warning" href="/">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="/">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" aria-label="Next" href="/">
                            <span aria-hidden="true">»</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
