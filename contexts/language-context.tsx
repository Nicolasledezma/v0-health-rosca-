"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "header.title": "Health ROSCA",
    "header.walletConnected": "Wallet Connected",
    "header.balance": "Balance",
    "header.disconnect": "Disconnect",

    // Landing Page
    "landing.hero.title": "Community Health Savings",
    "landing.hero.subtitle": "Join decentralized savings groups for medical emergencies using stablecoins",
    "landing.hero.connectWallet": "Connect Wallet",
    "landing.hero.learnMore": "Learn More",
    "landing.howItWorks.title": "How It Works",
    "landing.howItWorks.step1.title": "Join a Group",
    "landing.howItWorks.step1.desc": "Connect with community members to form savings circles",
    "landing.howItWorks.step2.title": "Make Contributions",
    "landing.howItWorks.step2.desc": "Regular contributions in stablecoins build your emergency fund",
    "landing.howItWorks.step3.title": "Access When Needed",
    "landing.howItWorks.step3.desc": "Request funds for medical emergencies with community approval",
    "landing.benefits.title": "Why Choose Health ROSCA?",
    "landing.benefits.security.title": "Blockchain Security",
    "landing.benefits.security.desc": "Smart contracts ensure transparent and secure transactions",
    "landing.benefits.community.title": "Community Support",
    "landing.benefits.community.desc": "Build trust and mutual aid with your neighbors",
    "landing.benefits.accessible.title": "Accessible Healthcare",
    "landing.benefits.accessible.desc": "Make healthcare more affordable through collective savings",
    "landing.cta.title": "Ready to Start Saving?",
    "landing.cta.subtitle": "Join thousands building financial resilience for health emergencies",
    "landing.cta.button": "Get Started Today",

    // Community Section
    "landing.community.title": "Join Our Community",
    "landing.community.subtitle": "Connect with other members, get support, and stay updated",
    "landing.community.telegram": "Join Telegram Channel",
    "landing.community.telegramDesc": "Get real-time updates and community support",

    // Dashboard
    "dashboard.title": "Your Dashboard",
    "dashboard.subtitle": "Manage your savings groups and contributions",
    "dashboard.createGroup": "Create Group",
    "dashboard.walletNotConnected": "Wallet Not Connected",
    "dashboard.connectWalletMessage": "Please connect your wallet to access the dashboard.",
    "dashboard.goBackHome": "Go Back to Home",
    "dashboard.stats.activeGroups": "Active Groups",
    "dashboard.stats.activeGroupsDesc": "Groups you're participating in",
    "dashboard.stats.totalContributed": "Total Contributed",
    "dashboard.stats.totalContributedDesc": "Across all groups",
    "dashboard.stats.nextContribution": "Next Contribution",
    "dashboard.availableGroups": "Available Savings Groups",
    "dashboard.members": "Members",
    "dashboard.contribution": "Contribution",
    "dashboard.nextDue": "Next Due",
    "dashboard.joinGroup": "Join Group",
    "dashboard.groupFull": "Group Full",
    "dashboard.round": "Round",
    "dashboard.of": "of",

    // Create Group Dialog
    "createGroup.title": "Create New Savings Group",
    "createGroup.description": "Set up a new community savings group for medical emergencies.",
    "createGroup.groupName": "Group Name",
    "createGroup.groupNamePlaceholder": "e.g., Family Emergency Fund",
    "createGroup.contributionAmount": "Contribution Amount (USDC)",
    "createGroup.numberOfRounds": "Number of Rounds",
    "createGroup.cancel": "Cancel",
    "createGroup.create": "Create Group",
    "createGroup.creating": "Creating...",

    // Group Page
    "group.backToDashboard": "Back to Dashboard",
    "group.members": "Members",
    "group.history": "History",
    "group.contribute": "Contribute Payment",
    "group.requestHelp": "Request Medical Help",
    "group.groupInfo": "Group Information",
    "group.totalPool": "Total Pool",
    "group.yourContributions": "Your Contributions",
    "group.nextRound": "Next Round",
    "group.status": "Status",
    "group.membersList": "Members List",
    "group.transactionHistory": "Transaction History",
    "group.type": "Type",
    "group.amount": "Amount",
    "group.date": "Date",
    "group.contribution": "Contribution",
    "group.withdrawal": "Withdrawal",

    // Wallet Section
    "wallet.ensName": "ENS Name",
    "wallet.address": "Address",

    // Language Selector
    "language.english": "English",
    "language.spanish": "Español",
  },
  es: {
    // Header
    "header.title": "Health ROSCA",
    "header.walletConnected": "Billetera Conectada",
    "header.balance": "Saldo",
    "header.disconnect": "Desconectar",

    // Landing Page
    "landing.hero.title": "Ahorros Comunitarios de Salud",
    "landing.hero.subtitle": "Únete a grupos de ahorro descentralizados para emergencias médicas usando stablecoins",
    "landing.hero.connectWallet": "Conectar Billetera",
    "landing.hero.learnMore": "Saber Más",
    "landing.howItWorks.title": "Cómo Funciona",
    "landing.howItWorks.step1.title": "Únete a un Grupo",
    "landing.howItWorks.step1.desc": "Conéctate con miembros de la comunidad para formar círculos de ahorro",
    "landing.howItWorks.step2.title": "Haz Contribuciones",
    "landing.howItWorks.step2.desc": "Contribuciones regulares en stablecoins construyen tu fondo de emergencia",
    "landing.howItWorks.step3.title": "Accede Cuando lo Necesites",
    "landing.howItWorks.step3.desc": "Solicita fondos para emergencias médicas con aprobación comunitaria",
    "landing.benefits.title": "¿Por Qué Elegir Health ROSCA?",
    "landing.benefits.security.title": "Seguridad Blockchain",
    "landing.benefits.security.desc": "Los contratos inteligentes aseguran transacciones transparentes y seguras",
    "landing.benefits.community.title": "Apoyo Comunitario",
    "landing.benefits.community.desc": "Construye confianza y ayuda mutua con tus vecinos",
    "landing.benefits.accessible.title": "Salud Accesible",
    "landing.benefits.accessible.desc": "Haz la salud más asequible a través del ahorro colectivo",
    "landing.cta.title": "¿Listo para Empezar a Ahorrar?",
    "landing.cta.subtitle": "Únete a miles construyendo resistencia financiera para emergencias de salud",
    "landing.cta.button": "Comenzar Hoy",

    // Community Section
    "landing.community.title": "Únete a Nuestra Comunidad",
    "landing.community.subtitle": "Conéctate con otros miembros, obtén apoyo y mantente actualizado",
    "landing.community.telegram": "Unirse al Canal de Telegram",
    "landing.community.telegramDesc": "Obtén actualizaciones en tiempo real y apoyo comunitario",

    // Dashboard
    "dashboard.title": "Tu Panel de Control",
    "dashboard.subtitle": "Administra tus grupos de ahorro y contribuciones",
    "dashboard.createGroup": "Crear Grupo",
    "dashboard.walletNotConnected": "Billetera No Conectada",
    "dashboard.connectWalletMessage": "Por favor conecta tu billetera para acceder al panel de control.",
    "dashboard.goBackHome": "Volver al Inicio",
    "dashboard.stats.activeGroups": "Grupos Activos",
    "dashboard.stats.activeGroupsDesc": "Grupos en los que participas",
    "dashboard.stats.totalContributed": "Total Contribuido",
    "dashboard.stats.totalContributedDesc": "En todos los grupos",
    "dashboard.stats.nextContribution": "Próxima Contribución",
    "dashboard.availableGroups": "Grupos de Ahorro Disponibles",
    "dashboard.members": "Miembros",
    "dashboard.contribution": "Contribución",
    "dashboard.nextDue": "Próximo Vencimiento",
    "dashboard.joinGroup": "Unirse al Grupo",
    "dashboard.groupFull": "Grupo Lleno",
    "dashboard.round": "Ronda",
    "dashboard.of": "de",

    // Create Group Dialog
    "createGroup.title": "Crear Nuevo Grupo de Ahorro",
    "createGroup.description": "Configura un nuevo grupo de ahorro comunitario para emergencias médicas.",
    "createGroup.groupName": "Nombre del Grupo",
    "createGroup.groupNamePlaceholder": "ej., Fondo de Emergencia Familiar",
    "createGroup.contributionAmount": "Monto de Contribución (USDC)",
    "createGroup.numberOfRounds": "Número de Rondas",
    "createGroup.cancel": "Cancelar",
    "createGroup.create": "Crear Grupo",
    "createGroup.creating": "Creando...",

    // Group Page
    "group.backToDashboard": "Volver al Panel",
    "group.members": "Miembros",
    "group.history": "Historial",
    "group.contribute": "Contribuir Pago",
    "group.requestHelp": "Solicitar Ayuda Médica",
    "group.groupInfo": "Información del Grupo",
    "group.totalPool": "Fondo Total",
    "group.yourContributions": "Tus Contribuciones",
    "group.nextRound": "Próxima Ronda",
    "group.status": "Estado",
    "group.membersList": "Lista de Miembros",
    "group.transactionHistory": "Historial de Transacciones",
    "group.type": "Tipo",
    "group.amount": "Monto",
    "group.date": "Fecha",
    "group.contribution": "Contribución",
    "group.withdrawal": "Retiro",

    // Wallet Section
    "wallet.ensName": "Nombre ENS",
    "wallet.address": "Dirección",

    // Language Selector
    "language.english": "English",
    "language.spanish": "Español",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("health-rosca-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("health-rosca-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
