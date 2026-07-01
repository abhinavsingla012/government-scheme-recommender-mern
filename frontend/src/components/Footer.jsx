/**
 * Footer Component - Simple, official government portal style
 */
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-10">
    {/* Blue main footer */}
    <div className="bg-[#0d3568] text-white">
      <div className="container-gov py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-heading text-lg text-white mb-3">About</h4>
            <p className="text-white/80 leading-relaxed">
              Yojana Sahayak helps every Indian citizen find government schemes
              they are eligible for — from farming subsidies to scholarships,
              health cover and pensions.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/85 hover:text-[#ff6b00] hover:underline">Home</Link></li>
              <li><Link to="/schemes" className="text-white/85 hover:text-[#ff6b00] hover:underline">All Schemes</Link></li>
              <li><Link to="/register" className="text-white/85 hover:text-[#ff6b00] hover:underline">Register</Link></li>
              <li><Link to="/login" className="text-white/85 hover:text-[#ff6b00] hover:underline">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-white mb-3">Popular Portals</h4>
            <ul className="space-y-2 text-white/85">
              <li>india.gov.in</li>
              <li>mygov.in</li>
              <li>pmindia.gov.in</li>
              <li>digitalindia.gov.in</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-white/85">
              <li><strong>Toll-Free:</strong> 1800-11-XXXX</li>
              <li><strong>Email:</strong> support@yojanasahayak.gov.in</li>
              <li><strong>Address:</strong> New Delhi, India</li>
              <li><strong>Hours:</strong> Mon-Sat, 9 AM - 6 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom copyright bar */}
    <div className="bg-[#08213f] text-white/70 text-xs">
      <div className="container-gov py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Yojana Sahayak. All Rights Reserved. | Educational project.</p>
        <p>Content sourced from official government portals for demonstration purposes.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
