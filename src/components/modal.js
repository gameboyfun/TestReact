import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Url } from '../Url';
import Axios from 'axios';
import Swal from 'sweetalert2';

function CreateModal() {
    let token = localStorage.getItem('token');
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form, setState] = useState({
        title: '',
        description: ''
    });
    const updateField = e => {
        setState({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    let config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    }
    let data = {
        'title': form.title,
        'description': form.description
    }
    const sendValues = e => {
        e.preventDefault();
        console.log(form)
        Axios.post(`${Url.api}${Url.create}`,data,config).then((result) => {
            console.log(result)
            Swal.fire(
                'TODO Create!',
                'Your file has been created!',
                'success'
            ).then((result) => {
                window.location.href = "/homepage"
            })
        })
    };

    return (
        <>
            <button className="btn btn-info" onClick={handleShow}>
                Create
            </button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create TODO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={sendValues}>
                        <div className="form-group">
                            <label>Title</label>
                            <input className="form-control" id="title" rows="1" name="title" value={form.title} onChange={updateField}></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" id="description" rows="3" name="description" value={form.description} onChange={updateField}></input>
                        </div>
                        <button className="btn btn-danger" onClick={handleClose}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-info">
                            Create
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateModal;