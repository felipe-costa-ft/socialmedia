import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePicture = ({ user, size }) => {
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    if (user?.foto_perfil) {
      const buffer = Buffer.from(user?.foto_perfil?.data);
      const base64Image = buffer.toString("base64");
      setProfilePicture(base64Image);
    }
  }, [user]);

  return (
    <>
      {profilePicture && (
        <Image
          src={`data:image/jpeg;base64,${profilePicture}`}
          alt="Foto de Perfil"
          width={size}
          height={size}
        />
      )}
    </>
  );
};

export default ProfilePicture;
