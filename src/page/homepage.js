import React, { useState } from 'react';
import CreateModal from '../components/modal';
import Modal from "react-bootstrap/Modal";
import Axios from 'axios';
import { Url } from '../Url';
import Swal from 'sweetalert2'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showModal: false,
            title: '',
            description: '',
            id: ''
        }
    }

    handleShow = () => {this.setState({ showModal: true })}
    handleHide = () => this.setState({ showModal: false })

    componentDidMount() {
        let token = localStorage.getItem('token');
        Axios.get(`${Url.api}${Url.getall}`, { headers: { "Authorization": `Bearer ${token}` } }).then((result) => {
            console.log(result)
            this.setState({ data: result.data })
            console.log(this.state.data)
        })

    }

    renderdata() {
        return this.state.data.map((data, index) => {
            return (
                <tr key={data._id}>
                    <td>{index + 1}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td><button type="button" className="btn btn-danger" onClick={() => this.delete(data._id)}>Delete</button></td>
                    <td><button type="button" className="btn btn-info" onClick={() => this.getOne(data._id)}>Edit</button></td>
                </tr>
            );
        })
    }

    getOne(id) {
        let token = localStorage.getItem('token');
        this.setState({id:id})
        this.handleShow()
        Axios.get(`${Url.api}${Url.delete}/${id}`, { headers: { "Authorization": `Bearer ${token}` } }).then((result) => {
            this.setState({title: result.data.title,description: result.data.description})
            console.log(this.state.id)
            console.log(`${Url.api}${Url.update}/${this.state.id}`)
        })
        // console.log(id)
    }

    update(id) {
        let token = localStorage.getItem('token');
        Axios.put(`${Url.api}${Url.update}/${id}`,{title:this.state.title,description:this.state.description},{ headers: { "Authorization": `Bearer ${token}` } }).then((result) => {
            console.log(result)
        })
    }

    delete(id) {
        let token = localStorage.getItem('token');
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.value) {
                Axios.delete(`${Url.api}${Url.delete}/${id}`, { headers: { "Authorization": `Bearer ${token}` } }).then((result) => {
                    if (result.status == 200) {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then((result) => {
                            window.location.href = "/homepage"
                        })
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Can not delete!',
                            'Your file has been saved.',
                            'error'
                        )
                    }
                })

            }
        })
        // console.log(id)
    }

    render() {
        return (
            <div>
                <CreateModal />
                <br />
                <br />
                <table align="center">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>title</td>
                            <td>description</td>
                            <td colSpan="2">action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderdata()}
                    </tbody>
                </table>
                <Modal show={this.state.showModal} onHide={this.handleHide} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update TODO</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form >
                            <div className="form-group">
                                <label>Title</label>
                                <input className="form-control" id="title" rows="1" name="title" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} ></input>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" id="description" rows="3" name="description" value={this.state.description} onChange={e => this.setState({ description: e.target.value })}></input>
                            </div>
                            <button className="btn btn-danger" onClick={this.handleHide}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-info" onClick={() => this.update(this.state.id)}>
                                Update
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Homepage;