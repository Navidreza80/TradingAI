export default function UserName({ username }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900">
          {username}
        </h1>
      </div>
    </div>
  );
}
