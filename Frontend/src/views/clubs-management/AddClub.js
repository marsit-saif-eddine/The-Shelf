import React, { useEffect } from "react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";
import { ContentState, EditorState } from "draft-js";
import { convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
//import { selectThemeColors } from '@utils'
import Select, { components } from "react-select";
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const OptionComponent = ({ data, ...props }) => {
  return (
    <components.Option {...props}>
      <img
        className="rounded me-50"
        src={"http://localhost:5000/" + data.profile_photo}
        width="35"
        height="35"
      />
      {data.label}
    </components.Option>
  );
};

const AddClub = ({}) => {
  const [descr, setDescr] = useState(EditorState.createEmpty());
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [adminsToSelect, setAdminsToSelect] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [avatarToUpload, setAvatarToUpload] = useState(null);
  const [clubName, setClubName] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getClubToEdit();
    } else {
      handleImgReset();
    }
    getAdminsToSelect();
  }, []);

  const getClubToEdit = () => {
    axios
      .get("http://localhost:5000/clubs/getClubToEdit", {
        params: { club_id: params.id },
      })
      .then((resp) => {
        if (resp.data) {
          setAvatar("http://localhost:5000/" + resp.data.logo);
          setSelectedAdmins(resp.data.admins.map(x => {
            return {value: x._id, label: x.lastname + ' ' + x.firstname, profile_photo: x.profile_photo}
          }));
          setClubName(resp.data.club_name);
          const _contentState = ContentState.createFromText(
            resp.data.description
          );
          const raw = convertToRaw(_contentState);
          setDescr(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(resp.data.description)
              )
            )
          );
        }
      });
  };

  const getAdminsToSelect = () => {
    axios.get("http://localhost:5000/clubs/getAdminsToSelect").then((resp) => {
      if (resp.data) {
        setAdminsToSelect(resp.data);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const rawContentState = convertToRaw(descr.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    const clubToAdd = {
      club_name: clubName,
      description: markup,
      admins: selectedAdmins.map((x) => {
        return adminsToSelect.find((y) => y._id === x.value);
      }),
    };

    let formData = new FormData();
    formData.append("logo", avatarToUpload);
    formData.append("club", JSON.stringify(clubToAdd));

    if (params.id) {
      editClub(formData);
    } else {
      addClub(formData);
    }
  };

  const addClub = (formData) => {
    axios
      .post("http://localhost:5000/clubs/addClub", formData)
      .then((response) => {
        if (response.data) {
          handleImgReset();
          setClubName("");
          setSelectedAdmins([]);
          setDescr(EditorState.createEmpty());
        }
        // CONFIRM ACTION PERFORMED HERE
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editClub = (formData) => {
    axios
      .put("http://localhost:5000/clubs/editClub", formData, {
        params: { _id: params.id },
      })
      .then((response) => {
        if (response.data) {
          console.log("done");
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
    const reader = new FileReader();
    const file = e.target.files[0];
    setAvatarToUpload(file);
    reader.onload = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSelectAdminChange = (choice) => {
    // const index = selectedAdmins.findIndex(x => x._id === choice._id);
    // console.log(index)
    // if (index < 0) {
    //   const choices = choice.map(x => {
    //     if (x.value) {
    //       return x;
    //     }
    //     return {_id: x._id, label: x.lastname + ' ' + x.firstname, profile_photo: x.profile_photo, value: x._id}
    //   });
    //   console.log(choices);
    //   setSelectedAdmins([...choices])
    // }

    // selectedAdmins.splice(index, 1);
    // setSelectedAdmins(selectedAdmins);

    setSelectedAdmins([...choice]);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            {params.id ? "Edit club" : "Create new club"}
          </CardTitle>
        </CardHeader>

        <CardBody>
          <div className="d-flex mb-1">
            <div className="me-25">
              <img
                className="rounded me-50"
                src={avatar}
                alt="Generic placeholder image"
                height="100"
                width="100"
              />
            </div>
            <div className="d-flex align-items-center mt-75 ms-1">
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
                  Allowed JPG, GIF or PNG.
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col className="mb-1" sm="12">
                <Label className="form-label">Club name</Label>
                <Input
                  type="text"
                  name="club_name"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="Club name"
                />
              </Col>

              <Col className="mb-1" sm="12">
                <Label className="form-label" for="InputHelp">
                  Club activity description
                </Label>{" "}
                <Editor
                  editorState={descr}
                  onEditorStateChange={(data) => setDescr(data)}
                />
              </Col>

              <Col className="mb-1" sm="12">
                <Label className="form-label">Administrators</Label>
                <Select
                  isClearable={false}
                  isMulti
                  name="admins"
                  menuPlacement="top"
                  value={selectedAdmins}
                  options={adminsToSelect.map((x) => {
                    return {
                      profile_photo: x.profile_photo,
                      value: x._id,
                      label: x.lastname + " " + x.firstname,
                    };
                  })}
                  closeMenuOnSelect={false}
                  onChange={(choice) => onSelectAdminChange(choice)}
                  className="react-select"
                  components={{
                    Option: OptionComponent,
                  }}
                  classNamePrefix="select"
                />
              </Col>
            </Row>

            <Row className="justify-content-end">
              <button type="submit" className="btn btn-primary flex-shrink-1">
                {params.id ? "Modifier club" : "Ajouter club"}
              </button>
            </Row>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddClub;
