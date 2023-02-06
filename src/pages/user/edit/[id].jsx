import EditUserForm from "@/components/EditUserForm";
import { useEffect, useState } from "react";
const EditUser = ({ id }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/user/${id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, []);

  return <>{user && <EditUserForm user={user} />}</>;
};

EditUser.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  return { id };
};

export default EditUser;
