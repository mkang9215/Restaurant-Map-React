import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Card, Table, Pagination } from "react-bootstrap";

function Restaurants() {
    const perPage = 10;
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage ] = useState(1);
    let location = useLocation();
    let history = useHistory();
    let borough = queryString.parse(location.search).borough; 
    useEffect(()=>{
        let url = borough ? `https://ancient-savannah-65572.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}` :
        `https://ancient-savannah-65572.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

        fetch(url).then(res => res.json()).then(data => {                
            setRestaurants(data);
        });
    }, [borough, page]);

    function previousPage(){ 
        page > 1 ? setPage(page - 1) : setPage(page)
    }

    function nextPage(){ 
        setPage(page + 1);
    }

    if (!restaurants) {
        return (
          <>
            <Card>
              <Card.Body>
                <Card.Text>
                  Loading Restaurants...
                </Card.Text>
              </Card.Body>
            </Card>
          </>
      );
    } else if (restaurants.length === 0) {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            No Restaurants Found
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    } else {                
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text>
                            Full list of restaurants. Optionally sorted by borough<br />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Borough</th>
                            <th>Cuisine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant) => 
                            <tr key={restaurant._id} onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address.building} {restaurant.address.street}</td>                            
                                <td>{restaurant.borough}</td>
                                <td>{restaurant.cuisine}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.Prev onClick={ previousPage }/>
                    <Pagination.Item>{ page }</Pagination.Item>
                    <Pagination.Next onClick={ nextPage }/>
                </Pagination>
            </>
        );
    } 
}

export default Restaurants;
  