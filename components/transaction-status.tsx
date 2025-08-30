"use client"
import { useSmartContract } from "@/contexts/smart-contract-context"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, ExternalLink, Loader2 } from "lucide-react"

export function TransactionStatus() {
  const { transactions, isLoading } = useSmartContract()
  const { t } = useLanguage()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Loader2 className="h-4 w-4 animate-spin" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "tx-pending",
      confirmed: "tx-confirmed",
      failed: "tx-failed",
    }

    return (
      <Badge className={`${statusClasses[status as keyof typeof statusClasses]} border`}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    )
  }

  const getTransactionTypeLabel = (type: string) => {
    const labels = {
      create_group: t("createGroup"),
      join_group: t("joinGroup"),
      contribute: t("contribute"),
      request_help: t("requestHelp"),
    }
    return labels[type as keyof typeof labels] || type
  }

  if (transactions.length === 0) {
    return (
      <Card className="dapp-card">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">{t("noTransactions")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dapp-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 bg-accent rounded-full animate-blockchain-pulse"></div>
          {t("recentTransactions")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.slice(0, 5).map((tx) => (
          <div
            key={tx.hash}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-medium text-sm">{getTransactionTypeLabel(tx.type)}</span>
                <span className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</span>
              </div>
              {tx.amount && (
                <Badge variant="outline" className="text-xs">
                  {tx.amount} USDC
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {getStatusBadge(tx.status)}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-5 w-5 animate-blockchain-spin mr-2" />
            <span className="text-sm text-muted-foreground">{t("processingTransaction")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
