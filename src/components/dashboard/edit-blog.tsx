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
import { Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";
import { Upload } from "./file-upload";
import React from "react";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";

export default function EditBlog() {
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const { t } = useTranslation();

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
    console.log("Uploaded Files:", files);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute z-10 top-2 right-2">
          <Edit /> Edit Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">
            Edit Blog
          </DialogTitle>
          <DialogDescription>
            Make changes to your blog, click save changes to apply.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row flex-wrap justify-center py-4">
          <div className="flex flex-row gap-5 w-full justify-center">
            <Label
              htmlFor="Title"
              className="text-left text-lg dark:text-white text-gray-400 w-1/3"
            >
              Title
            </Label>
            <Input
              id="Title"
              defaultValue="Understanding Bitcoin"
              className="col-span-3 w-2/3"
            />
          </div>
          <div className="flex flex-row gap-5 w-full justify-center mt-2">
            <Label
              htmlFor="Desc"
              className="text-left text-lg dark:text-white text-gray-400 w-1/3"
            >
              Description
            </Label>
            <TextArea className="col-span-3 w-2/3" />
          </div>
          <div className="flex flex-row gap-5 w-full justify-center mt-2 flex-wrap">
            <h2 className="text-left text-lg dark:text-white text-gray-400 w-full">
              Thumbnail
            </h2>
            <Upload onFilesUploaded={handleFilesUploaded} />
            <div className="flex flex-row justify-between items-center w-full">
              <h2 className="dark:text-white text-gray-400">Current Banner:</h2>
              <Image
                src={"/image/trade.png"}
                width={80}
                height={80}
                alt="banner"
              />
            </div>
          </div>
        </div>{" "}
        <div></div>
        <DialogFooter>
          <Button type="submit">{t("dashboard.modals.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
