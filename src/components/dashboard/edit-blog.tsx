// Server action
import { updateBlog } from "@/actions/blog.action";
import { getDbUserId } from "@/actions/user.action";
// Shadcn components
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// UploadThing components for converting file to URL
import { UploadButton } from "@/utils/uploadthing";
// Icons
import { Edit } from "lucide-react";
// React built in hooks
import { useState } from "react";
// React hot toast for creating toasts
import toast from "react-hot-toast";
// i18n for translation
import { useTranslation } from "react-i18next";

export default function EditBlog({
  id,
  blog,
  setTitle,
  setShortDescription,
  setBlogThumbnail,
}) {
  // i18n hook for translation
  const { t } = useTranslation();
  // State to save the value of blogs title
  const [titleValue, setTitleValue] = useState("");
  // State to save the value of blogs short Description
  const [shortDescriptionValue, setShortDescriptionValue] = useState("");
  // State to save the value of blogs thumbnail
  const [blogThumbnailValue, setBlogThumbnailValue] = useState("");
  // State to save the value of blogs content
  const [content, setContent] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute z-10 top-2 right-2">
          {/* Icon */}
          <Edit /> {t("dashboard.blogs.edit.edit")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">
            {t("dashboard.blogs.edit.edit")}
          </DialogTitle>
          <DialogDescription>{t("dashboard.blogs.edit.change")}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row flex-wrap justify-center py-4">
          <div className="flex flex-row gap-5 w-full justify-center">
            <Label
              htmlFor="Title"
              className="text-left text-lg dark:text-white text-gray-400 w-1/3"
            >
              {t("dashboard.blogs.edit.title")}
            </Label>
            <Input
              id="Title"
              defaultValue={blog.title}
              className="col-span-3 w-2/3"
              onChange={(e) => setTitleValue(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-row gap-5 w-full justify-center mt-2">
            <Label
              htmlFor="Desc"
              className="text-left text-lg dark:text-white text-gray-400 w-1/3"
            >
              {t("dashboard.blogs.edit.content")}
            </Label>
            <Input
              className="col-span-3 w-2/3"
              defaultValue={blog.content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-row gap-5 w-full justify-center mt-2">
            <Label
              htmlFor="Desc"
              className="text-left text-lg dark:text-white text-gray-400 w-1/3"
            >
              {t("dashboard.blogs.edit.short")}
            </Label>
            <Input
              className="col-span-3 w-2/3"
              defaultValue={blog.shortDescription}
              onChange={(e) => setShortDescriptionValue(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-row gap-5 w-full justify-center mt-2 flex-wrap">
            <h2 className="text-left text-lg dark:text-white text-gray-400 w-full">
              {t("dashboard.blogs.edit.thumb")}
            </h2>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                setBlogThumbnailValue(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </div>
        <div></div>
        <DialogFooter>
          <Button
            onClick={async () => {
              const userId = await getDbUserId();
              if (userId) {
                const request = await updateBlog(userId, id, {
                  title: titleValue,
                  shortDescription: shortDescriptionValue,
                  blogThumbnail: blogThumbnailValue,
                  content: content,
                });
                if (request.success) {
                  toast.success(request.message);
                  setTitle(titleValue);
                  setShortDescription(shortDescriptionValue);
                  setBlogThumbnail(blogThumbnailValue);
                }
              }
            }}
          >
            {t("dashboard.modals.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
