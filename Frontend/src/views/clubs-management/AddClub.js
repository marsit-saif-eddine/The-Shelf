import React, { useEffect } from "react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
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
      <img className='me-50' src={data.photo} size={14} />
      {data.label}
    </components.Option>
  )
}

const AddClub = ({}) => {
  const [descr, setDescr] = useState(EditorState.createEmpty());
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [adminsToSelect, setAdminsToSelect] = useState([]);
  const [clubName, setClubName] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getClubToEdit();
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
        setSelectedAdmins(resp.data.admins);
        setClubName(resp.data.club_name);
        const _contentState = ContentState.createFromText(
          resp.data.description
        );
        const raw = convertToRaw(_contentState);
        setDescr(EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(resp.data.description)
          )
        ));

      }
    });
  }

  const getAdminsToSelect = () => {
    axios
    .get("http://localhost:5000/clubs/getAdminsToSelect")
    .then((resp) => {
      if (resp.data) {
        setAdminsToSelect(resp.data);
      }
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const rawContentState = convertToRaw(descr.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    const formData = {
      club_name: clubName,
      description: markup,
      admins: selectedAdmins,
    };

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
        setClubName("");
        setSelectedAdmins([]);
        setDescr(EditorState.createEmpty());
      }
      // CONFIRM ACTION PERFORMED HERE
    })
    .catch((err) => {
      console.log(err);
    });

  }

  const editClub = (formData) => {
    axios
    .put("http://localhost:5000/clubs/editClub", formData, {params: {_id: params.id}})
    .then((response) => {
      if (response.data) {
        console.log("done");
      }
      // CONFIRM ACTION PERFORMED HERE
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
          {params.id ? 'Modifier un club' : 'Ajouter un club'}
          </CardTitle>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col className="mb-1" sm="12">
                <Label className="form-label">Nom du club</Label>
                <Input
                  type="text"
                  name="club_name"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="Nom du club"
                />
              </Col>

              <Col className="mb-1" sm="12">
                <Label className="form-label" for="InputHelp">
                  Description de l'activité du club
                </Label>{" "}
                <Editor
                  editorState={descr}
                  onEditorStateChange={(data) => setDescr(data)}
                />
              </Col>

              <Col className="mb-1" sm="12">
                <Label className="form-label">Liste des administrateurs</Label>
                <Select
                  isClearable={false}
                  isMulti
                  name="admins"
                  value={selectedAdmins}
                  options={adminsToSelect}
                  onChange={(choice) => setSelectedAdmins([...choice])}
                  className="react-select"
                  components={{
                    Option: OptionComponent
                  }}
                  classNamePrefix="select"
                />
              </Col>
            </Row>

            <Row className="justify-content-end">
              <button type="submit" className="btn btn-primary flex-shrink-1">
                {params.id ? 'Modifier club' : 'Ajouter club'}
              </button>
            </Row>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddClub;
