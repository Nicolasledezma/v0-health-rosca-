"use client"

import { Shield, Users, Heart, Plus, HandHeart, CheckCircle, MessageCircle, Stethoscope } from "lucide-react"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white sticky top-0 z-50 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="/medical-cross-with-heart-symbol--clean-healthcare-.png"
                alt="Health ROSCA Medical Icon"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-lg animate-health-pulse"
              />
              <Stethoscope className="absolute -bottom-1 -right-1 h-4 w-4 text-emerald-200 bg-white rounded-full p-0.5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{t("header.title")}</h1>
              <p className="text-xs text-white/80 hidden sm:block">Ahorro Comunitario para Salud</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#how-it-works"
              className="hover:text-cyan-200 transition-all duration-300 hover:scale-105 transform text-sm lg:text-base relative group"
            >
              {t("landing.howItWorks.title")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#benefits"
              className="hover:text-cyan-200 transition-all duration-300 hover:scale-105 transform text-sm lg:text-base relative group"
            >
              {t("landing.benefits.title")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#community"
              className="hover:text-cyan-200 transition-all duration-300 hover:scale-105 transform text-sm lg:text-base relative group"
            >
              {t("landing.community.title")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <LanguageSelector />
            <WalletConnectButton
              size="sm"
              className="ml-2 rounded-xl hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg"
            />
          </nav>
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <WalletConnectButton size="sm" className="rounded-xl" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-cyan-100/20"></div>
        <div className="absolute top-20 left-10 opacity-10">
          <Heart className="h-16 w-16 text-emerald-600 animate-float" style={{ animationDelay: "0s" }} />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <Shield className="h-12 w-12 text-teal-600 animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-10">
          <Users className="h-14 w-14 text-cyan-600 animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="container mx-auto text-center max-w-4xl relative">
          <div className="mb-8 flex justify-center">
            <img
              src="/diverse-group-of-people-holding-hands-around-a-med.png"
              alt="Community Healthcare Illustration"
              className="h-32 sm:h-48 w-auto rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t("landing.hero.title")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 text-pretty max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            {t("landing.hero.subtitle")}
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 space-y-4">
            <WalletConnectButton
              size="lg"
              className="text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl rounded-2xl"
            />
            <p className="text-sm text-gray-500">🔒 Seguro • 🌍 Descentralizado • 💚 Comunitario</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-y border-emerald-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Grupos Activos</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-teal-600">$2M+</div>
              <div className="text-xs sm:text-sm text-gray-600">Ahorrados</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-600">10K+</div>
              <div className="text-xs sm:text-sm text-gray-600">Miembros</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">98%</div>
              <div className="text-xs sm:text-sm text-gray-600">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            {t("landing.howItWorks.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div
              className="rounded-3xl border-emerald-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 sm:p-8 text-center animate-float"
              style={{ animationDelay: "0s" }}
            >
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-emerald-600">
                {t("landing.howItWorks.step1.title")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t("landing.howItWorks.step1.desc")}</p>
            </div>

            <div
              className="rounded-3xl border-teal-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 sm:p-8 text-center animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-teal-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <Plus className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-teal-600">
                {t("landing.howItWorks.step2.title")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t("landing.howItWorks.step2.desc")}</p>
            </div>

            <div
              className="rounded-3xl border-cyan-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 sm:p-8 text-center animate-float sm:col-span-2 lg:col-span-1"
              style={{ animationDelay: "4s" }}
            >
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-cyan-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <HandHeart className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-600">
                {t("landing.howItWorks.step3.title")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t("landing.howItWorks.step3.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            {t("landing.benefits.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="rounded-3xl border-emerald-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-8">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600 mb-4 sm:mb-6" />
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-emerald-600">
                {t("landing.benefits.security.title")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("landing.benefits.security.desc")}
              </p>
            </div>

            <div className="rounded-3xl border-teal-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-8">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-teal-600 mb-4 sm:mb-6" />
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-teal-600">
                {t("landing.benefits.community.title")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("landing.benefits.community.desc")}
              </p>
            </div>

            <div className="rounded-3xl border-cyan-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-8 sm:col-span-2 lg:col-span-1">
              <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-600 mb-4 sm:mb-6 animate-health-pulse" />
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-600">
                {t("landing.benefits.accessible.title")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("landing.benefits.accessible.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
            Confiado por Comunidades en Todo el Mundo
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 rounded-3xl bg-white/80 backdrop-blur-sm p-4 sm:p-6">
              <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium text-center sm:text-left text-gray-900">
                500+ Grupos Activos
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 rounded-3xl bg-white/80 backdrop-blur-sm p-4 sm:p-6">
              <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium text-center sm:text-left text-gray-900">
                $2M+ Ahorrados Juntos
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 rounded-3xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <CheckCircle className="h-6 w-6 text-cyan-600 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium text-center sm:text-left text-gray-900">
                10,000+ Miembros
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-12 sm:py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">{t("landing.community.title")}</h3>
          <p className="text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">{t("landing.community.subtitle")}</p>

          <div className="max-w-md mx-auto">
            <div className="rounded-3xl border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 p-6 sm:p-8">
              <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-600">
                {t("landing.community.telegram")}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                {t("landing.community.telegramDesc")}
              </p>
              <Button
                asChild
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl py-3 px-6 transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                <a
                  href="https://t.me/healthrosca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{t("landing.community.telegram")}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600/80"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t("landing.cta.title")}</h3>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            {t("landing.cta.subtitle")}
          </p>
          <WalletConnectButton
            size="lg"
            variant="secondary"
            className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl rounded-2xl"
            showArrow
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-emerald-600 animate-health-pulse" />
              <span className="text-lg font-semibold text-gray-900">{t("header.title")}</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors duration-200 hover:scale-105 transform">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors duration-200 hover:scale-105 transform">
                Términos de Servicio
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors duration-200 hover:scale-105 transform">
                Contacto
              </a>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; 2024 Health ROSCA. Construyendo comunidades más saludables a través del ahorro colectivo.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
