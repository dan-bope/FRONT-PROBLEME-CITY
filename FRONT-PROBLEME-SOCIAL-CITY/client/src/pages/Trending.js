import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import { isEmpty } from "../components/Utils";
import Card from "../components/Post/Card";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Trending = () => {
    const usersData = useSelector(state => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  return (
    <div className="trending-page">
        <div>
            <table className="table-admin">
                <tr>
                    <th>
                    </th>
                    <th>image
                    </th>
                    <th>pseudo
                    </th>
                    <th>email
                    </th>
                    <th>description
                    </th>
                </tr>
                {

                    !isEmpty(usersData[0]) && usersData.map((user) => (

                            <tr>
                                <td>{user.id}
                                </td>
                                <td>
                                    <img src={user.picture
                                    } alt="poster-pic" width={50}
                                    />
                                </td>
                                <td>
                                    {user.pseudo}
                                </td>
                                <td>{user.email}
                                </td>
                                <td>{user.bio}
                                </td>
                            </tr>

                        )
                    )


                }
            </table>
        </div>

      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />

        </div>
      </div>
    </div>
  );
};

export default Trending;
