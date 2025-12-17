import { Button } from "@/components/ui/button";
import { Youtube, Instagram, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#160026] border-t border-[#351150] mt-20 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-bold mb-4 font-heading text-white">Follow Us</h3>
          <div className="flex gap-3 mb-6">
            <Button size="icon" variant="outline" className="rounded-xl border-[#F6CA56] text-[#F6CA56] hover:bg-[#F6CA56] hover:text-black transition-all h-12 w-12">
              <Youtube className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-xl border-[#F6CA56] text-[#F6CA56] hover:bg-[#F6CA56] hover:text-black transition-all h-12 w-12">
              <Instagram className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-xl border-[#F6CA56] text-[#F6CA56] hover:bg-[#F6CA56] hover:text-black transition-all h-12 w-12">
              <ExternalLink className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-sm text-gray-400 max-w-md">Join our community for the latest reviews and rankings. We break down games into data points so you can find your perfect match.</p>
        </div>

        <div className="flex flex-col gap-2 items-center md:items-end">
          <Button variant="link" className="text-gray-400 hover:text-[#F6CA56] font-normal text-sm p-0 h-auto">
            Get in touch
          </Button>
          <Button variant="link" className="text-gray-400 hover:text-[#F6CA56] font-normal text-sm p-0 h-auto">
            Privacy and Cookie Policy
          </Button>
          <Button variant="link" className="text-gray-400 hover:text-[#F6CA56] font-normal text-sm p-0 h-auto">
            Terms of Service
          </Button>
          <div className="text-xs text-gray-500 mt-4">
            © 2024 Metric Gamer. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
