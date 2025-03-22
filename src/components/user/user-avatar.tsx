// Next built in components
import Image from "next/image";

export default function UserAvatar({image, name}){
    return (
        <div className="flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={160}
          height={160}
          className="rounded-2xl border-4 border-white dark:border-gray-800"
        />
      </div>
    )
}