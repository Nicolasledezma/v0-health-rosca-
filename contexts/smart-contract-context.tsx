"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "./wallet-context"

// Smart Contract ABI (simplified for demo)
const HEALTH_ROSCA_ABI = [
  {
    inputs: [
      { name: "_name", type: "string" },
      { name: "_contributionAmount", type: "uint256" },
      { name: "_maxMembers", type: "uint256" },
    ],
    name: "createGroup",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "_groupId", type: "uint256" }],
    name: "joinGroup",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "_groupId", type: "uint256" }],
    name: "contribute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { name: "_groupId", type: "uint256" },
      { name: "_amount", type: "uint256" },
      { name: "_reason", type: "string" },
    ],
    name: "requestMedicalHelp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]

// Contract addresses (would be real addresses in production)
const CONTRACT_ADDRESSES = {
  HEALTH_ROSCA: "0x742d35Cc6634C0532925a3b8D4C9db96C4b5Da5e",
  USDC: "0xA0b86a33E6441b8C4C5C4b4b5b5b5b5b5b5b5b5b",
}

interface Transaction {
  hash: string
  status: "pending" | "confirmed" | "failed"
  type: "create_group" | "join_group" | "contribute" | "request_help"
  timestamp: number
  amount?: string
  groupId?: number
}

interface SmartContractContextType {
  // Contract interaction functions
  createGroup: (name: string, contributionAmount: string, maxMembers: number) => Promise<string>
  joinGroup: (groupId: number) => Promise<string>
  contribute: (groupId: number, amount: string) => Promise<string>
  requestMedicalHelp: (groupId: number, amount: string, reason: string) => Promise<string>

  // State
  transactions: Transaction[]
  isLoading: boolean
  contractBalance: string
  gasPrice: string

  // Utility functions
  getTransactionStatus: (hash: string) => Promise<"pending" | "confirmed" | "failed">
  estimateGas: (operation: string, params: any[]) => Promise<string>
}

const SmartContractContext = createContext<SmartContractContextType | undefined>(undefined)

export function SmartContractProvider({ children }: { children: ReactNode }) {
  const { isConnected, address } = useWallet()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [contractBalance, setContractBalance] = useState("0")
  const [gasPrice, setGasPrice] = useState("20")

  // Simulate Web3 provider (in real app, use ethers or wagmi)
  const getWeb3Provider = () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      return (window as any).ethereum
    }
    return null
  }

  // Create a new savings group
  const createGroup = async (name: string, contributionAmount: string, maxMembers: number): Promise<string> => {
    if (!isConnected || !address) throw new Error("Wallet not connected")

    setIsLoading(true)
    try {
      // Simulate transaction creation
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const newTransaction: Transaction = {
        hash: txHash,
        status: "pending",
        type: "create_group",
        timestamp: Date.now(),
        amount: contributionAmount,
      }

      setTransactions((prev) => [newTransaction, ...prev])

      // Simulate blockchain confirmation delay
      setTimeout(
        () => {
          setTransactions((prev) =>
            prev.map((tx) =>
              tx.hash === txHash ? { ...tx, status: Math.random() > 0.1 ? "confirmed" : "failed" } : tx,
            ),
          )
        },
        3000 + Math.random() * 2000,
      )

      return txHash
    } catch (error) {
      console.error("Error creating group:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Join an existing group
  const joinGroup = async (groupId: number): Promise<string> => {
    if (!isConnected || !address) throw new Error("Wallet not connected")

    setIsLoading(true)
    try {
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const newTransaction: Transaction = {
        hash: txHash,
        status: "pending",
        type: "join_group",
        timestamp: Date.now(),
        groupId,
      }

      setTransactions((prev) => [newTransaction, ...prev])

      setTimeout(
        () => {
          setTransactions((prev) =>
            prev.map((tx) =>
              tx.hash === txHash ? { ...tx, status: Math.random() > 0.1 ? "confirmed" : "failed" } : tx,
            ),
          )
        },
        2000 + Math.random() * 1000,
      )

      return txHash
    } catch (error) {
      console.error("Error joining group:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Contribute to group savings
  const contribute = async (groupId: number, amount: string): Promise<string> => {
    if (!isConnected || !address) throw new Error("Wallet not connected")

    setIsLoading(true)
    try {
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const newTransaction: Transaction = {
        hash: txHash,
        status: "pending",
        type: "contribute",
        timestamp: Date.now(),
        amount,
        groupId,
      }

      setTransactions((prev) => [newTransaction, ...prev])

      setTimeout(
        () => {
          setTransactions((prev) =>
            prev.map((tx) =>
              tx.hash === txHash ? { ...tx, status: Math.random() > 0.1 ? "confirmed" : "failed" } : tx,
            ),
          )
        },
        2500 + Math.random() * 1500,
      )

      return txHash
    } catch (error) {
      console.error("Error contributing:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Request medical help from group funds
  const requestMedicalHelp = async (groupId: number, amount: string, reason: string): Promise<string> => {
    if (!isConnected || !address) throw new Error("Wallet not connected")

    setIsLoading(true)
    try {
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const newTransaction: Transaction = {
        hash: txHash,
        status: "pending",
        type: "request_help",
        timestamp: Date.now(),
        amount,
        groupId,
      }

      setTransactions((prev) => [newTransaction, ...prev])

      setTimeout(
        () => {
          setTransactions((prev) =>
            prev.map((tx) =>
              tx.hash === txHash ? { ...tx, status: Math.random() > 0.1 ? "confirmed" : "failed" } : tx,
            ),
          )
        },
        4000 + Math.random() * 2000,
      )

      return txHash
    } catch (error) {
      console.error("Error requesting help:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Get transaction status
  const getTransactionStatus = async (hash: string): Promise<"pending" | "confirmed" | "failed"> => {
    const tx = transactions.find((t) => t.hash === hash)
    return tx?.status || "pending"
  }

  // Estimate gas for operations
  const estimateGas = async (operation: string, params: any[]): Promise<string> => {
    // Simulate gas estimation
    const baseGas = {
      create_group: "150000",
      join_group: "80000",
      contribute: "65000",
      request_help: "120000",
    }

    return baseGas[operation as keyof typeof baseGas] || "100000"
  }

  // Update gas price periodically
  useEffect(() => {
    const updateGasPrice = () => {
      const newGasPrice = (15 + Math.random() * 20).toFixed(0)
      setGasPrice(newGasPrice)
    }

    updateGasPrice()
    const interval = setInterval(updateGasPrice, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Update contract balance
  useEffect(() => {
    if (isConnected) {
      const updateBalance = () => {
        const balance = (Math.random() * 10000).toFixed(2)
        setContractBalance(balance)
      }

      updateBalance()
      const interval = setInterval(updateBalance, 15000)

      return () => clearInterval(interval)
    }
  }, [isConnected])

  const value: SmartContractContextType = {
    createGroup,
    joinGroup,
    contribute,
    requestMedicalHelp,
    transactions,
    isLoading,
    contractBalance,
    gasPrice,
    getTransactionStatus,
    estimateGas,
  }

  return <SmartContractContext.Provider value={value}>{children}</SmartContractContext.Provider>
}

export function useSmartContract() {
  const context = useContext(SmartContractContext)
  if (context === undefined) {
    throw new Error("useSmartContract must be used within a SmartContractProvider")
  }
  return context
}
