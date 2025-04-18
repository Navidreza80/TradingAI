// Server actions
import { updateUserBanner } from "@/actions/user.action";
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
// UploadThing components to convert file to URL
import { UploadButton } from "@/utils/uploadthing";
// Icons
import { Edit } from "lucide-react";
// React hot toast for creating toasts
import toast from "react-hot-toast";



export default function EditBanner({ banner, setBanner, id }) {
  
  
  // Function to handle upload button logic => when user click it, it posts the file URL to the database
  const handleUpload = async () => {
    const request = await updateUserBanner(id, banner);
    if (request.success) {
      toast.success(request.message);
    } else {
      toast.error("Failed to change avatar.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="absolute right-2 top-2 z-10 hover:text-gray-400 cursor-pointer rounded-full dark:text-black text-white bg-black dark:bg-white p-2 w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-400 dark:text-white">
          Edit Banner
          </DialogTitle>
          <DialogDescription>
          Make changes to your profile banner here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              setBanner(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleUpload}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
