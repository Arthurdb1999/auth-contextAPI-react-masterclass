import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../contexts/auth'

const SignIn: React.FC = () => {

    const { signed, signIn, user } = useAuth()

    console.log(signed, user)

    function handleSignIn() {
        signIn()
    }

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
                title="Sign in"
                onPress={handleSignIn}
            ></Button>
        </View>
    )
}

export default SignIn;