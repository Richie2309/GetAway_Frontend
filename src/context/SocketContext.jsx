import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
import { getToken } from "../api/user";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const authUser = useSelector((state) => state.userAuth.isAuthenticated)

  useEffect(() => {
    const fetchTokenAndConnect = async () => {

      if (!authUser) {
        if (socket) {
          socket.close();
          setSocket(null);
        }
        return;
      }

      try {
        const response = await getToken();
        const token = response.data;

        const socketInstance = io("http://localhost:3000", {
          auth: {
            token: token
          }
        });

        socketInstance.on("connect", () => {
          console.log("Socket connected:", socketInstance.id);
        });

        setSocket(socketInstance);

        return () => {
          socketInstance.close();
        };
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchTokenAndConnect();
  }, [authUser]);

  return <SocketContext.Provider value={{ socket }}>
    {children}
  </SocketContext.Provider>
}