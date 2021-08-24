import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flowers: []
    }
  }

  componentDidMount() {

    const url = `${process.env.REACT_APP_SERVER}/flowers`
    axios.get(url).then(response => {
      this.setState({
        flowers: response.data
      })

    }).catch(err => {
      console.error(err)
    })
  }


  addFavorite = (index) => {
    const addflower = {
      name: this.state.flowers[index].name,
      instructions: this.state.flowers[index].instructions,
      photo: this.state.flowers[index].photo,
    }
    const url = `${process.env.REACT_APP_SERVER}/favFlower`
    axios.post(url, addflower).then(response => {

    }).catch(err => {
      console.error(err)
    })
  }


  render() {
    return (
      <>
        <Row xs={2} md={2} className="g-3">
          {
            this.state.flowers.length &&
            this.state.flowers.map((data, idx) => {
              return (

                <Card style={{ width: '20rem' }} className="text-center mb-3">
                  <Card.Img variant="top" src={data.photo} />
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                      {data.instructions}
                    </Card.Text>
                    <Button variant="primary" onClick={() => this.addFavorite(idx)}>add to Fav</Button>
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

export default withAuth0(Home);
