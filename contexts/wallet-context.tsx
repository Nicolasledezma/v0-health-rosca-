"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  ensName: string | null
  balance: string | null
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [ensName, setEnsName] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
          await getBalance(accounts[0])
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const getBalance = async (walletAddress: string) => {
    try {
      // Mock USDC balance for demo purposes
      // In a real app, you'd query the actual USDC contract
      const mockBalance = "1,250"
      setBalance(mockBalance)
      await resolveENS(walletAddress)
    } catch (error) {
      console.error("Error getting balance:", error)
    }
  }

  const resolveENS = async (walletAddress: string) => {
    try {
      // Mock ENS resolution for demo purposes
      // In a real app, you'd use a library like ethers.js to resolve ENS
      const mockENSNames = ["alice.eth", "doctor.eth", "healthsaver.eth", "medicalfund.eth", "community.eth"]

      // Simulate ENS lookup based on address
      const addressHash = walletAddress.slice(-2)
      const hashNum = Number.parseInt(addressHash, 16)

      if (hashNum % 3 === 0) {
        const ensName = mockENSNames[hashNum % mockENSNames.length]
        setEnsName(ensName)
      } else {
        setEnsName(null)
      }
    } catch (error) {
      console.error("Error resolving ENS:", error)
      setEnsName(null)
    }
  }

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet")
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        setAddress(accounts[0])
        setIsConnected(true)
        await getBalance(accounts[0])
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setEnsName(null)
    setBalance(null)
  }

  const value = {
    isConnected,
    address,
    ensName,
    balance,
    isConnecting,
    connectWallet,
    disconnectWallet,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}
