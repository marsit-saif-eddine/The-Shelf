import axios from "axios";
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

const InviteAdmin = () => {

  const handleSubmit = (event) => {
    const user = {};
    event.preventDefault();

    if (
      !event.target.lastname.value ||
      !event.target.firstname.value ||
      !event.target.email.value
    ) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    for (const [key, value] of formData.entries()) {
      user[key] = value;
    }

    axios
      .post("http://localhost:5000/signUp/inviteAdmin", user)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Invite admin</CardTitle>
      </CardHeader>
      <CardBody className="py-2 my-25">
        <Form className="mt-2 pt-50" onSubmit={handleSubmit}>
          <Row>
            <Col sm="6" className="mb-1">
              <Label className="form-label">Lastname</Label>
              <Input placeholder="Lastname" name="lastname" />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label">Firstname</Label>
              <Input placeholder="Firstname" name="firstname" />
            </Col>

            <Col sm="6" className="mb-1">
              <Label className="form-label">Email</Label>
              <Input type="email" placeholder="Email" name="email" />
            </Col>

            <Col className="align-items-end mt-2" sm="12">
              <Button type="submit" className="me-1" color="primary">
                Send invitation
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default InviteAdmin;
