import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react";
import { Upload } from "./file-upload";
import React from "react";
import { useTranslation } from "react-i18next";

export default function EditBanner() {
  const {t} = useTranslation()
  const [uploadedFiles, setUploadedFiles] = React.useState([]);

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
    console.log("Uploaded Files:", files);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="absolute right-2 top-2 z-10 hover:text-gray-400 cursor-pointer rounded-full dark:text-black text-white bg-black dark:bg-white p-2 w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-400 dark:text-white">{t('dashboard.modals.banner')}</DialogTitle>
          <DialogDescription>
          {t('dashboard.modals.bannerDesc')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Upload onFilesUploaded={handleFilesUploaded} /> {/* Add the file upload component here */}
        </div>
        <DialogFooter>
          <Button type="submit">{t('dashboard.modals.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
