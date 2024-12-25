import { StyleSheet, Text, View,Appearance,useColorScheme } from 'react-native'
import React, { useCallback } from 'react'
import StackScreenHeader from 'src/components/StackScreenHeader'
import {Button, Text as UiText} from '@/ui'
// import { useColorScheme } from 'nativewind';
import {  useSelectedLanguage } from '@/i18n/utils';

export default function i18Screen() {
  const colorScheme = useColorScheme();

  const {language,setLanguage} = useSelectedLanguage()
  const setTheme = ()=>{
    if(colorScheme === 'dark'){
      Appearance.setColorScheme('light')
    }else{
      Appearance.setColorScheme('dark')
    }
    
  }

  const getColor = useCallback(()=>{
   if(colorScheme === 'dark'){
    return styles.colorDark
   }else{
    return styles.colorLight
   }
  },[colorScheme])

  return (
    <View>
        <StackScreenHeader  options={{headerTitle: 'i18Screen'}} />
      <Text style={getColor()}>i18Screen</Text>
      <UiText style={getColor()}  tx={'settings.privacy'}></UiText>
      <Button onPress={setTheme} >
        <Text style={getColor()}>set theme</Text>
      </Button>

      <Button onPress={()=>{setLanguage('zh')}} >
        <Text style={getColor()}>{'setLanguage:' + language}</Text>
      </Button>
    </View>
  )
}



const styles = StyleSheet.create({
    colorLight:{
        color:'#000'
    },
    colorDark:{
      color:'#fff'
    }
})