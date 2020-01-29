import React, { Component } from 'react';
import { getCustomers, deleteCustomer } from '../services/customerService';
import MemberClass from './memberClass';
import SearchBox from './common/searchBox';
import CustomersTable from './customersTable';
import Pagination from './common/pagination';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { paginate } from '../utils/paginate';
import _ from "lodash";

class Customers extends Component {
  state = { 
    customers: [],
    memberClasses: [],
    pageSize: 3,
    currentPage: 1,
    searchField: "",
    sortColumn: { path: "name", order: "asc" },
    currentMemberClass: null
  }

  async componentDidMount() {
    const getMemberClasses = this.getMemberClasses();
    const memberClasses = [{ _id: "", class: "All Member Classes"}, ...getMemberClasses];
    const { data: customers } = await getCustomers();
    this.setState({ customers, memberClasses });
  }

  getMemberClasses = () => {
    const classes = [
      {_id: "gold", class: "Gold"}
    ];
    return classes;
  }

  handleDelete = async customer => {
    const originalCustomers = this.state.customers;
    originalCustomers.filter(c => c._id !== customer._id);

    this.setState({ customers: originalCustomers });
    try {
      await deleteCustomer(customer._id);
    }
    catch(ex) {
      if(ex.response && ex.response.status === 404)
        toast.error("The post has been already deleted");
      
      this.setState({ customers: originalCustomers });
    }
  }

  handleCustomerClass = memberClass => {
    console.log(`Class: ${memberClass.class}`);
    this.setState({ currentMemberClass: memberClass, searchField: "", currentPage: 1 });
  }

  handlePageChange = page => {
    console.log(`Page: ${page}`);
    this.setState({ currentPage: page });
  }

  handleSort = sortColumn => {
    console.log(sortColumn);
    this.setState({ sortColumn });
  }

  handleSearch = query => {
    this.setState({ searchField: query, currentPage: 1, currentMemberClass: null });
  }

  getPageData = () => {
    const {
      customers: allCustomers,
      pageSize,
      currentPage,
      searchField,
      sortColumn,
      currentMemberClass
    } = this.state;

    let filteredCustomers = allCustomers;

    if(searchField)
      filteredCustomers = allCustomers.filter(c => 
        c.name.toLowerCase().startsWith(searchField.toLowerCase())
      );
    else if(currentMemberClass && currentMemberClass._id)
        filteredCustomers = allCustomers.filter(c => c._id === currentMemberClass._id);

    const sorted = _.orderBy(
      filteredCustomers,
      [sortColumn.path],
      [sortColumn.order]
    );

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: customers.length, data: customers };
  }

  render() { 
    const { user } = this.props;
    const { 
      customers: allCustomers,
      memberClasses,
      currentMemberClass,
      searchField,
      sortColumn,
      pageSize,
      currentPage
    } = this.state;
    const { totalCount, data: customers } = this.getPageData();

    return (
      <div className="row">
        <div className="col-2">
          <MemberClass
            memberClassList={memberClasses}
            onMemberClassSelect={this.handleCustomerClass}
            currentMemberClass={currentMemberClass}
          />
        </div>
        <div className="col">
          {user && (
          <Link className="btn btn-primary" to="/customers/new">
            New Customer
          </Link>
          )}
          <h5 className="m-2">
            {allCustomers.length > 0 && `Showing ${totalCount} in the database`}
          </h5>
          <SearchBox
            name="searchField"
            value={searchField}
            onChange={this.handleSearch}
            placeholder="Customer"
          />
          <CustomersTable
            customers={customers}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}
 
export default Customers;