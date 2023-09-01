import Image from "next/image";

function Footer() {
  return (
    <div className="w-full h-20 bg-theme_blue-light text-gray-300 flex items-center justify-center gap-4">
      <Image
        src="/images/logo.png"
        className="w-24"
        width={24}
        height={24}
        alt="footer logo"
      />
      <p>All rights reserved</p>
    </div>
  );
}

export default Footer;
