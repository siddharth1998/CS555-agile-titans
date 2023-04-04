import React from "react";
import { Link } from "react-router-dom";

const NewProject = () => {
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
                    className="bg-light form-control border-0 small"
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
                          className="bg-light form-control border-0 small"
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
            <div className="card-shadow">
              <div className="row register-form">
                <div className="col-md-8 offset-md-2">
                  <form className="custom-form">
                    <h1 style={{ borderColor: "rgb(255,192,7)" }}>
                      Add New Project
                    </h1>
                    <div className="row form-group">
                      <div className="col-sm-4 label-column">
                        <label
                          className="col-form-label"
                          for="name-input-field"
                        >
                          Project Name{" "}
                        </label>
                      </div>
                      <div className="col-sm-6 input-column">
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-4 label-column">
                        <label
                          className="col-form-label"
                          for="email-input-field"
                        >
                          Description
                        </label>
                      </div>
                      <div className="col-sm-6 input-column">
                        <input className="form-control" type="email" />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-4 label-column">
                        <label
                          className="col-form-label"
                          for="name-input-field"
                        >
                          Assignee
                        </label>
                      </div>
                      <div className="col-sm-6 input-column">
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-sm-4 label-column">
                        <label
                          className="col-form-label"
                          for="name-input-field"
                        >
                          Due Date
                        </label>
                      </div>
                      <div className="col-sm-6 input-column">
                        <input className="form-control" type="date" />
                      </div>
                    </div>
                    <button
                      className="btn btn-light submit-button"
                      type="button"
                      style={{ background: "rgb(255,192,7)" }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
