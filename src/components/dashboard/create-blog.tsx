// UploadThing component to convert file to URL
import { UploadButton } from "@/utils/uploadthing";
// Shadcn components
import { Button } from "../UI/Button";
import { Input } from "../UI/input";


// Server actions
import { createBlog } from "@/actions/blog.action";
// React hot toast for creating toasts
import toast from "react-hot-toast";

export default function CreateNewBlog({
  title,
  setTitle,
  shortDescription,
  setShortDescription,
  content,
  setContent,
  setImage,
  image,
}) {
  // Function to handle submit of blog creation
  const handleSubmit = async () => {
    const newBlog = await createBlog({
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogThumbnail: image,
    });
    if(newBlog == "User not authenticated")toast.error("User not authenticated");
    else if (newBlog.success == true) toast.success("Blog Created Successfully!!");
  };
  return (
    <div className="flex flex-col flex-wrap lg:w-1/2 md:w-full sm:w-full xs:w-full lg:h-full md:h-1/2 sm:h-1/2 xs:h-1/2 p-5 border rounded-2xl items-start dark:border-gray-400 dark:bg-[#4b4b4b5b] bg-white border-[#4b4b4b61]">
      <div className="flex flex-col h-1/6 w-full mt-4">
        <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
          Title
        </h2>
        {/* Title Of The Blog */}
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#89898961] border-none"
        />
      </div>
      <div className="flex flex-col h-1/6 w-full mt-4">
        <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
          Short Description
        </h2>
        {/* Short Description Of The Blog */}
        <Input
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="bg-[#89898961] border-none"
        />
      </div>
      <div className="flex flex-col h-1/6 w-full mt-4">
        <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
          Content
        </h2>
        {/* Content Of The Blog */}
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-[#89898961] border-none h-20"
        />
      </div>
      <div className="flex flex-col h-1/6 w-full my-4">
        <h2 className="w-full text-left text-md dark:text-gray-300 text-black">
          Thumbnail
        </h2>
        {/* Upload Thing Component To Convert File To URL */}
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
      <Button onClick={handleSubmit}> Create Blog</Button>
    </div>
  );
}
