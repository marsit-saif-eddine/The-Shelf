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
import { useDispatch } from "react-redux";

import { publishAnnouncement } from "../../../../redux/clubs";

const Filter = require('bad-words');

const filter = new Filter();
const words = require('../../../../extra-words.json');

filter.addWords(...words);


const AnnouncementsTab = () => {
  const [newAnnouncement, setNewAnnouncement] = useState(
    EditorState.createEmpty()
  );
  
  const [showEditor, setShowEditor] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const club_id = params.id;

  const handleSubmit = () => {

    if (showEditor) {
      addAnnouncement();
    } else {
      setShowEditor(true);
    }
  };

  const addAnnouncement = () => {
    const rawContentState = convertToRaw(newAnnouncement.getCurrentContent());
    const text = draftToHtml(rawContentState);
    
    dispatch(publishAnnouncement({ club_id, text: filter.clean(text) }));
    
    setNewAnnouncement(EditorState.createEmpty());
    setShowEditor(false);

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
