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
// Icons
import { Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// i18n for translation
import { useTranslation } from "react-i18next";
// React built in hooks
import { useState } from "react";
// Server actions
import { editComment } from "@/actions/comment.action";
// React hot toast fot creating toasts
import toast from "react-hot-toast";

export default function EditComment({commentId, content}) {
  // i18n hooks for translation
  const { t } = useTranslation();
  // State to save the value of users username
  const [value, setValue] = useState(content)
  // Function that edit and updates users username by passing the username string value
  const updateComment = async () => {
    const data = await editComment(commentId, value)
    if(data.success){
      toast.success('Comment updated successfully!!')
    }
    else{
      toast.error('Failed to update comment.')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="hover:text-gray-400 cursor-pointer rounded-full dark:text-black text-white bg-black dark:bg-white p-2 w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">{t('dashboard.commentsPage.edit.title')}</DialogTitle>
          <DialogDescription>
          {t("dashboard.commentsPage.edit.desc")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right dark:text-white text-gray-400">
            {t('dashboard.commentsPage.edit.content')}
            </Label>
            <Input id="username" defaultValue={content} onChange={(e) => setValue(e.currentTarget.value)} className="col-span-3" />
          </div>
        </div>
        <div className="py-4"></div>
        <DialogFooter>
          <Button onClick={updateComment}>{t('dashboard.modals.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
