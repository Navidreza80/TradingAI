// Server action
import { updateBlog } from "@/actions/blog.action";
import { getDbUserId } from "@/actions/user.action";
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
import { Input } from "../UI/input";
import { Label } from "../UI/label";
// UploadThing components for converting file to URL
import { UploadButton } from "@/utils/uploadthing";
// Icons
import { Edit } from "lucide-react";
// React built in hooks
import { useState } from "react";
// React hot toast for creating toasts
import toast from "react-hot-toast";



export default function EditBlog({
  id,
  blog,
  setTitle,
  setShortDescription,
  setBlogThumbnail,
}) {
  
  
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
          <Edit /> Edit blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">
          Edit Blog
          </DialogTitle>
          <DialogDescription>Make changes to your blog, click save changes to apply.</DialogDescription>
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
              Content
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
              Short Description
            </Label>
            <Input
              className="col-span-3 w-2/3"
              defaultValue={blog.shortDescription}
              onChange={(e) => setShortDescriptionValue(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-row gap-5 w-full justify-center mt-2 flex-wrap">
            <h2 className="text-left text-lg dark:text-white text-gray-400 w-full">
            Thumbnail
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
