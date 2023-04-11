import { useState } from 'react';
import React from 'react'

const ReviewForm = ({ eventId, onReviewSubmit }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
  
    const handleSubmit = (event) => {
        console.log('called')
      event.preventDefault();
      onReviewSubmit({ event: eventId, comment, rating });
      setComment('');
      setRating(1);
    };
  
    return (
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
}

export default ReviewForm

