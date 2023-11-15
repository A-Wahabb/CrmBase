import { useEffect, useState } from "react";
import { getLoggedinUser, getLoggedinUserToken } from "../../helpers/api_helper";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  const userTokenSession = getLoggedinUserToken();
  var token =
    userProfileSession &&
    userTokenSession;
  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    var token =
      userProfileSession &&
      userTokenSession;
    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(token ? false : true);
  }, []);


  return { userProfile, loading, token };
};

export { useProfile };