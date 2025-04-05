interface MediaContent {
  id: number;
  title: string;
  type: "video" | "podcast";
  thumbnail: string;
  duration: string;
  author: string;
}

interface MediaCardProps {
  media: MediaContent;
}

export function MediaCard({ media }: MediaCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div className="h-40 relative bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400">Thumbnail Placeholder</span>
          {/* Uncomment when you have actual images */}
          {/* <Image 
            src={media.thumbnail} 
            alt={media.title} 
            fill 
            className="object-cover"
          /> */}
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {media.duration}
        </div>
        {media.type === "video" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 bg-opacity-80 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-purple-600 bg-opacity-80 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              media.type === "video"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            }`}
          >
            {media.type === "video" ? "Video" : "Podcast"}
          </span>
        </div>
        <h3 className="font-bold text-base mb-1 text-black dark:text-white">
          {media.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          By {media.author}
        </p>
      </div>
    </div>
  );
}