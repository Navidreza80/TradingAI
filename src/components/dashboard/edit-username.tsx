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
import { useState } from "react";
import { updateUsername } from "@/actions/user.action";
import toast from "react-hot-toast";

export default function EditUserName({id, username, setUsername}) {
  const { t } = useTranslation();
  const [value, setValue] = useState(username)
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
          <DialogTitle className="dark:text-white text-gray-400">{t('dashboard.modals.username')}</DialogTitle>
          <DialogDescription>
          {t('dashboard.modals.usernameDesc')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right dark:text-white text-gray-400">
            {t('dashboard.modals.usernameInput')}
            </Label>
            <Input id="username" defaultValue={username} onChange={(e) => setValue(e.currentTarget.value)} className="col-span-3" />
          </div>
        </div>{" "}
        <div className="py-4"></div>
        <DialogFooter>
          <Button onClick={updateUserName}>{t('dashboard.modals.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
