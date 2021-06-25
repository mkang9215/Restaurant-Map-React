import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Card, CardDeck } from "react-bootstrap";

function Restaurant() {
    let { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://ancient-savannah-65572.herokuapp.com/api/restaurants/${id}`)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            if (data.hasOwnProperty("_id")) {
              setRestaurant(data);
            } else {
              setRestaurant(null);
            }
        });
    }, [id]);

    function convertDate(dateString) {
      let date = new Date(dateString);
      return date.toLocaleDateString();
    }

    if (!loading) {
      if (restaurant) {
          return (
            <>                
              <Card>
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>
                    {restaurant.address.building} {restaurant.address.street}
                  </Card.Text>
                </Card.Body>
              </Card>
              <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
              </MapContainer>
              <br/><h3>Ratings</h3> <hr/>
              <CardDeck>                
                {restaurant.grades.map(g => 
                  <Card>
                    <Card.Body>
                      <Card.Title>Grade: { g.grade }</Card.Title>
                    </Card.Body>
                    <Card.Footer>Completed: { convertDate(g.date) }</Card.Footer>
                  </Card>          
                )}
              </CardDeck>
            </>
          );
      } else {
          return (
              <>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      Unable to find Restaurant with id: { id }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </>
          );
      }

  } else {
      return (
        <>
          <Card>
            <Card.Body>
              <Card.Text>
                Loading Restaurant Data...
              </Card.Text>
            </Card.Body>
          </Card>
        </>
    );
  }
}

export default Restaurant;
  