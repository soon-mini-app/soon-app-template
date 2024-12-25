import styled from 'styled-components/native'
import {  Link, Stack } from 'expo-router'
import ScreenLayout from 'src/components/ScreenLayout'
import { Text} from 'react-native'
import { getList } from 'src/api/login'
import { useEffect } from 'react'

export default function LoginScreen() {
  useEffect(()=>{
    console.log('useEffect');
    
  },[])
  const res = getList()
  console.log('getList',res,getList.getKey());
  
  
  return (
    <ScreenLayout testID="home-screen-layout">
      <S.Content testID="home-screen-content">
        {/* 动态修改导航栏标题 */}
        {/* <Stack.Screen  options={{ title: 'Home Screen' }} /> */}
        <S.Text>chenzhen</S.Text>
      </S.Content>
    </ScreenLayout>
  )
}



const S = {
  Content: styled.View`
    padding: 40px 45px;
  `,
  ViewWrapper: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 21px;
    justify-content: space-between;
    
  `,
  Text: styled.Text`
    color: ${(p) => p.theme.white};
    padding: 6px 0;
    font-size: ${(p) => p.theme.size(16,'px')};
  `
}
