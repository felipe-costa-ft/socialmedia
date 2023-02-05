import SidePanel from "@/components/SidePanel";
import React, { useState, useEffect } from "react";

const User = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/${props.id}`
        );
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <SidePanel user={user} />
    </div>
  );
};

User.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  return { id };
};

export default User;
