// Third party components
import EditUserName from "./edit-username";

export default function Username({ username, user, setUsername }) {
  return (
    <div className="flex items-start justify-between flex-wrap">
      <div>
        <h1
          className={`lg:text-3xl md:text-2xl font-bold dark:text-white text-gray-900 flex flex-row gap-2 items-center text-ellipsis overflow-hidden whitespace-nowrap sm:text-xl xs:text-sm`}
        >
          {username !== "" ? username : user.username}
          {/* Modal to edit users username */}
          <EditUserName
            id={user.id}
            username={username}
            setUsername={setUsername}
          />
        </h1>
      </div>
    </div>
  );
}
