import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const Edit = (props) => {
    return (
        <>
        <Modal isOpen={props.isEditModalOpen} toggle={props.toogleEditModal}>
        <ModalHeader toggle={props.toogleEditModal}>Edit Book</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label>Title</Label>
            <Input
            type="text"
            name="name"
            value={props.editBookData.name}
            onChange={props.handleChangeForEdit}
            />
        </FormGroup>
        <FormGroup>
            <Label>Author</Label>
            <Input
            type="text"
            name="author"
            value={props.editBookData.author}
            onChange={props.handleChangeForEdit} 
            />
        </FormGroup>
        <FormGroup>
            <Label>Description</Label>
            <Input
            type="text"
            name="description"
            value={props.editBookData.description}
            onChange={props.handleChangeForEdit} 
            />
        </FormGroup>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={props.updateBookData}>Update</Button>
        <Button color="secondary" onClick={props.toogleEditModal}>Cancel</Button>
        </ModalFooter>
        </Modal>  
        </>
    )
}
export default Edit;
