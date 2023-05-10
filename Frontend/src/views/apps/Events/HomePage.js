import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
function HomePage() {
    const [RoomCode, setRoomCode] = useState('');
    const Navigate = useNavigate();
    const submitCode = () => {
        Navigate(`/room/${RoomCode}`)
    }


    return (
        <>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <div style={{ display: 'flex', alignItems: 'center', maxWidth: '500px' }}>
    <img src={process.env.PUBLIC_URL + '/image/shelf.jpg'} alt="image" style={{ width: '400px', marginRight: '20px' }} />
    <div>
      <label style={{ fontWeight: 'bold', marginBottom: '10px' }}>Enter room code:</label>
      <input 
        type="text" 
        value={RoomCode} 
        onChange={(e) => setRoomCode(e.target.value)} 
        required 
        placeholder="Enter code room"
        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }}
      />
    </div>
    <button type="submit" onClick={submitCode} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#ff9f43', color: '#fff', border: 'none', cursor: 'pointer' }}>GO</button>
  </div>
</div>

        </>
              


    )
}

export default HomePage