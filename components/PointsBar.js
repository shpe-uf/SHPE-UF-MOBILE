import React from 'react';
import { Text } from 'react-native';

const PointsBar = ({ user }) => {
  return (
    <Text>
      Fall Points: {user ? user.fallPoints : "0"}
    </Text>
  );
}
export default PointsBar;
