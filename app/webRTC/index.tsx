import { View, Text } from 'react-native'
import React from 'react'
import {
	ScreenCapturePickerView,
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	MediaStream,
	MediaStreamTrack,
	mediaDevices,
	registerGlobals
} from 'react-native-webrtc';
import StackScreenHeader from '@/components/StackScreenHeader';
let localMediaStream;
let cameraCount = 0;
let isVoiceOnly = false;
const getDevices = async() => {
    
  
    try {
        const devices:any = await mediaDevices.enumerateDevices();
    
        devices.map( device => {
            if ( device.kind != 'videoinput' ) { return; };
    
            cameraCount = cameraCount + 1;
        } );
        console.log('cameraCount',cameraCount);
        
    } catch( err ) {
        // Handle Error
        console.log('err',err);
        
    };
}

const getMedia = async()=>{
    const mediaConstraints = {
        audio: true,
        video: {
            frameRate: 30,
            facingMode: 'user'
        }
    };
    
    
    
    try {
        const mediaStream = await mediaDevices.getUserMedia( mediaConstraints );
    
        if ( isVoiceOnly ) {
            const videoTrack = await mediaStream.getVideoTracks()[ 0 ];
            videoTrack.enabled = false;
        };
    
        localMediaStream = mediaStream;
        console.log('localMediaStream',localMediaStream);
        
    } catch( err ) {
        // Handle Error
        console.log('err',err);
    };
}

const getDisplayMedia = async()=>{
    try {
        const mediaStream = await mediaDevices.getDisplayMedia();
      
        localMediaStream = mediaStream;
    } catch( err ) {
        // Handle Error
    };
}

const destoryMedia = ()=>{
    localMediaStream.getTracks().map(
        track => track.stop()
    );
      
    localMediaStream = null;
}

let peerConnection 
const getConnection = () =>{
    const peerConstraints = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ]
    };

    peerConnection = new RTCPeerConnection( peerConstraints );
    peerConnection.addEventListener( 'connectionstatechange', event => {} );
    peerConnection.addEventListener( 'icecandidate', event => {} );
    peerConnection.addEventListener( 'icecandidateerror', event => {} );
    peerConnection.addEventListener( 'iceconnectionstatechange', event => {} );
    peerConnection.addEventListener( 'icegatheringstatechange', event => {} );
    peerConnection.addEventListener( 'negotiationneeded', event => {} );
    peerConnection.addEventListener( 'signalingstatechange', event => {} );
    peerConnection.addEventListener( 'addstream', event => {} );
    peerConnection.addEventListener( 'removestream', event => {} );
}

const addStream = ()=>{
    peerConnection.addStream( localMediaStream );
}


const closePeerConnection = ()=>{
    peerConnection._unregisterEvents();
    peerConnection.close();
    peerConnection = null;
}
let datachannel
const createDataChannel = ()=>{
    datachannel = peerConnection.createDataChannel( 'my_channel' );
    datachannel.addEventListener( 'open', event => {} );
    datachannel.addEventListener( 'close', event => {} );
    datachannel.addEventListener( 'message', message => {} );

}

const handleDataChannel = ()=>{
    peerConnection.addEventListener( 'datachannel', event => {
        let datachannel = event.channel;
      
        // Now you've got the datachannel.
        // You can hookup and use the same events as above ^
        datachannel.send( 'Hey There!' );
        datachannel.close();
        datachannel = null;
    } );


    
}

const createOffer = async()=>{
    let sessionConstraints = {
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
            VoiceActivityDetection: true
        }
    };
    let offerDescription
    try {
         offerDescription = await peerConnection.createOffer( sessionConstraints );
        await peerConnection.setLocalDescription( offerDescription );
        createHandleDescription(offerDescription,sessionConstraints)
      
        // Send the offerDescription to the other participant.
    } catch( err ) {
        // Handle Errors
    };

    
}

const createHandleDescription = async(offerDescriptions:any,sessionConstraints:any)=>{
    try {
        // Use the received offerDescription
        const offerDescription = new RTCSessionDescription( offerDescriptions );
        await peerConnection.setRemoteDescription( offerDescription );
      
        const answerDescription = await peerConnection.createAnswer( sessionConstraints );
        await peerConnection.setLocalDescription( answerDescription );
      
        // Send the answerDescription back as a response to the offerDescription.
    } catch( err ) {
        // Handle Errors
    };
}

const getAudioTracks = async()=>{
    let isMuted = false;
  
    try {
        const audioTrack = await localMediaStream.getAudioTracks()[ 0 ];
        audioTrack.enabled = !audioTrack.enabled;
    
        isMuted = !isMuted;
    } catch( err ) {
        // Handle Error
    };
}

const getVideoTracks = async()=>{
    let isFrontCam = true;
  
    try {
        // Taken from above, we don't want to flip if we don't have another camera.
        if ( cameraCount < 2 ) { return; };
    
        const videoTrack = await localMediaStream.getVideoTracks()[ 0 ];
        videoTrack._switchCamera();
    
        isFrontCam = !isFrontCam;
    } catch( err ) {
        // Handle Error
    };

}

export default function weRtc() {
    registerGlobals();
    getDevices()
    getMedia()
    getConnection()
    // addStream()
    
  return (
    <View>
         <StackScreenHeader  options={{headerTitle: 'weRtc'}} />
      <Text>weRtc</Text>
      {/* <RTCView
        mirror={true}
        objectFit={'cover'}
        streamURL={localMediaStream.toURL()}
        zOrder={0}
        /> */}

    </View>
  )
}