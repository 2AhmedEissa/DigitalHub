export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DigitalHub Task. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
