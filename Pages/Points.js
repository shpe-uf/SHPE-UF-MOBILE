import React, { useContext, useState } from "react";
import { Text } from 'react-native';

const Points = ( {user} ) => {
  return (
    <Text>
      Fall Points: {user ? user.fallPoints : "0"}
      {user ? user.fallPercentile : "0"} percentile
      Spring Points: {user ? user.springPoints : "0"}
      {user ? user.springPercentile : "0"} percentile
      Summer Points: {user ? user.summerPoints : "0"}
      {user ? user.summerPercentile : "0"} percentile
    </Text>
  );
}

export default Points;
