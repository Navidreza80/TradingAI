'use client'
// i18n imports for translation
import { useTranslation } from 'react-i18next';
// Next imports
import Link from 'next/link';
import Image from 'next/image';
// Icons imports
import { 
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  // i18n hooks for translation
  const { t, i18n } = useTranslation();

  // Footer section items to map over them
  const footerSections = [
    {
      title: t('footer.product.title'),
      links: [
        { name: t('footer.product.features'), href: '/features' },
        { name: t('footer.product.pricing'), href: '/pricing' },
        { name: t('footer.product.security'), href: '/security' },
        { name: t('footer.product.enterprise'), href: '/enterprise' }
      ]
    },
    {
      title: t('footer.company.title'),
      links: [
        { name: t('footer.company.about'), href: '/about' },
        { name: t('footer.company.careers'), href: '/careers' },
        { name: t('footer.company.blog'), href: '/blog' },
        { name: t('footer.company.press'), href: '/press' }
      ]
    },
    {
      title: t('footer.resources.title'),
      links: [
        { name: t('footer.resources.documentation'), href: '/docs' },
        { name: t('footer.resources.help'), href: '/help' },
        { name: t('footer.resources.api'), href: '/api' },
        { name: t('footer.resources.status'), href: '/status' }
      ]
    },
    {
      title: t('footer.legal.title'),
      links: [
        { name: t('footer.legal.privacy'), href: '/privacy' },
        { name: t('footer.legal.terms'), href: '/terms' },
        { name: t('footer.legal.cookies'), href: '/cookies' },
        { name: t('footer.legal.licenses'), href: '/licenses' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/tradingai' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/tradingai' },
    { name: 'GitHub', href: 'https://github.com/tradingai' },
    { name: 'YouTube', href: 'https://youtube.com/tradingai' }
  ];

  return (
    <footer className="relative bg-background-light dark:bg-background-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.1)_1px,transparent_1px)] 
        bg-[length:20px_20px] opacity-50 dark:opacity-50" />

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="py-12 sm:py-16 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
          gap-8 xs:gap-6 md:gap-8 lg:gap-12">
          {/* Brand Column - Full width on mobile */}
          <div className="xs:col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/image/Logo.svg"
                alt="TradingAI Logo"
                width={40}
                height={40}
                className="dark:brightness-0 dark:invert w-8 h-8 xs:w-10 xs:h-10"
              />
              <span className={`ml-2 text-lg xs:text-xl font-bold bg-gradient-to-r 
                dark:from-white dark:to-gray-400 from-gray-900 to-gray-600
                bg-clip-text text-transparent
                 
                `}>
                TradingAI
              </span>
            </Link>
            <p className={`mt-4 text-sm dark:text-gray-400 text-gray-600 max-w-sm
               
              `}>
              {t('footer.description')}
            </p>
          </div>

          {/* Footer Sections - Responsive grid */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className={`text-sm font-semibold dark:text-white text-gray-900 mb-4
                 
                `}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm dark:text-gray-400 text-gray-600 
                        hover:text-[#1890ff] transition-colors duration-200 block
                         
                        `}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact & Social - Responsive grid */}
        <div className="py-8 border-t dark:border-white/10 border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <GlobeAltIcon className="w-5 h-5 dark:text-gray-400 text-gray-600 flex-shrink-0" />
                <span className={`ml-2 text-sm dark:text-gray-400 text-gray-600
                   
                  `}>
                  {t('footer.contact.address')}
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 dark:text-gray-400 text-gray-600 flex-shrink-0" />
                <span className={`ml-2 text-sm dark:text-gray-400 text-gray-600
                   
                  `}>
                  {t('footer.contact.phone')}
                </span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="w-5 h-5 dark:text-gray-400 text-gray-600 flex-shrink-0" />
                <span className={`ml-2 text-sm dark:text-gray-400 text-gray-600
                   
                  `}>
                  {t('footer.contact.email')}
                </span>
              </div>
            </div>

            {/* Social Links - Centered on mobile */}
            <div className="text-center sm:text-start">
              <h3 className={`text-sm font-semibold dark:text-white text-gray-900 mb-4
                 
                `}>
                {t('footer.social.title')}
              </h3>
              <div className={`flex justify-start rtl:justify-end sm:justify-start gap-4
                ${i18n.language === 'fa' || i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#1890ff] transition-colors duration-200"
                  >
                    <span className="sr-only">{link.name}</span>
                    <Image
                      src={`/image/social/${link.name.toLowerCase()}.svg`}
                      alt={link.name}
                      width={24}
                      height={24}
                      className="dark:brightness-0 dark:invert w-6 h-6"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter - Full width on mobile */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className={`text-sm font-semibold dark:text-white text-gray-900 mb-4
                 
                `}>
                {t('footer.newsletter.title')}
              </h3>
              <form className="flex flex-col xs:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className={`flex-1 px-4 py-2 rounded-lg xs:rounded-l-lg xs:rounded-r-none
                    dark:bg-white/5 bg-white
                    dark:text-white text-gray-900
                    dark:border-white/10 border-gray-200 border
                    focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                     
                    `}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 bg-[#1890ff] text-white 
                    rounded-lg xs:rounded-r-lg xs:rounded-l-none
                    hover:bg-[#40a9ff] transition-colors duration-200
                     
                    `}
                >
                  {t('footer.newsletter.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright - Responsive padding */}
        <div className="py-6 sm:py-8 border-t dark:border-white/10 border-gray-200 text-center">
          <p className={`text-xs sm:text-sm dark:text-gray-400 text-gray-600
             
            `}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
