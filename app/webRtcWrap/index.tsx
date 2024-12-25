import { View, Text } from 'react-native'
import React from 'react'
import WebRtcWrapComponent from '@/components/webRtcWrapComponent'
import StackScreenHeader from '@/components/StackScreenHeader'

export default function webRtcWrap() {
  return (
    <View>
        <StackScreenHeader  options={{headerTitle: 'webRtcWrap'}} />
      <Text>index</Text>
      <WebRtcWrapComponent><Text>sds</Text></WebRtcWrapComponent>
      <Text>ssssssss</Text>
    </View>
  )
}