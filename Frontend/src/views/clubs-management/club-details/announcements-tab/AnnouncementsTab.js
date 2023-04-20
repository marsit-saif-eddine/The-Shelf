import React, { useState } from "react";
import AnnouncementsList from "./AnnouncementsList";
import "@styles/react/libs/editor/editor.scss";
import { ContentState, EditorState } from "draft-js";
import { convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { Label } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
const AnnouncementsTab = () => {
  const [newAnnouncement, setNewAnnouncement] = useState(
    EditorState.createEmpty()
  );
  const [showEditor, setShowEditor] = useState(false);
  const params = useParams();
  const club_id = params.id;
  const handleSubmit = () => {

    if (showEditor) {
      publishAnnouncement();
    } else {
      setShowEditor(true);
    }
  };

  const publishAnnouncement = () => {
    const rawContentState = convertToRaw(newAnnouncement.getCurrentContent());
    console.log(rawContentState);
    const text = draftToHtml(rawContentState);

    axios
      .post(
        "http://localhost:5000/clubs/publishAnnouncement",
        { club_id, text },
        { params: { club_id } }
      )
      .then((resp) => {
        if (resp.data) {
          setNewAnnouncement(EditorState.createEmpty());
        }
      });
  };

  return (
    <div className="row m-0 announcement-container">
      {showEditor ? (
        <div className="col-12">
          <Label className="form-label" for="InputHelp">
            Publish an announcement
          </Label>
          <div className="card editor-card mb-50">
            <Editor
              className="bg-white"
              editorState={newAnnouncement}
              onEditorStateChange={(data) => setNewAnnouncement(data)}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="col-12">
        <button
          className="btn btn-outline-primary w-100 mb-1"
          onClick={handleSubmit}
        >
          Publish announcement
        </button>
      </div>

      <AnnouncementsList />
    </div>
  );
};

export default AnnouncementsTab;
