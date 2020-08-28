import React from 'react';
import { View, Button, Text } from 'react-native';

import { useAuth } from '../../contexts/auth'

const Dashboard: React.FC = () => {

    const { user, signOut } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{user?.email}</Text>
            <Button
                title="Sign out"
                onPress={handleSignOut}
            ></Button>
        </View>
    )
}

export default Dashboard;