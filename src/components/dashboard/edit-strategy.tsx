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
import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";

export default function EditStrategy() {
  const {t} = useTranslation()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="hover:text-gray-400 cursor-pointer rounded-full dark:text-black text-white bg-black dark:bg-white p-2 w-8 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dark:text-white text-gray-400">{t('dashboard.modals.style')}</DialogTitle>
          <DialogDescription>
          {t('dashboard.modals.styleDesc')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tradingStrategy" className="text-left dark:text-white text-gray-400 whitespace-nowrap">
            {t('dashboard.modals.styleInput')}
            </Label>
            <Input id="tradingStrategy" defaultValue="Swing Trader" className="col-span-3" />
          </div>
        </div>{" "}
        <div className="py-4"></div>
        <DialogFooter>
          <Button type="submit">{t('dashboard.modals.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
