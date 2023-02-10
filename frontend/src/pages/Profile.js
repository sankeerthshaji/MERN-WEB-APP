import { useSelector } from "react-redux";
import Header from "../components/user/Header";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBBtn,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useEffect , useState } from "react";
import axios from "axios";

export default function Profile() {
  const user = useSelector((state) => state.user);
  console.log(user)
  const navigate = useNavigate();
  const [userDetails,setuserDetails] = useState(null);
  useEffect(() => {
    const userDetails =  () => {
      const email = user.email;
      console.log(email)
      axios.post("/profile", { email } , {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      } ).then((res) => {
        console.log(res.data.user)
        setuserDetails(res.data.user);
      }).catch((err) => {
        console.log(err);
      });
    };
    userDetails();
  }, []);
  
  return (
    <div>
    <Header />
    <div
      className="gradient-custom-2 vh-100"
      style={{ backgroundColor: "#9de2ff" ,marginTop: "-75px" }}
    >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={
                      userDetails && userDetails.image && userDetails.image[0] && userDetails.image[0].url
                        ? userDetails.image[0].url
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    }
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <MDBBtn
                    onClick={() => {
                      navigate("/editProfile");
                    }}
                    outline
                    color="dark"
                    style={{ height: "36px", overflow: "visible", zIndex: 1 }}
                  >
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: "150px" }}>
                  <MDBTypography tag="h5">{user.email}</MDBTypography>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1 mb-4"></div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </div>
  );
}
