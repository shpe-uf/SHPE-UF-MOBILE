import React from 'react';
import { Text } from 'react-native';

const Points = ({ user }) => {
  /*  var {
      user: { id, username }
    } = useContext(AuthContext);
    */
  /*  var id = "5f90e4d4920bab09f6df0106"; */

    var {data, refetch} = useQuery(FETCH_USER_QUERY, {
      variables: {
        userId: "5f90e4d4920bab09f6df0106"
      }
    });

    if(data){
      var user = data.getUser;
    }
  return (
    <Text>
      Fall Points: {user ? user.fallPoints : "0"}
    </Text>
  );
}

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      points
      fallPoints
      springPoints
      summerPoints
      fallPercentile
      springPercentile
      summerPercentile
      events {
        name
        category
        createdAt
        points
      }
      tasks {
        name
        points
        startDate
      }
      bookmarkedTasks
    }
  }
`;

export default Points;
