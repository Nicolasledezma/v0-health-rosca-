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
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, Users, DollarSign, Calendar, ArrowLeft, LogOut, Stethoscope, Shield } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { useRouter } from "next/navigation"

const mockGroups = [
  {
    id: 1,
    name: "Community Health Circle",
    members: 8,
    maxMembers: 12,
    contributionAmount: 50,
    currentRound: 3,
    totalRounds: 12,
    nextContribution: "2024-02-15",
    status: "active",
    healthFocus: "General Health",
    urgencyLevel: "low",
  },
  {
    id: 2,
    name: "Family Emergency Fund",
    members: 6,
    maxMembers: 8,
    contributionAmount: 100,
    currentRound: 1,
    totalRounds: 8,
    nextContribution: "2024-02-10",
    status: "active",
    healthFocus: "Emergency Care",
    urgencyLevel: "high",
  },
  {
    id: 3,
    name: "Neighborhood Support",
    members: 15,
    maxMembers: 15,
    contributionAmount: 25,
    currentRound: 7,
    totalRounds: 15,
    nextContribution: "2024-02-20",
    status: "full",
    healthFocus: "Preventive Care",
    urgencyLevel: "medium",
  },
]

export default function Dashboard() {
  const { isConnected, address, ensName, balance, disconnectWallet } = useWallet()
  const { t } = useLanguage()
  const router = useRouter()
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    contributionAmount: "",
    numberOfRounds: "",
  })

  const handleDisconnect = () => {
    disconnectWallet()
    router.push("/")
  }

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating group:", newGroup)
    setIsCreateGroupOpen(false)
    setNewGroup({ name: "", contributionAmount: "", numberOfRounds: "" })
  }

  const handleJoinGroup = (groupId: number) => {
    console.log("Joining group:", groupId)
    router.push(`/group/${groupId}`)
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("dashboard.walletNotConnected")}</h2>
          <p className="text-gray-600 mb-6">{t("dashboard.connectWalletMessage")}</p>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl">
              {t("dashboard.goBackHome")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <Heart className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">{t("header.title")}</h1>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <LanguageSelector />

              <div className="flex items-center space-x-3 bg-white/10 rounded-2xl px-4 py-2">
                <Shield className="h-5 w-5 text-emerald-200" />
                <div>
                  {ensName ? (
                    <>
                      <div className="text-sm font-bold">{ensName}</div>
                      <div className="text-xs opacity-75">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
                      </div>
                    </>
                  ) : address ? (
                    <div className="text-sm font-mono">{`${address.slice(0, 6)}...${address.slice(-4)}`}</div>
                  ) : null}
                </div>
                <div className="text-sm">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  {balance || "0"} USDC
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="bg-red-500/20 border-red-300 text-white hover:bg-red-500/30"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("header.disconnect")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("dashboard.title")}</h2>
            <p className="text-gray-600">{t("dashboard.subtitle")}</p>
          </div>

          <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl">
                <Plus className="h-5 w-5 mr-2" />
                {t("dashboard.createGroup")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-emerald-600" />
                  <span>{t("createGroup.title")}</span>
                </DialogTitle>
                <DialogDescription>{t("createGroup.description")}</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <Label htmlFor="groupName">{t("createGroup.groupName")}</Label>
                  <Input
                    id="groupName"
                    placeholder={t("createGroup.groupNamePlaceholder")}
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="contributionAmount">{t("createGroup.contributionAmount")}</Label>
                  <Input
                    id="contributionAmount"
                    type="number"
                    placeholder="50"
                    value={newGroup.contributionAmount}
                    onChange={(e) => setNewGroup({ ...newGroup, contributionAmount: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfRounds">{t("createGroup.numberOfRounds")}</Label>
                  <Input
                    id="numberOfRounds"
                    type="number"
                    placeholder="12"
                    value={newGroup.numberOfRounds}
                    onChange={(e) => setNewGroup({ ...newGroup, numberOfRounds: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateGroupOpen(false)}
                    className="rounded-xl"
                  >
                    {t("createGroup.cancel")}
                  </Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("createGroup.create")}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-3xl border-emerald-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{t("dashboard.stats.activeGroups")}</CardTitle>
              <Users className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">2</div>
              <p className="text-xs text-gray-600">{t("dashboard.stats.activeGroupsDesc")}</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-teal-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{t("dashboard.stats.totalSaved")}</CardTitle>
              <DollarSign className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-600">$1,250</div>
              <p className="text-xs text-gray-600">{t("dashboard.stats.totalSavedDesc")}</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-cyan-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t("dashboard.stats.nextContribution")}
              </CardTitle>
              <Calendar className="h-5 w-5 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-600">Feb 15</div>
              <p className="text-xs text-gray-600">{t("dashboard.stats.nextContributionDesc")}</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("dashboard.availableGroups")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGroups.map((group) => (
              <Card
                key={group.id}
                className="rounded-3xl border-gray-200 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleJoinGroup(group.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-emerald-600" />
                      <span>{group.name}</span>
                    </CardTitle>
                    <Badge className={getUrgencyColor(group.urgencyLevel)}>{group.urgencyLevel}</Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-2">
                    <Stethoscope className="h-4 w-4" />
                    <span>{group.healthFocus}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">{t("dashboard.members")}:</span>
                      <div className="font-semibold">
                        {group.members}/{group.maxMembers}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">{t("dashboard.contribution")}:</span>
                      <div className="font-semibold">${group.contributionAmount}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Progress</span>
                      <span>{Math.round((group.currentRound / group.totalRounds) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                        style={{ width: `${(group.currentRound / group.totalRounds) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleJoinGroup(group.id)
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                    disabled={group.status === "full"}
                  >
                    {group.status === "full" ? (
                      <>
                        <Users className="h-4 w-4 mr-2" />
                        {t("dashboard.groupFull")}
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 mr-2" />
                        {t("dashboard.joinGroup")}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
