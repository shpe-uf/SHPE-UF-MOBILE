import * as React from 'react';
import { View, Text } from 'react-native';

import PointsBar from "../components/PointsBar";

function Points() {

  // const [activeItem, setActiveItem] = useState("Your Points");
  //
  // const handleItemClick = (e, { name }) => {
  //   setActiveItem(name);
  // };
  // const [errors, setErrors] = useState({});
  var {
    user: { id, username }
  } = useContext(AuthContext);
  //
  var {data, refetch} = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id
    }
  });

  if(data){
    var user = data.getUser;
  }
  // const [redeemPointsModal, setRedeemPointsModal] = useState(false);

    return (
        <View
            style={{
                flex: 1,
                alignItems:'center',
                justifyContent:'center'
            }}
        >
        // <PointsBar user={user} />

        </View>
    )
}
