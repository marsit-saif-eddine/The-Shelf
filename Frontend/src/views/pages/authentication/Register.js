// ** React Imports
import { Link, useParams } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

import axios from "axios";

import { useEffect, useState } from "react";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const Register = () => {
  // ** Hooks
  const { skin } = useSkin();
  const [avatar, setAvatar] = useState("");
  const [avatarToUpload, setAvatarToUpload] = useState(null);
  const [signedUp, setSignedUp] = useState();
  const [userForm, setUserForm] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
  });
  const params = useParams();

  let formError = null;

  useEffect(() => {
    if (params.id) {
      axios
        .get("http://localhost:5000/signUp/getPreInscription?id=" + params.id)
        .then((resp) => {
          setUserForm(resp.data);
        });
    } else {
      handleImgReset();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.password.value != event.target.confirm_password.value) {
      formError = "Please confirm your password";
      return;
    }
    //delete userForm.confirm_password
    userForm["password"] = event.target.password.value;
    userForm._id = params.id || null;

    let formData = new FormData();
    formData.append("img", avatarToUpload);
    formData.append("user", JSON.stringify(userForm));
    console.log(formData.getAll('img'));
    if (params.id) {
      adminSignUp(formData);
    } else {
      signUp(formData);
    }
    //event.target.reset();
  };

  const signUp = (formData) => {
    axios
    .post("http://localhost:5000/signUp/signUp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.data) {
          setSignedUp(true);
        }
        // CONFIRM ACTION PERFORMED HERE
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImgReset = () => {
    setAvatar(
      require("@src/assets/images/portrait/small/avatar-s-11.jpg").default
    );
    setAvatarToUpload(null);
  };

  const onAvatarChange = (e) => {
    e.preventDefault();
    //const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);
    setAvatarToUpload(file);
    // reader.onload = function () {
    //   setAvatar(reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  const adminSignUp = (formData) => {
    axios
      .post("http://localhost:5000/signUp/adminSignUp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          setSignedUp(true);
        }
        // CONFIRM ACTION PERFORMED HERE
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const illustration =
      skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Vuexy</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          {signedUp ? (
            <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                You signed up successfuly 🚀
              </CardTitle>
              <CardText className="mb-2">
                Please check your email inbox to verify your account!
              </CardText>
            </Col>
          ) : (
            <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                Adventure starts here 🚀
              </CardTitle>
              <CardText className="mb-2">
                Make your app management easy and fun!
              </CardText>
              <div className="d-flex">
                <div className="me-25">
                  <img
                    className="rounded me-50"
                    src={avatar}
                    alt="Generic placeholder image"
                    height="100"
                    width="100"
                  />
                </div>
                <div className="d-flex align-items-end mt-75 ms-1">
                  <div>
                    <Button
                      tag={Label}
                      className="mb-75 me-75"
                      size="sm"
                      color="primary"
                    >
                      Upload
                      <Input
                        type="file"
                        onChange={onAvatarChange}
                        hidden
                        accept="image/*"
                      />
                    </Button>
                    <Button
                      className="mb-75"
                      color="secondary"
                      size="sm"
                      outline
                      onClick={handleImgReset}
                    >
                      Reset
                    </Button>
                    <p className="mb-0">
                      Allowed JPG, GIF or PNG. Max size of 800kB
                    </p>
                  </div>
                </div>
              </div>
              <Form className="auth-register-form mt-2" onSubmit={handleSubmit}>
                <div className="mb-1">
                  <Label className="form-label">Lastname</Label>
                  <Input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    value={userForm["lastname"]}
                    onChange={(e) =>
                      setUserForm({ ...userForm, lastname: e.target.value })
                    }
                    autoFocus
                  />
                </div>

                <div className="mb-1">
                  <Label className="form-label">Firstname</Label>
                  <Input
                    type="text"
                    name="firstname"
                    value={userForm["firstname"]}
                    onChange={(e) =>
                      setUserForm({ ...userForm, firstname: e.target.value })
                    }
                    placeholder="Firstname"
                  />
                </div>

                <div className="mb-1">
                  <Label className="form-label">Email</Label>
                  <Input
                    type="Email"
                    name="email"
                    value={userForm["email"]}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </div>

                <div className="mb-1">
                  <Label className="form-label">Phone number</Label>
                  <Input
                    type="number"
                    name="phone_number"
                    value={userForm["phone_number"]}
                    onChange={(e) =>
                      setUserForm({ ...userForm, phone_number: e.target.value })
                    }
                    placeholder="Phone number"
                  />
                </div>

                <div className="mb-1">
                  <Label className="form-label">address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={userForm["address"]}
                    onChange={(e) =>
                      setUserForm({ ...userForm, address: e.target.value })
                    }
                    placeholder="Address"
                  />
                </div>

                <div className="mb-1">
                  <Label className="form-label">Password</Label>
                  <InputPasswordToggle
                    name="password"
                    className="input-group-merge"
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label">Confirm password</Label>
                  <InputPasswordToggle
                    name="confirm_password"
                    className="input-group-merge"
                  />
                </div>
                <div className="form-check mb-1">
                  <Input type="checkbox" id="terms" />
                  <Label className="form-check-label" for="terms">
                    I agree to
                    <a
                      className="ms-25"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      privacy policy & terms
                    </a>
                  </Label>
                </div>
                {/* tag={Link} to="/" */}
                <Button color="primary" type="submit" block>
                  Sign up
                </Button>
              </Form>
              <p className="text-center mt-2">
                <span className="me-25">Already have an account?</span>
                <Link to="/login">
                  <span>Sign in instead</span>
                </Link>
              </p>
              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>
              <div className="auth-footer-btn d-flex justify-content-center">
                <Button color="facebook">
                  <Facebook size={14} />
                </Button>
                <Button color="twitter">
                  <Twitter size={14} />
                </Button>
                <Button color="google">
                  <Mail size={14} />
                </Button>
                <Button className="me-0" color="github">
                  <GitHub size={14} />
                </Button>
              </div>
            </Col>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Register;
