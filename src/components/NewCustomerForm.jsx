import React from 'react';
import Form from "./common/form";
import { Joi } from 'joi-browser';
import { getCustomers, getCustomer, saveCustomer } from '../services/customerService';

class NewContactForm extends Form {
    state = { 
        data: { name: "", isGold: false, phone: "" },
        customerClasses: [],
        errors: {}
     }

    schema = {
        _id: Joi.string(),
        name: Joi.string()
                .required()
                .label('Name'),
        isGold: Joi.boolean()
                .required(),
        phone: Joi.string()
                .required()
                .label('Phone'),
    };

    async populateCustomerClasses() {
        const { data: customers } = await getCustomers();
        console.log("Customer Classes", getCustomers);
        let customerClasses = [];
        customers.map(customer => 
           customer.isGold === true ? customerClasses.push("Gold") : "");

       this.setState({ customerClasses });
    }

     async populateCustomer() {
        try {
            const customerId = this.props.match.params.id;
            if(customerId === "new") return;

            const { data: customer } = await getCustomer(customerId);
            console.log(customer);
            this.setState({ data: this.mapToViewModel(customer)});
        }
        catch(ex) {
            if(ex.response && ex.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
     }

     async componentDidMount() {
         await this.populateCustomer();
         this.populateCustomerClasses();
     }

     mapToViewModel(customer) {
        return {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        }
    }

    doSubmit = async () => {
        await saveCustomer(this.state.data);
        this.props.history.push("/customers");
        console.log("Submitted");
    }

    render() { 
        return ( 
            <div>
                <h1>Customer Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Name")}
                    {this.renderSelect("memberClass", "Class", this.state.customerClasses)}
                    {this.renderInput("phone","Phone")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 
export default NewContactForm;