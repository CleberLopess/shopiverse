import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="text-xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Shopiverse
                </span>
              </Link>
              <p className="mt-4 text-muted-foreground text-sm max-w-xs">
                Descubra as últimas tendências com nossa coleção selecionada de
                produtos premium.
              </p>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-6">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  <span>Loja</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-6">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Rua Figueiredo Pimentel, Rio de Janeiro
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary" />
                <span className="text-muted-foreground">(21) 99105-2878</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary" />
                <span className="text-muted-foreground">
                  cleberlopes777@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shopiverse. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
