import { Card, CardGroup , Button } from "react-bootstrap";
import { connect } from "react-redux";

const Body = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1 style={{ color: "blue" }}>Welcome to our travel website</h1>
      <p style={{ fontSize: "1.5rem" }}>Explore the beauty of the world</p>
      <CardGroup style={{ padding: "2rem" }}>
        <Card>
          <Card.Img
            variant="top"
            src="https://media.gettyimages.com/id/510967662/photo/santorini-sunset-at-dawn-village-of-oia-greece.jpg?s=612x612&w=gi&k=20&c=y8yqlMCVlKXw4q4JT4VtvhPaYJk1msLiohNRt5L-kAA="
          />
          <Card.Body>
            <Card.Title>Santorini, Greece</Card.Title>
            <Card.Text>
              Santorini is a picturesque island in the Aegean Sea, famous for
              its stunning views, beautiful beaches and white-washed buildings.
            </Card.Text>
            <Button variant="primary">Learn more</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          />
          <Card.Body>
            <Card.Title>Paris, France</Card.Title>
            <Card.Text>
              Paris, the city of love and lights, is famous for its iconic
              landmarks, such as the Eiffel Tower and Notre-Dame, as well as its
              rich culture and history.
            </Card.Text>
            <Button variant="primary">Learn more</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://media.istockphoto.com/id/675172642/photo/pura-ulun-danu-bratan-temple-in-bali.jpg?s=612x612&w=0&k=20&c=_MPdmDviIyhldqhf7t6s63C-bZbTGfNHMlJP9SIa8Y0="
          />
          <Card.Body>
            <Card.Title>Bali, Indonesia</Card.Title>
            <Card.Text>
              Bali is a tropical paradise, known for its stunning scenery,
              vibrant culture, and diverse range of activities, from surfing to
              yoga.
            </Card.Text>
            <Button variant="primary">Learn more</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Body)
