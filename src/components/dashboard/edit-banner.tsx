// Server actions
import { updateUserBanner } from "@/actions/user.action";
// ShadCn components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// UploadThing components to convert file to URL
import { UploadButton } from "@/utils/uploadthing";
// Icons
import { Edit } from "lucide-react";
// React hot toast for creating toasts
import toast from "react-hot-toast";
// i18n for translation
import { useTranslation } from "react-i18next";

export default function EditBanner({ banner, setBanner, id }) {
  // i18n hook for translation
  const { t } = useTranslation();
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
            {t("dashboard.modals.banner")}
          </DialogTitle>
          <DialogDescription>
            {t("dashboard.modals.bannerDesc")}
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
          <Button onClick={handleUpload}>{t("dashboard.modals.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
