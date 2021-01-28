import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const Create = (props) => {
    return (
        <>
        <Modal isOpen={props.isNewModalOpen} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Add Book</ModalHeader>
            <ModalBody>
                <FormGroup>
                <Label for="bookTitle">Title</Label>
                <Input
                    type="text"
                    name="name"
                    value={props.newBookData.name}
                    onChange={props.handleChange}
                />
                </FormGroup>
                <FormGroup>
                <Label for="bookAuthor">Author</Label>
                <Input
                    type="author"        
                    name="author"
                    value={props.newBookData.author}
                    onChange={props.handleChange} 
                />
                </FormGroup>
                <FormGroup>
                <Label for="bookDescription">Description</Label>
                <Input
                    type="text"
                    name="description"
                    value={props.newBookData.description}
                    onChange={props.handleChange} 
                />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.addnewBook}>Add</Button>
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </>
    )        
}
export default Create;



