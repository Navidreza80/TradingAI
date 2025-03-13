export default function ToggleSideBar({ toggleSidebar }) {
  return (
    <button
      onClick={toggleSidebar}
      className="w-8 h-8 dark:bg-sidebarDM bg-sidebarLM bg-cover max-[900px]:w-10 max-[900px]:h-10"
    ></button>
  );
}
