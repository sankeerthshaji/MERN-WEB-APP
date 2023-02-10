import "./EditProfile.css";
import React from "react";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [userDetails, setuserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userDetails = async () => {
      const email = user.email;
      console.log(email);
      await axios.post("/profile", { email } , {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      }).then((res) => {
        console.log(res.data.user);
        setuserDetails(res.data.user);
      });
    };
    userDetails();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
  }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("user", JSON.stringify(user));
    axios
      .post("/editProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <card>
        <div className="centerDiv">
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={
              image
                ? URL.createObjectURL(image)
                : userDetails &&
                  userDetails.image &&
                  userDetails.image[0] &&
                  userDetails.image[0].url
                ? userDetails.image[0].url
                : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
            }
          ></img>

          <br />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginTop: "1rem", width: "13rem" }}
            type="file"
            name="image"
            accept="image/*"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn" disabled={loading}>
            {loading ? (
              <ClipLoader size={15} color={"#fff"} />
            ) : (
              "upload and Submit"
            )}
          </button>
        </div>
      </card>
    </>
  );
}

export default EditProfile;
