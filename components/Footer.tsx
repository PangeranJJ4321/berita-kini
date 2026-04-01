import Link from "next/link";
import { FiYoutube, FiInstagram, FiFacebook, FiSend } from "react-icons/fi";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2C3C4D] py-16 text-white mt-20">
      <div className="mx-auto max-w-[1296px] px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">

          {/* Column 1: Logo, Copyright & Socials */}
          <div className="flex flex-col gap-6 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/Logo.svg"
                alt="Berita Kini Logo"
                width={159}
                height={44}
                className="brightness-0 invert"
              />
            </div>

            {/* Copyright */}
            <p className="text-sm leading-relaxed text-gray-300">
              © 2023 Berita Kini. All Rights Reserved.
            </p>

            {/* Socials */}
            <div className="flex flex-col gap-3 pt-2">
              <p className="font-semibold">Ikuti Kami</p>
              <div className="flex gap-4">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded bg-white text-[#37485B] hover:bg-gray-200 transition-colors">
                  <FiYoutube className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded bg-white text-[#37485B] hover:bg-gray-200 transition-colors">
                  <FiInstagram className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded bg-white text-[#37485B] hover:bg-gray-200 transition-colors">
                  <FiFacebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Telusuri */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Telusuri</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/kesehatan" className="hover:text-white transition-colors">Kesehatan</Link></li>
              <li><Link href="/otomotif" className="hover:text-white transition-colors">Otomotif</Link></li>
              <li><Link href="/politik" className="hover:text-white transition-colors">Politik</Link></li>
              <li><Link href="/olahraga" className="hover:text-white transition-colors">Olahraga</Link></li>
              <li><Link href="/nasional" className="hover:text-white transition-colors">Nasional</Link></li>
              <li><Link href="/internasional" className="hover:text-white transition-colors">Internasional</Link></li>
            </ul>
          </div>

          {/* Column 3: Bantuan */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Bantuan</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Kontak Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Laporan Pembajakan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan</a></li>
            </ul>
          </div>

          {/* Column 4: Berlangganan */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Berlangganan Berita Terbaru</h3>
            <form className="relative flex w-full max-w-sm rounded bg-white p-1" action="#">
              <input
                type="email"
                placeholder="Masukan email"
                className="w-full flex-1 rounded-l px-3 py-2 text-sm text-black outline-none"
                required
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded bg-[var(--color-primary-500)] text-white transition-colors hover:bg-[var(--color-primary-600)]"
              >
                {/* Menggunakan Send dari lucide-react untuk pesawat kertas */}
                <FiSend className="h-5 w-5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
}