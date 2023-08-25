import { useEffect, useState } from "react";
import axios from "axios";
import UserData from "./UserData.jsx";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [path, setPath] = useState();
  // const [loggedIn, setLoggedIn] = useState(false); // Add loggedIn state

  const apiToken = async () => {
    try {
      let data = JSON.stringify({
        username: import.meta.env.VITE_REACT_APP_USERNAME,
        password: import.meta.env.VITE_REACT_APP_PASSWORD,
        systemId: import.meta.env.VITE_REACT_APP_SYSTEM_ID,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          authority: "adminapi.bestlive.io",
          accept: "application/json, text/plain, */*",
          "accept-language": "en-IN,en;q=0.9,mr;q=0.8,lb;q=0.7",
          "cache-control": "no-cache, no-store",
          "content-type": "application/json",
          encryption: "false",
        },
        data: data,
      };
      const response = await axios.post(
        "https://adminapi.bestlive.io/api/login",
        data,
        config
      );
      if (response.status !== 200) {
        response_value = {
          success: false,
          message: response.status,
        };
      } else {
        // console.log(response.data);

        const newToken = response.data.data.token;
        // setToken(newToken);
        sessionStorage.setItem("token", newToken);

        return newToken;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsers = async (token) => {
    try {
      // console.log(token);
      let data = JSON.stringify({
        type: "",
        nType: "deposit",
        start_date: "",
        end_date: "",
        isFirst: 1,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          authority: "adminapi.bestlive.io",
          accept: "application/json, text/plain, */*",
          "accept-language": "en-IN,en;q=0.9,mr;q=0.8,lb;q=0.7",
          authorization: `Bearer ${token}`,
          "cache-control": "no-cache, no-store",
          "content-type": "application/json",
          encryption: "false",
        },
        data: data,
      };
      const response = await axios.post(
        "https://adminapi.bestlive.io/api/bank-account/request",
        data,
        config
      );
      setUsers(response.data.data);
      setPath(response.data.path);
      // console.log(response.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  // const handleLogin = async () => {
  //   const newToken = await apiToken();
  //   if (newToken) {
  //     setToken(newToken);
  //     await fetchUsers(newToken);
  //     setLoggedIn(true);
  //   }
  // };

  // const fetchData = async () => {
  //   let tokenFromStorage = sessionStorage.getItem("token");
  //   if (tokenFromStorage) {
  //     setToken(tokenFromStorage);
  //     await fetchUsers(tokenFromStorage);
  //     setLoggedIn(true);
  //   }
  // };

  // fetchData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tokenFromStorage = sessionStorage.getItem("token");
        if (!tokenFromStorage) {
          const newToken = await apiToken();
          if (newToken) {
            console.log(`this is newToken ${newToken}`);
            setToken(newToken); // Set the token state here as well
            await fetchUsers(newToken);
          }
        } else {
          setToken(tokenFromStorage); // Set the token state if already present
          await fetchUsers(tokenFromStorage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If not logged in, show the Login component
  // if (!loggedIn) {
  //   return <Login onLogin={handleLogin} />;
  // }

  return (
    <>
      <div>
        <button
          className="action-button"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Account No.</th>
              <th>IFSC Code</th>
              <th>UTR No.</th>
              <th>Screenshot</th>
              <th>Amount</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <UserData users={users} token={token} path={path} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
