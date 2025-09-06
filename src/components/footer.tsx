import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  AlertTriangle,
  Clock
} from "lucide-react"

export function Footer() {
  const emergencyContacts = [
    { label: "Emergency Ambulance", number: "108", available: "24/7" },
    { label: "Senior Helpline", number: "1800-180-1253", available: "24/7" },
    { label: "Medical Emergency", number: "102", available: "24/7" },
    { label: "Police Emergency", number: "100", available: "24/7" }
  ]

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Download App", href: "#download" },
      { label: "Pricing", href: "#pricing" },
      { label: "Support", href: "#support" }
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press Kit", href: "#press" },
      { label: "Contact", href: "#contact" }
    ],
    resources: [
      { label: "Help Center", href: "#help" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Senior Care Tips", href: "#tips" }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ]

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Emergency Contacts Bar */}
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive mr-2" />
            <span className="text-destructive font-semibold">Emergency Helpline Numbers</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="bg-destructive/5 border-destructive/20 hover-glow transition-smooth">
                <CardContent className="p-3 text-center">
                  <div className="text-destructive font-bold text-lg">{contact.number}</div>
                  <div className="text-xs text-muted-foreground">{contact.label}</div>
                  <div className="flex items-center justify-center mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">{contact.available}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold gradient-text">ElderCare+</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering senior citizens with comprehensive healthcare management, 
              emergency support, and AI-powered assistance for a safer, healthier life.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">8763082186</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">subhasourabha143@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">vssut burla,sambalpur 768018</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm focus-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm focus-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm focus-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-8 glass-effect rounded-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated with Elder Care Tips
            </h3>
            <p className="text-muted-foreground mb-6">
              Get weekly health tips, medicine reminders, and wellness advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 font-semibold hover-glow focus-ring">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 ElderCare+. All rights reserved. | Designed with ❤️ by THE ACERS.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth hover-glow focus-ring"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}