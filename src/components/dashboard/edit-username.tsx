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
// Icons
import { Edit } from "lucide-react";


// React built in hooks
import { useState } from "react";
// Server actions
import { updateUsername } from "@/actions/user.action";
// React hot toast fot creating toasts
import toast from "react-hot-toast";

export default function EditUserName({id, username, setUsername}) {
  
  
  // State to save the value of users username
  const [value, setValue] = useState(username)
  // Function that edit and updates users username by passing the username string value
  const updateUserName = async () => {
    const data = await updateUsername(id, value)
    if(data.success){
      toast.success(data.message)
      setUsername(value)
    }
    else{
      toast.error('Failed to change username.')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="hover:text-gray-400 cursor-pointer rounded-full dark:text-black text-white bg-black dark:bg-white p-2 w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">Edit Username</DialogTitle>
          <DialogDescription>
          Make changes to your profile username here. Click save when you aredone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right dark:text-white text-gray-400">
            Username
            </Label>
            <Input id="username" defaultValue={username} onChange={(e) => setValue(e.currentTarget.value)} className="col-span-3" />
          </div>
        </div>
        <div className="py-4"></div>
        <DialogFooter>
          <Button onClick={updateUserName}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
