import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { element } from 'prop-types';

function RoomPage() {

    const {roomID} = useParams();
    const meeting =async(element)=>{
        
        // generate Kit Token
        const appID = 1248913853;
        const serverSecret = "7bdd2bb8f835fe9eb67a8f1d16d9a014";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),"taief");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
           container: element,scenario: {
               mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
             },
           });
    }
    
      
  return (
    <div
      ref={meeting}
      style={{ width: '95vw', height: '80vh' }}
    ></div>
  )
}

export default RoomPage