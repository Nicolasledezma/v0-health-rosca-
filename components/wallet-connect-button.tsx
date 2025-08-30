"use client"

import { Button } from "@/components/ui/button"
import { Wallet, ArrowRight, Loader2, CheckCircle } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface WalletConnectButtonProps {
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
  showArrow?: boolean
}

export function WalletConnectButton({
  size = "default",
  variant = "default",
  className,
  showArrow = false,
}: WalletConnectButtonProps) {
  const { isConnected, isConnecting, connectWallet } = useWallet()
  const router = useRouter()
  const [justConnected, setJustConnected] = useState(false)

  useEffect(() => {
    if (isConnected && !isConnecting) {
      setJustConnected(true)
      const timer = setTimeout(() => setJustConnected(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isConnected, isConnecting])

  const handleClick = async () => {
    if (isConnected) {
      router.push("/dashboard")
    } else {
      await connectWallet()
    }
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        justConnected && "bg-green-600 hover:bg-green-700",
        className,
      )}
      onClick={handleClick}
      disabled={isConnecting}
    >
      <div className="flex items-center">
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : justConnected ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Connected!
          </>
        ) : isConnected ? (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Go to Dashboard
            {showArrow && (
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
            {showArrow && (
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </>
        )}
      </div>
    </Button>
  )
}
