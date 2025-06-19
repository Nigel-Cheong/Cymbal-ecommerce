export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-12 rounded-t-lg">
      <div className="container mx-auto text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Cymbal Boutique Clone. All rights reserved.</p>
        <p className="mt-2">Designed for demonstration purposes.</p>
      </div>
    </footer>
  );
};