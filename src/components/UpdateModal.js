import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { withAuth0 } from "@auth0/auth0-react";

class UpdateModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.modalShow} onHide={this.props.showingModal}>
                <Modal.Header>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>

                <Form style={{ padding: '20px' }} onSubmit={(e) => this.props.updateFlower(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Flower Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Flower Name" defaultValue={this.props.flowersObj.name} name='name' />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control type="text" placeholder="Write instructions" defaultValue={this.props.flowersObj.instructions} name='instructions' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Flower Photo</Form.Label>
                        <Form.Control type="text" placeholder="Insert Flower Photo" defaultValue={this.props.flowersObj.photo} name='photo' />
                    </Form.Group>

                    <Button style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} variant="primary" type="submit">
                        Update
                    </Button>
                    <Button style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }} variant="secondary" onClick={this.props.showingModal}>
                        Close
                    </Button>

                </Form>
            </Modal>
        )
    }
}
export default withAuth0(UpdateModal)