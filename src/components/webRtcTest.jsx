// import { View, Text } from 'react-native'
// import React,{useRef,useEffect} from 'react'
// import { io } from 'socket.io-client';
// import {
//     mediaDevices,
//     RTCView,
//     RTCPeerConnection,
//     RTCSessionDescription,
//     RTCIceCandidate,
//     MediaStream,
//   } from 'react-native-webrtc';

// const connection = (stream:any,remote_video:any,peer:any)=>{
    
//     // 2. 将本地视频流添加到实例中
//     stream.getTracks().forEach((track) => {
//     peer.addTrack(track, stream);
//     });
//     // 3. 接收远程视频流并播放
//     peer.ontrack = async (event) => {
//     let [remoteStream] = event.streams;
//     remote_video.current.srcObject = remoteStream;
//     };


// }

// export default function webRtcTest() {
//     let stream = null;
//     const local_video = useRef();
//     const remote_video = useRef();
//     const getMedia = async () => {
//     let ori_stream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: true,
//         });
//         stream = ori_stream;
//     };

//     // stream 是上一步获取的本地视频流
//     if (local_video.current) {
//         local_video.current.srcObject = stream;
//     }
//     // 1. 创建实例
//     let peer = new RTCPeerConnection();
//     connection(stream,remote_video,peer)

//     let socket = null;
//     const socketInit = () => {
//     let sock = io(`https://xxxx/webrtc`, {
//         auth: {
//         userid: '111',
//         username: '我是接收端',
//         role: 'reader',
//         },
//     });
//     sock.on('connect', () => {
//         console.log('连接成功');
//         });
//         socket = sock;
//     };
//     useEffect(() => {
//         socketInit();
//     }, []);

//     // 接收 offer
//     socket.on('offer', (data) => {
//         transMedia(data);
//     });
//     // 发送 answer
//     const transMedia = async (data: any) => {
//         let offer = new RTCSessionDescription(data.offer);
//         await peer.setRemoteDescription(offer);
//         let answer = await peer.createAnswer();
    
//         socket.emit('answer', {
//         to: data.from, // 呼叫端 Socket ID
//         answer,
//         });
//         await peer.setLocalDescription(answer);
//     };
  
//     // 发送 offer
//     const peerInit = async (socket_id) => {
//         let offer = await peer.createOffer();
//         peer.setLocalDescription(offer);
//         socket.emit('offer', {
//         to: socket_id, // 接收端 Socket ID
//         offer: offer,
//         });
//     };
//     // 接收 answer
//     socket.on('answer', (data) => {
//         let answer = new RTCSessionDescription(data.answer);
//         peer.setRemoteDescription(answer);
//     });
  
//     // 发送 candidate
//     peer.onicecandidate = (event) => {
//         if (event.candidate) {
//         socket.emit('candid', {
//             to: socket_id, // 接收端 Socket ID
//             candid: event.candidate,
//         });
//         }
//     };
//     // 接收 candidate
//     socket.on('candid', (data) => {
//         let candid = new RTCIceCandidate(data.candid);
//         peer.addIceCandidate(candid);
//     });


//   return (
//     <View>
//       <Text>webRtcTest</Text>
//       <video ref={local_video} autoPlay muted />;
//       <video ref={remote_video} autoPlay muted />;
//     </View>
//   )
// }

