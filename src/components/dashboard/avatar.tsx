// NExt built in components
import Image from "next/image";
// Third party components
import EditProfilePicture from "./edit-profile-picture";

export default function Avatar({setImage, user, image, username}) {
  return (
    <div className="flex-shrink-0 relative">
      {/* Edit Users Profile Picture Modal */}
      <EditProfilePicture id={user.id} setImage={setImage} image={image} />
      <Image
        src={image !== "" ? image : user.image}
        alt={username !== "" ? username : user.username}
        width={160}
        height={160}
        className="rounded-2xl w-40 h-40 border-4 border-white dark:border-gray-800"
      />
    </div>
  );
}
