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

export default function EditBlog({blog}) {
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
              {blog.title}
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
              Content
            </Label>
            <TextArea className="col-span-3 w-2/3" defaultValue={blog.content} />
          </div>
          <div className="flex flex-row gap-5 w-full justify-center mt-2 flex-wrap">
            <h2 className="text-left text-lg dark:text-white text-gray-400 w-full">
              Thumbnail
            </h2>
            <Upload onFilesUploaded={handleFilesUploaded} />
            <div className="flex flex-row justify-between items-center w-full">
              <h2 className="dark:text-white text-gray-400">Current Banner:</h2>
              <Image
                src={blog.blogThumbnail ? blog.blogThumbnail : 'data:image/png;base64,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'}
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
