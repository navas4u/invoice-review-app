function Loader({ message = "Loading data..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-600">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default Loader;
