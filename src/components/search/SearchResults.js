import React, {useEffect} from 'react';
import Navbar from "../navigation/Navbar";
import {useLocation} from "react-router-dom";

const SearchResults = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card card-margin">
                        <div className="card-body">
                            <div className="row search-body">
                                <div className="col-lg-12">
                                    <div className="search-result">
                                        <div className="result-header">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="records">Showing: <b>1-{props.places.length}</b> of <b>{props.places.length}</b> results
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="result-actions">
                                                        <div className="result-sorting">
                                                            <span>Sort By:</span>
                                                            <select className="form-control border-0"
                                                                    id="exampleOption">
                                                                <option value="1">Relevance</option>
                                                                <option value="2">Names (A-Z)</option>
                                                                <option value="3">Names (Z-A)</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="result-body">
                                            <div className="table-responsive">
                                                <table className="table widget-26">
                                                    <tbody>
                                                    {
                                                        props.places.map(
                                                            place => <tr>
                                                                <td>
                                                                    <div className="widget-26-job-emp-img">
                                                                        <img
                                                                            src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                                                            alt="Company"/>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-job-title">
                                                                        <a href={`/accommodation/${place.id}`}>{place.title}</a>
                                                                        <p className="m-0"><a href="#"
                                                                                              className="employer-name">Axiom
                                                                            Corp.</a> <span className="text-muted time">1 days ago</span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-job-info">
                                                                        <p className="type m-0">{place.address}</p>
                                                                        <p className="text-muted m-0">in <span
                                                                            className="location">{place.location}</span></p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-job-salary">$ {place.pricePerNight}/night</div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-job-category bg-soft-base">
                                                                        <i className="indicator bg-base"></i>
                                                                        <span>{place.placeType}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="widget-26-job-starred">
                                                                        <a href="#">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24"
                                                                                height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                stroke-width="2"
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                className="feather feather-star"
                                                                            >
                                                                                <polygon
                                                                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                            </svg>
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<nav className="d-flex justify-content-center">*/}
                            {/*    <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link no-border" href="#">*/}
                            {/*                <span aria-hidden="true">«</span>*/}
                            {/*                <span className="sr-only">Previous</span>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item active"><a className="page-link no-border" href="#">1</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="page-item"><a className="page-link no-border" href="#">2</a></li>*/}
                            {/*        <li className="page-item"><a className="page-link no-border" href="#">3</a></li>*/}
                            {/*        <li className="page-item"><a className="page-link no-border" href="#">4</a></li>*/}
                            {/*        <li className="page-item">*/}
                            {/*            <a className="page-link no-border" href="#">*/}
                            {/*                <span aria-hidden="true">»</span>*/}
                            {/*                <span className="sr-only">Next</span>*/}
                            {/*            </a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*</nav>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchResults;