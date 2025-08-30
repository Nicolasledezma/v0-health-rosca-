"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, ArrowLeft, DollarSign, Users, Calendar, Plus, HandHeart, Clock } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"
import { useRouter } from "next/navigation"

// Mock data for group details
const mockGroupData = {
  id: 1,
  name: "Community Health Circle",
  description: "A supportive community focused on healthcare emergency preparedness",
  members: 8,
  maxMembers: 12,
  contributionAmount: 50,
  currentRound: 3,
  totalRounds: 12,
  nextContribution: "2024-02-15",
  totalPool: 1200,
  status: "active",
  created: "2024-01-01",
}

const mockMembers = [
  {
    id: 1,
    address: "0x1234...5678",
    name: "Alice Johnson",
    joinedDate: "2024-01-01",
    contributionStatus: "current",
    totalContributed: 150,
    lastContribution: "2024-01-15",
  },
  {
    id: 2,
    address: "0x2345...6789",
    name: "Bob Smith",
    joinedDate: "2024-01-02",
    contributionStatus: "current",
    totalContributed: 150,
    lastContribution: "2024-01-15",
  },
  {
    id: 3,
    address: "0x3456...7890",
    name: "Carol Davis",
    joinedDate: "2024-01-03",
    contributionStatus: "pending",
    totalContributed: 100,
    lastContribution: "2023-12-15",
  },
  {
    id: 4,
    address: "0x4567...8901",
    name: "David Wilson",
    joinedDate: "2024-01-04",
    contributionStatus: "current",
    totalContributed: 150,
    lastContribution: "2024-01-15",
  },
]

const mockTransactions = [
  {
    id: 1,
    type: "contribution",
    member: "Alice Johnson",
    amount: 50,
    date: "2024-01-15",
    status: "completed",
    txHash: "0xabc123...",
  },
  {
    id: 2,
    type: "contribution",
    member: "Bob Smith",
    amount: 50,
    date: "2024-01-15",
    status: "completed",
    txHash: "0xdef456...",
  },
  {
    id: 3,
    type: "withdrawal",
    member: "Carol Davis",
    amount: 200,
    date: "2024-01-10",
    status: "approved",
    reason: "Emergency dental surgery",
    txHash: "0xghi789...",
  },
  {
    id: 4,
    type: "contribution",
    member: "David Wilson",
    amount: 50,
    date: "2024-01-15",
    status: "completed",
    txHash: "0xjkl012...",
  },
]

export default function GroupPage({ params }: { params: { id: string } }) {
  const { isConnected } = useWallet()
  const router = useRouter()
  const [isContributeOpen, setIsContributeOpen] = useState(false)
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [contributeAmount, setContributeAmount] = useState("")
  const [requestForm, setRequestForm] = useState({
    amount: "",
    reason: "",
    description: "",
  })

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Wallet Not Connected</h2>
          <p className="text-muted-foreground mb-4">Please connect your wallet to access group details.</p>
          <Link href="/">
            <Button>Go Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contributing:", contributeAmount)
    setIsContributeOpen(false)
    setContributeAmount("")
  }

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Requesting help:", requestForm)
    setIsRequestOpen(false)
    setRequestForm({ amount: "", reason: "", description: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "contribution":
        return <Plus className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <HandHeart className="h-4 w-4 text-blue-600" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2 hover:text-accent transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Health ROSCA</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Group Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{mockGroupData.name}</h2>
              <p className="text-muted-foreground">{mockGroupData.description}</p>
            </div>
            <Badge variant="default" className="mt-2 md:mt-0">
              {mockGroupData.status}
            </Badge>
          </div>

          {/* Group Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pool</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockGroupData.totalPool} USDC</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockGroupData.members}/{mockGroupData.maxMembers}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Round</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockGroupData.currentRound}/{mockGroupData.totalRounds}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Due</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Feb 15</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Dialog open={isContributeOpen} onOpenChange={setIsContributeOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Contribute Payment</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Make Contribution</DialogTitle>
                  <DialogDescription>Contribute to the group's emergency fund.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleContribute} className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount (USDC)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50"
                      value={contributeAmount}
                      onChange={(e) => setContributeAmount(e.target.value)}
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Regular contribution: {mockGroupData.contributionAmount} USDC
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsContributeOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Contribute</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <HandHeart className="h-4 w-4" />
                  <span>Request Medical Help</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Request Medical Emergency Fund</DialogTitle>
                  <DialogDescription>
                    Submit a request for medical emergency assistance from the group.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRequest} className="space-y-4">
                  <div>
                    <Label htmlFor="requestAmount">Amount Needed (USDC)</Label>
                    <Input
                      id="requestAmount"
                      type="number"
                      placeholder="200"
                      value={requestForm.amount}
                      onChange={(e) => setRequestForm({ ...requestForm, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reason">Medical Reason</Label>
                    <Input
                      id="reason"
                      placeholder="e.g., Emergency dental surgery"
                      value={requestForm.reason}
                      onChange={(e) => setRequestForm({ ...requestForm, reason: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about your medical emergency..."
                      value={requestForm.description}
                      onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsRequestOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs for Members and History */}
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Group Members</CardTitle>
                <CardDescription>Current members and their contribution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.address}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined: {new Date(member.joinedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(member.contributionStatus)}>{member.contributionStatus}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">Total: {member.totalContributed} USDC</div>
                        <div className="text-sm text-muted-foreground">
                          Last: {new Date(member.lastContribution).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>All contributions and withdrawals for this group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <div className="font-medium">
                            {transaction.type === "contribution" ? "Contribution" : "Medical Withdrawal"}
                          </div>
                          <div className="text-sm text-muted-foreground">by {transaction.member}</div>
                          {transaction.reason && (
                            <div className="text-sm text-muted-foreground">Reason: {transaction.reason}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {transaction.type === "contribution" ? "+" : "-"}
                          {transaction.amount} USDC
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                        <Badge
                          variant={
                            transaction.status === "completed" || transaction.status === "approved"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
