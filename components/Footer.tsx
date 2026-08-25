export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ravikant Singh. All rights reserved.
      </div>
    </footer>
  );
}