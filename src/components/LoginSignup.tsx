import TextInputWrapper from 'src/components/TextInputWrapper'
import ButtonWrapper from 'src/components/ButtonWrapper'
import styled from 'styled-components/native'
import { PropsWithChildren, useState } from 'react'
import { useRouter } from 'expo-router'
import { loginApi } from 'src/api/login'
import {setItem} from '@/utils/storage'


interface Props extends PropsWithChildren {
   type?: 'login' | 'signup'
}

export default function LoginSignup(props: Props){
    const { children, type = 'login' } = props

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const router = useRouter();
    const ok = async()=>{
        if(type == 'login'){
            console.log('login',name,password);
            
            const {code,data} = await loginApi({username:name,password})
            console.log('loginApi',data);
            
            if(code === 0){
                setItem('token',data.token)
                router.navigate('/home')
            }
           
        }
    }

    return (
        <>
            <S.Title>
                { type == 'login' ? 'Login' : 'Sign up'}
            </S.Title>
            <TextInputWrapper placeholder='Email Address' inputMode='email' maxLength={30} defaultValue={name} onChangeText={name=>setName(name)}/>
            <TextInputWrapper placeholder='Password' textContentType="password" secureTextEntry={true} maxLength={40} defaultValue={password} onChangeText={password=>setPassword(password)}/>
            { children}
            <ButtonWrapper onPress={ok}  title= { type == 'login' ? 'Login' : 'Create Account'} />
        
        </>
    )
}


const S = {
    Title: styled.Text`
      color: ${(p) => p.theme.orange};
      font-family: helvetica;
      font-weight: 900;
      font-size: ${(p) => p.theme.size(36, 'px')};
      margin-bottom: ${(p) => p.theme.size(90, 'px')};
    `
  }
  