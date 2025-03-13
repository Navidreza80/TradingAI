// Sever actions
import { updateUserImage } from "@/actions/user.action";
// Shadcn components
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
// i18n for translation
import { useTranslation } from "react-i18next";

export default function EditProfilePicture({ setImage, id, image }) {
  // i18n hooks for translation
  const { t } = useTranslation();
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
            {t("dashboard.modals.avatar")}
          </DialogTitle>
          <DialogDescription>
            {t("dashboard.modals.avatarDesc")}
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
          <Button onClick={handleUpload}> {t("dashboard.modals.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
