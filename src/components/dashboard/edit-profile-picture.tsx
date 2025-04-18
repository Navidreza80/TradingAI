// Sever actions
import { updateUserImage } from "@/actions/user.action";
// ShadCn components
import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
// UploadThing to convert file to URL
import { UploadButton } from "@/utils/uploadthing";
// Icons
import { Edit } from "lucide-react";
// React hot toast to create toasts
import toast from "react-hot-toast";



export default function EditProfilePicture({ setImage, id, image }) {
  
  
  // Function that edits user profile picture by passing the photo URL
  const handleUpload = async () => {
    const request = await updateUserImage(id, image);
    if (request.success) {
      toast.success(request.message);
    } else {
      toast.error("Failed to change avatar.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="absolute left-3 top-3 z-10 hover:text-gray-400 cursor-pointer rounded-full dark:text-black text-white bg-black dark:bg-white p-2 w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">
          Edit Avatar
          </DialogTitle>
          <DialogDescription>
          Make changes to your avatar here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setImage(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleUpload}>Save changes.</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
