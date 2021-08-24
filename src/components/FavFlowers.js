import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import UpdateModal from './UpdateModal'
import { withAuth0 } from "@auth0/auth0-react";

class FavFlowers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favFlowers: [],
      modalshow: false,
      flowersObj: {}
    }
  }

  componentDidMount() {

    const url = `${process.env.REACT_APP_SERVER}/favFlowers`
    axios.get(url).then(response => {
      this.setState({
        favFlowers: response.data
      })

    }).catch(err => {
      console.error(err)
    })
  }

  showingModal = (element) => {
    this.setState({
      modalshow: !this.state.modalshow,
      flowersObj: element
    })
  }

  deleteFlower = (id) => {
    const url = `${process.env.REACT_APP_SERVER}/favFlower/${id}`
    axios.delete(url).then(response => {
      this.setState({
        favFlowers: response.data
      })

    }).catch(err => {
      console.error(err)
    })
  }

  updateFlower = (e) => {
    e.preventDefault();
    const id = this.state.flowersObj._id,
    const body = {
      name: e.target.name.value,
      instructions: e.target.instructions.value,
      photo: e.target.photo.value,
    }
    const url = `${process.env.REACT_APP_SERVER}/favFlower/${id}`
    axios.put(url, body).then(response => {

      const flowerArr = this.state.favUnis.map(item => {

        if (item._id === id) {
          item.name = response.data.name;
          item.instructions = response.data.instructions;
          item.photo = response.data.photo;
          return item;
        }
        return item;
      });
      this.setState({ favFlowers: flowerArr })
      this.showingModal({})
      this.setState({ modalshow: false });


    }).catch(error => alert(error));
  }


  render() {
    return (
      <>
        < UpdateModal
          show={this.state.modalshow}
          showingModal={this.showingModal}
          flowersObj={this.state.flowersObj}
          updateFlower={this.updateFlower}
        />

        <Row xs={2} md={2} className="g-3">
          {this.favFlowers.length &&
            this.favFlowers.map((data, idx) => {
              return (

                <Card style={{ width: '20rem' }} className="text-center mb-3">
                  <Card.Img variant="top" src={data.photo} />
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                      {data.instructions}
                    </Card.Text>
                    <Button variant="primary" onClick={() => this.deleteFlower(_id)}>delete</Button>
                    <Button variant="primary" onClick={() => this.showingModal(data)}>add to Fav</Button>
                  </Card.Body>
                </Card>
              )
            })


          }
        </Row>
      </>
    )
  }
}

export default FavFlowers;
